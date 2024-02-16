# general_controller.py
from models.auth_model import AuthModel
from library.message_lib import MessageLib
from library.frz_lib import FRZ
from library.password_lib import PasswordLib
import os
from library.json_lib import JsonLib
from models.general_model import GeneralModel
from fastapi import UploadFile


class GeneralController:
    def __init__(self):
        self.authModel = AuthModel()
        self.message = MessageLib()
        self.frz = FRZ()
        self.crypto = PasswordLib()
        self.jsonObj = JsonLib()
        self.generalModel = GeneralModel()

    async def uploadFiles(self, file: UploadFile, user_id):

        try:

            import time

            current_timestamp = int(time.time())

            file_content = await file.read()
            file_extension = file.filename.split(".")[-1]
            file_pre_name = f"user_complain_{current_timestamp}_{user_id}_"
            new_filename = f"{file_pre_name}.{file_extension}"

            upload_dir = os.environ.get("NOTIFICATION_FILE_UPLOAD_LOCATION")
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, new_filename)

            try:
                with open(file_path, "wb") as new_file:
                    new_file.write(file_content)

                if not os.path.isfile(file_path):
                    return False
                else:

                    return new_filename

            except Exception as e:
                # print(f"Error writing file: {e}")
                return False

        except Exception as e:
            # print(f"Error handling file: {e}")
            return False

    async def userNotification(self, user_id, title, details, file: UploadFile = None):
        try:

            new_filename = ""
            if file is not None:
                new_filename = await self.uploadFiles(file, user_id)

            try:

                insert_data = {
                    "user_id": user_id,
                    "title": title,
                    "details": details,
                    "attached": new_filename,
                    "sender_id": user_id,
                    "receiver_type": 3,
                    "status": 1,
                    "send_time": await self.frz.getCurrentDateTime(),
                    "notification_type": 1,
                }
                #print(insert_data)
                result = await self.generalModel.insertNotificationDetails(insert_data)

                if result:

                    return self.message.getCompalinMessageData("success")
                else:
                    return self.message.getCompalinMessageData("failed")

            except Exception as e:
                # print(f"Error handling file: {e}")
                return self.message.getCompalinMessageData("failed")

        except Exception as e:
            print(f"Error handling file: {e}")
            return self.message.getCompalinMessageData("failed")

    async def getUnreadUserNotificationList(self):
        result = await self.generalModel.getUnreadUserNotificationList()
        if result:
            return self.message.getDataRetriveNotificaitonMessage("success", result)
        else:
            return self.message.getDataRetriveNotificaitonMessage("not-found", "")

    async def getTotalUnreadUserNotification(self):
        result = await self.generalModel.getTotalUnreadUserNotification()
        if result:
            return self.message.getDataRetriveNotificaitonMessage("success", result)
        else:
            return self.message.getDataRetriveNotificaitonMessage("not-found", "")


    async def getUserNotification(self,user_id):

        result = await self.generalModel.getUserNotificationModel(user_id)
        if result:
            return self.message.getDataRetriveNotificaitonMessage("success", result)
        else:
            return self.message.getDataRetriveNotificaitonMessage("not-found", "")

    async def getActionTypeOfNotificationStatus(self, status):

        if status == 0:
            return "failed"
        elif status == 1:
            return "unread"
        elif status == 2:
            return "read"
        elif status == 3:
            return "replied"
        elif status == 4:
            return "delete"
        else:
            return "favorite"

    async def updateNotificationStatus(self, notification_id, status):

        action_type = await self.getActionTypeOfNotificationStatus(status)
        action_time = await self.frz.getCurrentDateTime()
        result = await self.generalModel.updateNotificationStatus(notification_id, action_time, status, action_type)

        if result:
            result_object = self.jsonObj.getDecoded(result)
            message_data = self.message.getSpcialDataUpdateMessage(True)
            message_data['data'] = result_object['data']
            return message_data
        else:
            message_data = self.message.getSpcialDataUpdateMessage("failed")
            return message_data

    async def getAllUserNotificationList(self, start, range):
        result = await self.generalModel.getAllUserNotificationList(start, range)
        if result:
            total_object = await self.generalModel.getTotalAllUserNotificationList()
            total_row = 0
            if total_object:
                result_object = self.jsonObj.getDecoded(total_object)
                total_row = result_object['data']['total']

            object_data = {
                "start": start,
                "range": range,
                "total": total_row,
                "data": result
            }

            return self.message.getDataRetriveNotificaitonMessage("success", object_data)
        else:
            return self.message.getDataRetriveNotificaitonMessage("not-found", "")

    async def userNotificationReplied(self, request):

        user_data = await self.authModel.getUserTableData(request.sender_id)
        notification_data = await self.generalModel.getSpecificNotification(request.notification_id)
        if user_data and notification_data:
            db_data = self.jsonObj.getDecoded(user_data)
            db_user_email = db_data['data']['email']

            db_notification = self.jsonObj.getDecoded(notification_data)
            db_notification_title = db_notification['data']['title']
            # request.sender_id, user-who previous complain
            insert_data = {
                "receiver_id": request.sender_id,
                "title": "Replied for: '" + db_notification_title + "'",
                "details": request.message,
                "sender_id": request.admin_id,
                "receiver_type": 1,
                "status": 1,
                "send_time": await self.frz.getCurrentDateTime(),
                "notification_type": 2,
                "replied_notification_id": request.notification_id,
            }

            result_insert_data = await self.generalModel.sendNotificationByAdmin(insert_data,"replied")
            # return result_insert_data
            if result_insert_data:

                # impliment mail notifcation
                mail_send = True

                if mail_send:

                    read_time = await self.frz.getCurrentDateTime()
                    result = await self.generalModel.updateNotificationStatus(request.notification_id, read_time, "3")

                    if result:
                        result_object = self.jsonObj.getDecoded(result)
                        message_data = self.message.getSpcialDataUpdateMessage(True)
                        message_data['data'] = result_object['data']
                        return message_data
                    else:
                        message_data = self.message.getSpcialDataUpdateMessage("failed")
                        return message_data


            else:
                message_data = self.message.getSpcialDataUpdateMessage("failed")
                return message_data


        else:
            message_data = self.message.getSpcialDataUpdateMessage("failed")
            return message_data

    async def sendUserNotificationByAdmin(self, request):

        receiver_id = ""
        if request.receiver_type == 2:
            user_data = await self.authModel.getUserTableDataByEmail(request.receiver_email)
            #print(request.receiver_email)
            if user_data:
                db_data = self.jsonObj.getDecoded(user_data)
                receiver_id = db_data['data']['id']
            else:
                message_data = self.message.getDataInsertMessage(False)
                return message_data


        insert_data = {
            "receiver_id": receiver_id,
            "title": request.title,
            "details": request.details,
            "sender_id": request.admin_id,
            "receiver_type": request.receiver_type,
            "status": 1,
            "send_time": await self.frz.getCurrentDateTime(),
            "notification_type": 1,
        }
        #print(insert_data)
        result_insert_data = await self.generalModel.sendNotificationByAdmin(insert_data,"send")
        #return result_insert_data
        if result_insert_data:

            # impliment mail notifcation
            mail_send = True

            if mail_send:

                message_data = self.message.getDataInsertMessage(True)
                return message_data

            else:
                message_data = self.message.getDataInsertMessage(False)
                return message_data

        else:
            message_data = self.message.getDataInsertMessage(False)
            return message_data


    async def getClientActivity(self, request):
        from_date_status= await self.frz.is_valid_date(request.from_date)
        to_date_status= await self.frz.is_valid_date(request.to_date)

        if from_date_status and to_date_status:

            allClientActivity= await self.generalModel.getClientActivity(request.from_date,request.to_date)

            if allClientActivity['status']=="success":
                message_data = self.message.getAnalysisMessage("success", allClientActivity)
                return message_data
            else:
                message_data = self.message.getAnalysisMessage("not-found", allClientActivity)
                return message_data
        else:
            message_data = self.message.getAnalysisMessage("date-error",request)
            return message_data

    async def getTotalAccountInfo(self):
            currentLoggedData = await self.generalModel.getTotalAccountInfo()
            db_logged_data=""
            if currentLoggedData['status'] == "success":

                message_data = self.message.getAnalysisMessage("success", currentLoggedData['data'])
                return message_data
            else:
                message_data = self.message.getAnalysisMessage("not-found", currentLoggedData['data'])
                return message_data



    async def getUserFeedbackAnalysis(self, request):
        from_date_status= await self.frz.is_valid_date(request.from_date)
        to_date_status= await self.frz.is_valid_date(request.to_date)

        if from_date_status and to_date_status:

            feedback_data= await self.generalModel.getUserFeedbackAnalysis(request.from_date,request.to_date)

            if feedback_data:
                message_data = self.message.getAnalysisMessage("success", feedback_data)
                return message_data
            else:
                message_data = self.message.getAnalysisMessage("not-found", feedback_data)
                return message_data
        else:
            message_data = self.message.getAnalysisMessage("date-error",request)
            return message_data
