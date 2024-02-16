from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from database.dbcon import SessionLocal
import re
from library.json_lib import JsonLib
import ast

class MatchingModel:
    def __init__(self):
        self.DB = SessionLocal()
        self.jsonObj = JsonLib()

    async def returnMultipleData(self,result,data):
        mergeData = [
            dict(zip(result.keys(), row))
            for row in data
        ]
        return mergeData

    async def getUserBasicData(self, user_id):
        try:
            sql_query = text("SELECT users.*,personal_information.interest_list,personal_information.languages_list,personal_information.matching_list,personal_information.mobile  FROM users left join personal_information on users.id=personal_information.user_id WHERE users.id = :user_id")
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()
    async def getfeedbackContentList(self):
        try:
            sql_query = text(
                "SELECT * FROM feedback_list WHERE status=1 ORDER BY id ASC")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def getArchivedFriendList(self,user_id):
        try:
            sql_query = text(
                "SELECT id,user_id,friend_id,matching_start,status FROM friend_list WHERE status=2 and user_id=:user_id ORDER BY id DESC")
            result = self.DB.execute(sql_query,{'user_id':user_id})
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def getMatchingStatus(self,user_id):
        try:
            sql_query = text(
                "SELECT friend_list.user_id,friend_list.friend_id,friend_list.matching_start, IF(`status`=1,'Lock' ,'Unlock') matching_status,'Disabled' as conversation_status,'Need feedback' as waiting_status, TIMESTAMPDIFF(DAY,matching_start,CURRENT_TIMESTAMP) total_days FROM friend_list WHERE user_id = :user_id AND status = 1 AND TIMESTAMPDIFF(DAY,matching_start,CURRENT_TIMESTAMP) <= 14")
            result = self.DB.execute(sql_query,{'user_id':user_id})
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def sendFeedback(self,user_id,friend_id,feedback,feedback_date):
        try:
            feedback=self.jsonObj.getBasicEncoded(feedback)
            sql_query = text(
                "UPDATE friend_list SET status=2 , `feedback` = :feedback , `feedback_date` = :feedback_date WHERE status=1 and user_id =:user_id and friend_id =:friend_id"
            )
            result = self.DB.execute(sql_query, {'feedback':feedback ,'feedback_date':feedback_date , 'user_id':user_id, 'friend_id':friend_id })

            self.DB.commit()
            #print(result.rowcount,"----->")
            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            #print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()



    async def checkBlockTable(self, user_id,friend_id):
        try:
            sql_query = text(
                "SELECT * from block_list  WHERE user_id = :user_id and block_id = :friend_id")
            result = self.DB.execute(sql_query, {"user_id": user_id,"friend_id": friend_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def checkFriendTable(self, user_id,friend_id):
        try:
            sql_query = text(
                "SELECT * from friend_list  WHERE user_id = :user_id and friend_id = :friend_id")
            result = self.DB.execute(sql_query, {"user_id": user_id,"friend_id": friend_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()
    async def getMatchingPercentanceBtweenTwoList(self,matching_list,interest_list):
        matching_list_data = ast.literal_eval(matching_list)
        interest_list_data = ast.literal_eval(interest_list)

        intersection = set(matching_list_data) & set(interest_list_data)
        percentage = (len(intersection) / len(set(matching_list_data + interest_list_data))) * 100
        return int(percentage)

    async def getFocusMode(self,user_id,interest_list):
        try:
            account_mode=2 # focus
            sql_query = text("""
            SELECT 
                users.id user_id,users.account_type,users.account_status,users.account_mode,users.email,users.first_name,users.last_name,
                users.gender,users.user_photo,users.department,users.profession, users.created_at joining_date,
                personal_information.interest_list,personal_information.languages_list,personal_information.city_list
                from users
                INNER JOIN personal_information on users.id=personal_information.user_id
                where users.id != :user_id and users.account_mode = :account_mode and users.account_type=2 and users.account_status=1 
            and personal_information.city_list!='' """)

            # and personal_information.matching_list!=''
            result = self.DB.execute(sql_query,{'user_id':user_id,'account_mode':account_mode})
            data = result.fetchall()  # result.fetchall()


            if data:
                final_match_data=[]
                object_data= await self.returnMultipleData(result, data)

                for item in object_data:
                    friend_id = item['user_id']
                    #print(item)

                    matching_list = item['city_list']
                    is_locked= await self.getMatchingStatus(friend_id)
                    if is_locked==False:

                        is_blocked=await self.checkBlockTable(user_id,friend_id)
                        if is_blocked==False:

                            already_friend=await self.checkFriendTable(user_id,friend_id)
                            if already_friend==False:

                                matching_percent= await self.getMatchingPercentanceBtweenTwoList(matching_list, interest_list)
                                #print(matching_percent,"=======>", friend_id)

                                if matching_percent>=0:
                                    sub={
                                        "user_id": friend_id,
                                        "first_name":item['first_name'],
                                        "last_name": item['last_name'],
                                        "gender": item['gender'],
                                        "user_photo": item['user_photo'],
                                        "department": item['department'],
                                        "profession": item['profession'],
                                        "joining_date": item['joining_date'],
                                        "languages_list": item['languages_list'],
                                        "city_list":item['city_list'],
                                        "matching_percentage":matching_percent
                                    }

                                    final_match_data.append(sub)


                return final_match_data
            else:
                return False
        finally:
            self.DB.close()




    async def getCountLastLoginInfo(self, user_id):
        try:
            sql_query = text(
                """
                SELECT id,user_id,login_session_start,login_session_end,comments,
                TIMESTAMPDIFF(DAY,login_session_start,CURRENT_TIMESTAMP) total_days,`status` from login_session 
                where user_id=:user_id and TIMESTAMPDIFF(DAY,login_session_start,CURRENT_TIMESTAMP) <= 14  ORDER BY id DESC limit 1 
                """)
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()
    async def getInspirationMode(self,user_id,department):
        try:
            account_mode=1 # focus
            sql_query = text("""
            SELECT 
                users.id user_id,users.account_type,users.account_status,users.account_mode,users.email,users.first_name,users.last_name,
                users.gender,users.user_photo,users.department,users.profession, users.created_at joining_date,
                personal_information.interest_list,personal_information.languages_list,personal_information.city_list
                from users
                LEFT JOIN personal_information on users.id=personal_information.user_id
                where users.id != :user_id and users.account_mode = :account_mode and users.account_type=2 and users.account_status=1 
            """)

            result = self.DB.execute(sql_query,{'user_id':user_id,'account_mode':account_mode})
            data = result.fetchall()  # result.fetchall()
            if data:
                final_match_data=[]
                backup_match_data=[]
                object_data= await self.returnMultipleData(result, data)

                for item in object_data:
                    friend_id = item['user_id']
                    friend_department = item['department']

                    is_locked= await self.getMatchingStatus(friend_id)
                    if is_locked==False:

                        is_blocked=await self.checkBlockTable(user_id,friend_id)
                        if is_blocked==False:

                            already_friend=await self.checkFriendTable(user_id,friend_id)
                            if already_friend==False:

                                #print(department,"==",friend_department,"-------->", friend_id)

                                if department==friend_department:
                                        sub={
                                            "user_id": friend_id,
                                            "first_name":item['first_name'],
                                            "last_name": item['last_name'],
                                            "gender": item['gender'],
                                            "user_photo": item['user_photo'],
                                            "department": item['department'],
                                            "profession": item['profession'],
                                            "joining_date": item['joining_date'],
                                            "languages_list": item['languages_list'],
                                            "city_list": item['city_list'],
                                            "matching_percentage":"100"
                                        }

                                        if not backup_match_data:
                                            # empty
                                            backup_match_data.append(sub)
                                        else:
                                            login_data_info= await self.getCountLastLoginInfo(friend_id)
                                            #print(login_data_info, "-------->", friend_id)
                                            if login_data_info:
                                                final_match_data.append(sub)
                                                #print("-------->", friend_id)


                if not final_match_data:
                    # empty
                    if backup_match_data:
                        final_match_data.append(backup_match_data[0])

                return final_match_data

            else:
                return False
        finally:
            self.DB.close()

    async def insertDataInFriendList(self,data):
        try:
            user_exist = await self.checkFriendTable(data.get('user_id'), data.get('friend_id'))
            if not user_exist:

                try:
                    status_code=1
                    sql_query = text(
                        "INSERT INTO friend_list (`user_id`, `friend_id`, `account_mode`, `matching_start`, `who_send_request`, `status`) VALUES (:user_id, :friend_id, :account_mode, :matching_start, :who_send_request,:status)"
                    )
                    result = self.DB.execute(sql_query, {
                        'user_id': data.get('user_id'),
                        'friend_id': data.get('friend_id'),
                        'account_mode': data.get('account_mode'),
                        'matching_start': data.get('matching_start'),
                        'who_send_request': data.get('who_send_request'),
                        'status': status_code
                    })

                   # print(str(result.statement))

                    last_insert_id = result.lastrowid
                    self.DB.commit()
                    return last_insert_id

                except IntegrityError as e:
                    self.DB.rollback()
                    return "failed"
                except Exception as e:
                    self.DB.rollback()
                    #print(f"Error: {e}")
                    return "internal-error"
            else:
                return "exist"
        finally:
            self.DB.close()
    async def makeFriendShip(self,sender_id,receiver_id,current_date_time):

        error_index = ["internal-error", "failed"]

        sender_data = await self.getUserBasicData(sender_id)
        receiver_data = await self.getUserBasicData(receiver_id)

        if sender_data and receiver_data:
            sender_object = self.jsonObj.getDecoded(sender_data)
            receiver_object = self.jsonObj.getDecoded(receiver_data)


            sender_account_mode=sender_object['data']['account_mode']
            receiver_account_mode = receiver_object['data']['account_mode']

            sender_data_insert={
                "user_id":sender_id,
                "friend_id": receiver_id,
                "who_send_request": sender_id,
                "account_mode": sender_account_mode,
                "matching_start": current_date_time
            }


            sender_insert_result = await self.insertDataInFriendList(sender_data_insert)


            if sender_insert_result in error_index:
                return False
            else:
                receiver_data_insert = {
                    "user_id": receiver_id,
                    "friend_id": sender_id,
                    "who_send_request": sender_id,
                    "account_mode": receiver_account_mode,
                    "matching_start": current_date_time
                }

                receiver_insert_result = await self.insertDataInFriendList(receiver_data_insert)

                if receiver_insert_result in error_index:
                    return False
                else:
                    return True
        else:
            return False

    async def insertConverSation(self, sender_id, receiver_id, message_type, message):

        try:

            sql_query = text(
                "INSERT INTO conversation (`sender_id`, `receiver_id`, `message_type`, `message`) VALUES(:sender_id, :receiver_id, :message_type, :message)"
            )

            result = self.DB.execute(sql_query,{'sender_id':sender_id,'receiver_id':receiver_id,'message_type':message_type,'message':message})


            self.DB.commit()

            last_insert_id = result.lastrowid
            return last_insert_id

        except IntegrityError as e:
            self.DB.rollback()
            #return "failed"
            #print(f"Integrity-Error: {e}")
            return False
        except Exception as e:
            self.DB.rollback()
            #print(f"Exception-Error: {e}")
            return False
            #return "internal-error"
        finally:
            self.DB.close()


    async def sendMessage(self,request_status,request_data,current_date_time):
        try:


                if request_status==1:
                    return await self.insertConverSation(request_data['sender_id'], request_data['receiver_id'], request_data['message_type'],request_data['message'])
                else:

                    friendship= await self.makeFriendShip(request_data['sender_id'],request_data['receiver_id'],current_date_time)

                    if friendship:
                        return await self.insertConverSation(request_data['sender_id'], request_data['receiver_id'], request_data['message_type'],request_data['message'])
                    else:
                        return False

        finally:
            self.DB.close()
    async def getArchiveMessage(self,user_id,friend_id,start,range):
        try:
            sql_query = text(
                "SELECT * from conversation where (sender_id=:sender_id or sender_id=:receiver_id) or (sender_id=:receiver_id or receiver_id=:sender_id) ORDER BY UNIX_TIMESTAMP(created_at) DESC limit :start,:range")
            result = self.DB.execute(sql_query,{'sender_id':user_id,'receiver_id':friend_id,'start':start,'range':range})

            data = result.fetchall()  # result.fetchall()


            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()


    async def getUserAdvanceInformationModel(self, user_id):
        try:

            sql_query = text(
                """ SELECT 
                    users.id as user_id,
                    users.account_mode, users.email, users.user_name, users.first_name, users.last_name, users.gender, users.user_photo, users.department,users.profession, users.account_status,
                    personal_information.mobile,personal_information.languages_list, personal_information.interest_list,personal_information.matching_list, personal_information.city_list,personal_information.search_gender, personal_information.search_profession 
                FROM  
                    users
                INNER JOIN 
                    personal_information ON users.id = personal_information.user_id
                where users.id=:user_id
                """)
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False

        finally:
            self.DB.close()

    async def getActiveFriends(self,user_id):
        try:
            sql_query = text( """
                            SELECT
                                :user_id AS user_id,
                                friend_info.id AS friend_id,
                                friend_info.account_mode,
                                friend_info.account_type,
                                friend_info.email,
                                friend_info.first_name,
                                friend_info.last_name,
                                friend_info.gender,
                                friend_info.user_photo,
                                friend_info.department,
                                friend_info.profession,
                                personal_information.languages_list,
                                personal_information.interest_list,
                                personal_information.city_list,
                                personal_information.search_gender,
                                personal_information.search_profession
                            FROM users friend_info
                            INNER JOIN personal_information ON friend_info.id = personal_information.user_id
                            WHERE friend_info.id IN (
                                SELECT friend_id
                                FROM friend_list
                                WHERE status = 1 AND user_id = :user_id
                                ORDER BY id DESC
                            )
                            """)


            result = self.DB.execute(sql_query,{'user_id':user_id})
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def getUserNotificationModel(self, user_id):
        try:
            sql_query = text(
                """
                SELECT * from notification where receiver_id=:user_id ORDER BY id DESC 
                """)
            result = self.DB.execute(sql_query, {'user_id': user_id})
            data = result.fetchall()  # result.fetchall()

            if data:
                db_data = await self.returnMultipleData(result, data)

                return db_data
            else:
                return False
        finally:
            self.DB.close()

    async def checkFeedBackPending(self, user_id):
        try:
            sql_query = text(
                """
                SELECT 
                friend_list.user_id,friend_list.friend_id,TIMESTAMPDIFF(DAY,matching_start,CURRENT_TIMESTAMP) total_days
                FROM friend_list   WHERE friend_list.user_id = :user_id AND  friend_list.status = 1 AND  
                TIMESTAMPDIFF(DAY,friend_list.matching_start,CURRENT_TIMESTAMP) >= 14 ORDER BY friend_list.id ASC limit 1
                """
                )
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()
