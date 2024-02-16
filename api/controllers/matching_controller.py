# matching_controller.py
from models.matching_model import MatchingModel
from library.message_lib import MessageLib
from library.frz_lib import FRZ
from library.password_lib import PasswordLib
from library.json_lib import JsonLib
import os
class Matching:
    def __init__(self):
        self.matchModel = MatchingModel()
        self.message = MessageLib()
        self.frz = FRZ()
        self.crypto = PasswordLib()
        self.jsonObj = JsonLib()

    async def getAccountModeList(self):
        return await self.frz.getUserModeList()

    async def getDepartmentList(self):
        return await self.frz.getUserDepartmentList()

    async def getProfessionList(self):
        return await self.frz.getProfessionList()

    async def getConvertedFeedbackList(self,data):
        feedback_items = []

        for item in data:
            sub_item={
                "id": item.id,
                "status": item.status,
                "comments": item.comments
            }
            feedback_items.append(sub_item)

        return feedback_items

    async def getfeedbackContentList(self):
        return await self.matchModel.getfeedbackContentList()

    async def getArchivedFriendList(self,user_id):
        result =await self.matchModel.getArchivedFriendList(user_id)
        if result:
            return  self.message.getDataRetriveMessage("success", result)
        else:
            return self.message.getDataRetriveMessage("not-found", "")

    async def getMatchingStatus(self,user_id):
        result =await self.matchModel.getMatchingStatus(user_id)
        if result:
            message_data= self.message.getDataMatchingMessage("success","")
            data={
                "matching_status":"Lock",
                "conversation_status": "Disabled",
                "waiting_status": "Need feedback",
                "details":result
            }

            message_data['data']=data
            return message_data
        else:
            message_data=self.message.getDataMatchingMessage("not-found", "")
            data = {
                "matching_status": "Unlock",
                "conversation_status": "Enable",
                "waiting_status": "New match",
                "details": result
            }
            message_data['data'] = data
        return message_data


    async def sendFeedback(self,data):

        user_id=data.user_id
        friend_id = data.friend_id
        feedback_list=data.feedbackList

        feedback= await self.getConvertedFeedbackList(feedback_list)

        feedback_date = await self.frz.getCurrentDateTime()
        result= await self.matchModel.sendFeedback(user_id, friend_id, feedback, feedback_date)

        return self.message.getDataUpdateMessage(result,data)


    async def matchingPartner(self,user_id):

        user_basic_data = await self.matchModel.getUserBasicData(user_id)

        if user_basic_data:
            result = await self.matchModel.getMatchingStatus(user_id)

            if result:

                return {
                        "status": "success",
                        "account_mode": "Unknown",
                        "message": "Your matching status is currently locked. Please wait until 14 days from your last match, and then provide feedback. Once the feedback is submitted and reviewed, your account will be eligible for new matches.",
                        "data": False
                }
            else:

                basic_object_data=self.jsonObj.getDecoded(user_basic_data)

                if basic_object_data['data']['account_mode']==1:
                    # inspiration mode
                    if basic_object_data['data']['department']=="" or basic_object_data['data']['profession']=="":
                        return {
                            "status": "success",
                            "account_mode": "Inspiration mode (randomly match)",
                            "message": "Please complete your profile, focusing on the department and profession name",
                            "data": False
                        }
                    else:

                        inspiration_data = await self.matchModel.getInspirationMode(user_id,basic_object_data['data']['department'])

                        if not inspiration_data:
                            # empty
                            return {
                                "status": "success",
                                "account_mode": "Inspiration mode (randomly match)",
                                "message": "Apologies, but currently, we couldn't find any individuals who match randomly, as it does not take into account your department preferences.",
                                "data": False
                            }
                        else:
                            if len(inspiration_data) == 1:
                                return {
                                    "status": "success",
                                    "account_mode": "Inspiration mode (randomly match)",
                                    "message": "Congratulations! We found a suitable individual by following the Inspiration mode.",
                                    "data": inspiration_data
                                }
                            else:

                                return {
                                    "status": "success",
                                    "account_mode": "Inspiration mode (randomly match)",
                                    "message": "Congratulations! We found a suitable individual by following the Inspiration mode.",
                                    "data": inspiration_data[0]
                                }

                elif basic_object_data['data']['account_mode']==2:
                    #focus mode
                    if basic_object_data['data']['interest_list']==None or basic_object_data['data']['interest_list']=="":
                        return {
                            "status": "success",
                            "account_mode": "Focus mode (expertise or interest)",
                            "message": "You are in focus mode, but your interest list has not been set.",
                            "data": False
                        }
                    else:
                        focus_data=await self.matchModel.getFocusMode(user_id,basic_object_data['data']['interest_list'])

                        if not focus_data:
                            #empty
                            return {
                                "status": "success",
                                "account_mode": "Focus mode (expertise or interest)",
                                "message": "Apologies, but currently, we couldn't find any individuals who match your criteria of interest.",
                                "data": False
                            }
                        else:
                            if len(focus_data)==1:
                                return {
                                    "status": "success",
                                    "account_mode": "Focus mode (expertise or interest)",
                                    "message": "Congratulations! We found a suitable individual by following the focus mode.",
                                    "data": focus_data
                                }
                            else:

                                return {
                                    "status": "success",
                                    "account_mode": "Focus mode (expertise or interest)",
                                    "message": "Congratulations! We found a suitable individual by following the focus mode.",
                                    "data": focus_data[0]
                                }


                else:
                    return {
                        "status": "success",
                        "account_mode":"Unknown",
                        "message": "Please check your account; it is still in Invisible or vacation mode.",
                        "data": False
                    }

        else:
            return {
                "status": "error",
                "account_mode": "Unknown",
                "message": "Please check your account; we couldn't find any information in our system.",
                "data": False
            }

    async def sendMessage(self, request_dta):

        data = {
            "message_type":request_dta.message_type,
            "sender_id": request_dta.sender_id,
            "receiver_id":request_dta.receiver_id,
            "message":request_dta.message,
            "archived_data":False,
        }
        current_date_time= await self.frz.getCurrentDateTime()
        check_is_already_friend=await self.matchModel.checkFriendTable(request_dta.sender_id,request_dta.receiver_id)
        request_status = 1 if check_is_already_friend else 0
        result = await self.matchModel.sendMessage(request_status,data,current_date_time)
        archived_data = await self.matchModel.getArchiveMessage(request_dta.sender_id, request_dta.receiver_id, 0, 100)

        data['archived_data']=archived_data
        return self.message.getDataInsertMessage(result, data)


    async def getArchiveMessage(self,request_data):
        if (request_data.user_id !="" or request_data.friend_id !="" or request_data.start !="" or request_data.range !=""):

            result =await self.matchModel.getArchiveMessage(request_data.user_id,request_data.friend_id,request_data.start,request_data.range)

            if result:
                return  self.message.getDataRetriveMessage("success", result)
            else:
                return self.message.getDataRetriveMessage("not-found", "")
        else:
            return self.message.getDataRetriveMessage("not-found", "")

    async def getCurrentActiveFriendChatData(self, user_id,data):
        archive_chat_data = False
        if data['data']['matching_status'] == "Lock":
            object_data = data['data']['details']
            friend_id = object_data[0]['friend_id']
            result = await self.matchModel.getArchiveMessage(user_id,friend_id,0, 10)
            if result:
                archive_chat_data=result

        return archive_chat_data

    async def getActiveFriendList(self,user_id):
        result =await self.matchModel.getActiveFriends(user_id)
        if result:
            return  self.message.getDataRetriveMessage("success", result)
        else:
            return self.message.getDataRetriveMessage("not-found", "")

    async def getUserAdvanceInformation(self,user_id):
        profile_user_db_data = await self.matchModel.getUserAdvanceInformationModel(user_id)
        if profile_user_db_data:
            archive_chat_data=False
            profile_data = profile_user_db_data
            matching_status_data= await  self.getMatchingStatus(user_id)
            matching_partner = await self.matchingPartner(user_id)
            friend_list=await self.getActiveFriendList(user_id)
            admin_notification = await self.matchModel.getUserNotificationModel(user_id)
            feedback_list=await self.matchModel.getfeedbackContentList()
            feedback_pending_data = await self.matchModel.checkFeedBackPending(user_id)


            if matching_status_data['status']=="success":
                archive_chat_data= await  self.getCurrentActiveFriendChatData(user_id,matching_status_data)

            all_data = {
                'profile_data': profile_data,
                'matching_status_data': matching_status_data,
                'matching_partner': matching_partner,
                'friend_list': friend_list,
                'archive_chat_data': archive_chat_data,
                'admin_notification': admin_notification,
                'feedback_list': feedback_list,
                'feedback_pending_data':feedback_pending_data,
                'user_image_url':os.path.join(os.environ.get("REMOTE_USER_PHOTO_LINK"),"")
            }
            #print(os.path.join(os.environ.get("REMOTE_USER_PHOTO_LINK"),""))
            return self.message.getUserBasicInformationMessage("success",all_data)
        else:
            return self.message.getUserBasicInformationMessage("failed")
