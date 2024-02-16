from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from database.dbcon import SessionLocal
import re
from library.json_lib import JsonLib
from itertools import groupby
from collections import defaultdict


class GeneralModel:
    def __init__(self):
        self.DB = SessionLocal()
        self.jsonObj = JsonLib()

    async def returnMultipleData(self, result, data):
        mergeData = [
            dict(zip(result.keys(), row))
            for row in data
        ]
        return mergeData

    async def getTotalConversationActiveUsers(self):
        try:

            sql_query = text("SELECT count(DISTINCT(user_id)) total from friend_list ")
            result = self.DB.execute(sql_query, )
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False

        finally:
            self.DB.close()
    async def getTotalUsers(self):
        try:
            sql_query = text("SELECT account_status, count(id) total from users GROUP BY account_status")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()
    async def insertNotificationDetails(self, insert_data):

        try:

            sql_query = text(
                "INSERT INTO notification (`notification_type`,`title`, `details`, `attached`, `sender_id`,`receiver_type`,`status`,`send_time`) VALUES(:notification_type,:title, :details, :attached, :sender_id, :receiver_type, :status, :send_time)"
            )

            result = self.DB.execute(sql_query,
                                     {'notification_type': insert_data.get('notification_type'),'title': insert_data.get('title'),
                                      'details': insert_data.get('details'),
                                      'attached': insert_data.get('attached'),
                                      'sender_id': insert_data.get('sender_id'),
                                      'receiver_type': insert_data.get('receiver_type'),
                                      'status': insert_data.get('status'), 'send_time': insert_data.get('send_time')})


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

           # print(insert_data)
            print(f"Exception-Error: {e}")
            return False
            # return "internal-error"
        finally:
            self.DB.close()

    async def getUnreadUserNotificationList(self):
        try:
            sql_query = text(
                "SELECT * FROM notification WHERE status=1 and receiver_type=3  ORDER BY id ASC")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def updateNotificationStatus(self, notification_id, action_time, status, action_type="read"):
        try:
            # [1] means admin, and 2 means nor mal user
            favorite=1
            if action_type == "read":
                sql_query = text(
                    "UPDATE notification SET `status` = :status,`read_time`= :read_time WHERE id =:notification_id"
                )
                result = self.DB.execute(sql_query,
                                         {'status': status, 'read_time': action_time, 'notification_id': notification_id})

            elif action_type == "delete":
                sql_query = text(
                    "UPDATE notification SET `status` = :status,`delete_time`= :delete_time WHERE id =:notification_id"
                )
                result = self.DB.execute(sql_query,{'status': status, 'delete_time': action_time, 'notification_id': notification_id})

            else:
                sql_query = text(
                    "UPDATE notification SET `is_favorite` = :is_favorite WHERE id =:notification_id"
                )
                result = self.DB.execute(sql_query,{'is_favorite': favorite, 'notification_id': notification_id})


            self.DB.commit()

            if (result.rowcount > 0):
                total_notification = await self.getTotalUnreadUserNotification()
                return total_notification
            else:
                return "0"

        except IntegrityError as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()

    async def getTotalUnreadUserNotification(self):
        try:
            sql_query = text(
                "SELECT count(*) total FROM notification WHERE status=1 and receiver_type=3  ORDER BY id ASC")
            result = self.DB.execute(sql_query)
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def getAllUserNotificationList(self, start, range):
        try:
            sql_query = text(
                """
                SELECT
                    notification.*,
                    CASE
                        WHEN notification.status = 1 THEN 'Unread'
                        WHEN notification.status = 2 THEN 'Read'
                        WHEN notification.status = 3 THEN 'Replied'
                        ELSE 'Unknown Status'
                    END AS notification_status
                FROM
                    notification
                WHERE
                    notification.receiver_type = 3
                    AND notification.status IN (1,2,3)
                ORDER BY
                    notification.status ASC, notification.id DESC limit :start,:range
                    """)
            result = self.DB.execute(sql_query, {'start': start, 'range': range})
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def getTotalAllUserNotificationList(self):
        try:
            sql_query = text(
                "SELECT count(*) total  FROM notification  WHERE notification.receiver_type = 3 AND notification.status IN (1,2,3)")
            result = self.DB.execute(sql_query)
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def getSpecificNotification(self, notification_id):
        try:
            sql_query = text("SELECT *  FROM notification  WHERE id=:notification_id")
            result = self.DB.execute(sql_query, {'notification_id': notification_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def sendNotificationByAdmin(self, insert_data,notification_type="replied"):

        try:

            if notification_type=="replied":
                sql_query = text(
                    "INSERT INTO notification (`notification_type`,`title`, `details`, `receiver_id`, `sender_id`,`receiver_type`,`status`,`send_time`,`replied_notification_id`) "
                    "VALUES(:notification_type, :title, :details, :receiver_id, :sender_id, :receiver_type, :status, :send_time,:replied_notification_id)"
                )

                result = self.DB.execute(sql_query,
                                         {'notification_type': insert_data.get('notification_type'),
                                          'title': insert_data.get('title'), 'details': insert_data.get('details'),
                                          'receiver_id': insert_data.get('receiver_id'),
                                          'sender_id': insert_data.get('sender_id'),
                                          'receiver_type': insert_data.get('receiver_type'),
                                          'status': insert_data.get('status'), 'send_time': insert_data.get('send_time'),
                                          'replied_notification_id': insert_data.get('replied_notification_id')})
            else:

                if insert_data.get('receiver_id')=="":
                    sql_query = text(
                        "INSERT INTO notification (`notification_type`,`title`, `details`, `sender_id`,`receiver_type`,`status`,`send_time`) "
                        "VALUES(:notification_type, :title, :details, :sender_id, :receiver_type, :status, :send_time)"
                    )
                else:
                    sql_query = text(
                        "INSERT INTO notification (`notification_type`,`title`, `details`, `receiver_id`, `sender_id`,`receiver_type`,`status`,`send_time`) "
                        "VALUES(:notification_type, :title, :details, :receiver_id, :sender_id, :receiver_type, :status, :send_time)"
                    )

                #print(sql_query)
                result = self.DB.execute(sql_query,
                                         {'notification_type': insert_data.get('notification_type'),
                                          'title': insert_data.get('title'),
                                          'details': insert_data.get('details'),
                                          'receiver_id': insert_data.get('receiver_id'),
                                          'sender_id': insert_data.get('sender_id'),
                                          'receiver_type': insert_data.get('receiver_type'),
                                          'status': insert_data.get('status'),
                                          'send_time': insert_data.get('send_time')})

            self.DB.commit()

            last_insert_id = result.lastrowid
            return last_insert_id

        except IntegrityError as e:
            self.DB.rollback()
            # return "failed"
            #print(f"Integrity-Error: {e}")
            return False
        except Exception as e:
            self.DB.rollback()
            #print(f"Exception-Error: {e}")
            return False
            # return "internal-error"
        finally:
            self.DB.close()

    async def getUserLoginActivity(self, from_date,to_data,sorted=False):
        try:
            sql_query = text("""
                            SELECT 
                            user_id, DATE_FORMAT(login_session_start, '%Y-%m-%d') active_date, `status`, comments, 
                            
                                 TIMESTAMPDIFF(MINUTE, login_session_start, COALESCE(
                                CASE
                                    WHEN login_session_end IS NULL THEN
                                        CASE
                                            WHEN DATE(login_session_start) = CURRENT_DATE() THEN
                                               NOW()
                                            ELSE
                                                DATE_ADD(login_session_start, INTERVAL 60 MINUTE)
                                        END 
                                    ELSE
                                        login_session_end
                                END,
                                CURRENT_DATE()
                            )) AS total_minutes
                             
                            
                            FROM login_session 
                            WHERE DATE_FORMAT(login_session_start, '%Y-%m-%d') >=DATE_FORMAT(:from_date, '%Y-%m-%d') 
                            and  DATE_FORMAT(COALESCE(DATE(login_session_end), CURRENT_DATE()), '%Y-%m-%d') <=DATE_FORMAT(:to_data, '%Y-%m-%d') 
                            ORDER BY DATE_FORMAT(login_session_start, '%Y-%m-%d') ASC
            
            """)
            result = self.DB.execute(sql_query, {'from_date': from_date,'to_data':to_data})
            data = result.fetchall()  # result.fetchall()

            if data:
                main_data= await self.returnMultipleData(result, data)
                if sorted:
                    array_list = main_data
                    grouped_data = defaultdict(lambda: defaultdict(int))

                    for element in array_list:
                        date_key = element['active_date']
                        user_id = element['user_id']

                        grouped_data[date_key][user_id] += element['total_minutes']

                    result_list = []

                    for date, user_minutes in grouped_data.items():
                        user_list = [
                            {
                                "user_id": user_id,
                                "active_date": date,
                                "total_minutes": total_minutes
                            }
                            for user_id, total_minutes in user_minutes.items()
                        ]
                        result_list.append({date: user_list})

                    return result_list

                else:
                    return main_data
            else:
                return False
        finally:
            self.DB.close()

    async def getUserRegistrationActivity(self, from_date, to_data, group_data=False):
        try:
            sql_query = text("""
                   SELECT DATE_FORMAT(created_at, '%Y-%m-%d') registration_date, account_type,account_mode, gender,department,profession 
                    from users
                    WHERE DATE_FORMAT(created_at, '%Y-%m-%d') >=DATE_FORMAT(:from_date, '%Y-%m-%d') 
                    and  DATE_FORMAT(COALESCE(DATE(created_at), CURRENT_DATE()), '%Y-%m-%d') <=DATE_FORMAT(:to_data, '%Y-%m-%d') 
                    ORDER BY DATE_FORMAT(created_at, '%Y-%m-%d') ASC
            """)
            result = self.DB.execute(sql_query, {'from_date': from_date, 'to_data': to_data})
            data = result.fetchall()  # result.fetchall()

            if data:
                main_data = await self.returnMultipleData(result, data)
                if group_data:

                    organized_data = defaultdict(dict)

                    for entry in main_data:
                        date = entry["registration_date"]

                        if date not in organized_data:
                            organized_data[date] = defaultdict(lambda: defaultdict(int))

                        organized_data[date]["account_type"][entry["account_type"]] += 1
                        organized_data[date]["account_mode"][entry["account_mode"]] += 1
                        organized_data[date]["gender"][entry["gender"]] += 1
                        organized_data[date]["department"][entry["department"]] += 1
                        organized_data[date]["profession"][entry["profession"]] += 1

                    result_data = []

                    for date, attributes in organized_data.items():
                        result_data.append({date: dict(attributes)})

                    return result_data

                else:
                    return main_data
            else:
                return False
        finally:
            self.DB.close()
    async def getClientActivity(self, from_date,to_date):
        try:
            login_activity = await self.getUserLoginActivity(from_date, to_date,True)
            registration_activity = await self.getUserRegistrationActivity(from_date, to_date)
            #print(registration_activity)
            if login_activity and registration_activity:
                 main_data={
                      'status':"success",
                     'registration_activity':registration_activity,
                     'login_activity': login_activity,
                 }
                 return main_data

            else:
                main_data = {
                    'status': "not-found",
                    'registration_activity': False,
                    'login_activity': False,
                }
                return main_data
        finally:
            self.DB.close()


    async def getCurrentLoggedClientModelData(self):
        try:
            sql_query = text("""
                    SELECT count(id) total_active_client
                    from login_session 
                    WHERE `status`=1 
                    and DATE_FORMAT(login_session_start, '%Y-%m-%d') =DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')  

            """)
            result = self.DB.execute(sql_query)
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()
    async def getTotalAccountInfo(self):
        try:
            currentLoggedData = await self.getCurrentLoggedClientModelData()
            total_users = await self.getTotalUsers()
            conversation_active_total_users=await self.getTotalConversationActiveUsers()
            if currentLoggedData:
                 main_data={
                      'status':"success",
                      'data':{
                         'total_users': total_users,
                         'current_logged_users' :currentLoggedData,
                         'total_conversation_users':conversation_active_total_users
                      },
                 }
                 return main_data

            else:
                main_data = {
                    'status': "not-found",
                    'data': False,
                }
                return main_data
        finally:
            self.DB.close()



    async def getUserFeedbackAnalysis(self,from_date,to_date):
        try:
            sql_query = text(
                """
                SELECT feedback_date,user_id,friend_id,account_mode, who_send_request,feedback 
                 from friend_list 
                 where `status`=2 
                 and feedback!='' 
                 and DATE_FORMAT(feedback_date, '%Y-%m-%d') >=DATE_FORMAT(:from_date, '%Y-%m-%d')  
                 and  DATE_FORMAT(COALESCE(DATE(feedback_date), CURRENT_DATE()), '%Y-%m-%d') <=DATE_FORMAT(:to_date, '%Y-%m-%d') 
                """)
            result = self.DB.execute(sql_query,{'from_date':from_date,'to_date':to_date})
            data = result.fetchall()  # result.fetchall()

            if data:
                db_data =await self.returnMultipleData(result, data)

                return db_data
            else:
                return False
        finally:
            self.DB.close()

    async def getUserNotificationModel(self,user_id):
        try:
            sql_query = text(
                """
                SELECT * from notification where receiver_id=:user_id ORDER BY id DESC 
                """)
            result = self.DB.execute(sql_query,{'user_id':user_id})
            data = result.fetchall()  # result.fetchall()

            if data:
                db_data =await self.returnMultipleData(result, data)

                return db_data
            else:
                return False
        finally:
            self.DB.close()