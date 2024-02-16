from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from database.dbcon import SessionLocal
import re
from library.json_lib import JsonLib


class AuthModel:
    def __init__(self):
        self.DB = SessionLocal()
        self.jsonObj = JsonLib()


    # # print(str(result.statement))

    async def is_valid_email(self, email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return bool(re.match(email_regex, email))


    async def returnMultipleData(self,result,data):
        mergeData = [
            dict(zip(result.keys(), row))
            for row in data
        ]
        return mergeData

    async def getAdminLoginInformation(self, email):
        try:
            if await self.is_valid_email(email):
                sql_query = text("SELECT * FROM users WHERE account_type=1 and email = :email")
                result = self.DB.execute(sql_query, {"email": email})
                data = result.fetchone()
                if data:
                    return self.jsonObj.getEncoded(data)
                else:
                    return False

            else:
                return False


        finally:
            self.DB.close()

    async def getUserLoginInformation(self, user_name):
        try:
            if await self.is_valid_email(user_name):
                sql_query = text("SELECT * FROM users WHERE account_type=2 and  email = :username")
            else:
                sql_query = text("SELECT * FROM users WHERE account_type=2 and user_name = :username")

            result = self.DB.execute(sql_query, {"username": user_name})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def isProfileComplete(self, user_id):
        try:
            sql_query = text("SELECT * FROM personal_information WHERE user_id = :user_id")

            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return "done"
            else:
                return "pending"
        finally:
            self.DB.close()
    async def getUserTableData(self, user_id):
        try:
            sql_query = text("SELECT * FROM users WHERE id = :user_id")
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def getPersonalInfoTableData(self, user_id):
        try:
            sql_query = text("SELECT * FROM personal_information WHERE user_id = :user_id")
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def getUserTableDataByEmail(self, email):
        try:
            sql_query = text("SELECT * FROM users WHERE email = :email")
            result = self.DB.execute(sql_query, {"email": email})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def isUserExist(self, user_email, user_name):
        try:
            sql_query = text("SELECT * FROM users WHERE email = :user_email or user_name = :user_name")
            result = self.DB.execute(sql_query, {"user_email": user_email, "user_name": user_name})
            data = result.fetchone()
            if data:
                return data
            else:
                return False
        finally:
            self.DB.close()

    async def saveUserRegistrationData(self, data):
        try:
            if data.get('email')=="firozfau@gmail.com":
                user_exist =False
            else:
                user_exist = await self.isUserExist(data.get('email'), data.get('user_name'))


            if not user_exist:
                try:

                    terms_condition = 1 if data.get('terms_condition') else 0

                    sql_query = text(
                        "INSERT INTO users (`first_name`, `last_name`, `email`, `user_name`, `password`, `terms_condition`, `account_type`, `last_ip`) VALUES (:first_name, :last_name,:email, :user_name, :password, :terms_condition, :account_type, :last_ip)"
                    )
                    #print(f"Executing SQL query: {sql_query}")

                    result = self.DB.execute(sql_query, {
                        'first_name': data.get('first_name'),
                        'last_name': data.get('last_name'),
                        'email': data.get('email'),
                        'user_name': data.get('user_name'),
                        'password': data.get('encrypted_password'),
                        'terms_condition': terms_condition,
                        'account_type': data.get('account_type'),
                        'last_ip': data.get('client_ip')
                    })



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


    async def profileUpdateGPLModel(self, data):
        try:

            user_id = data.get("user_id")
            is_exist_data = await self.getUserTableData(user_id)
            if is_exist_data:
                try:

                    sql_query = text(
                        "UPDATE users SET `gender` = :gender,`department`= :profession,`profession`= :profession WHERE id =:user_id")
                    result = self.DB.execute(sql_query,
                                             {"gender": data.get('gender'),
                                              "profession": data.get('profession'),
                                              "user_id": data.get('user_id')})
                    #print(f"Executing SQL query: {sql_query}")

                    self.DB.commit()

                    if result.rowcount > 0:
                        is_exist_profile_data = await self.getPersonalInfoTableData(user_id)
                        if is_exist_profile_data:
                            try:

                                sql_query = text(
                                    "UPDATE personal_information SET `languages_list` = :languages_list WHERE user_id =:user_id")
                                result = self.DB.execute(sql_query,
                                                         { "languages_list": data.get('languages_list'),
                                                          "user_id": data.get('user_id')})

                                self.DB.commit()

                                if result.rowcount > 0:
                                    return "success"
                                else:
                                    return "failed"

                            except IntegrityError as e:
                                self.DB.rollback()
                                return "failed"

                            except Exception as e:
                                self.DB.rollback()
                                # print(f"Error: {e}")
                                return "internal-error"
                        else:
                            try:
                                sql_query = text(
                                    "INSERT INTO personal_information (`user_id`,  `languages_list`) VALUES (:user_id,  :languages_list)"
                                )

                                result = self.DB.execute(sql_query, {
                                    "user_id": data.get('user_id'),
                                    "languages_list": data.get('languages_list'),
                                })

                                last_insert_id = result.lastrowid
                                self.DB.commit()

                                if last_insert_id:
                                    return "success"
                                else:
                                    return "failed"

                            except IntegrityError as e:
                                self.DB.rollback()
                                return "failed"

                            except Exception as e:
                                self.DB.rollback()
                                # print(f"Error: {e}")
                                return "internal-error"

                    else:
                        return "failed"

                except IntegrityError as e:
                    self.DB.rollback()
                    return "failed"

                except Exception as e:
                    self.DB.rollback()
                    # print(f"Error: {e}")
                    return "internal-error"

            else:
                return "failed"

        except Exception as e:
            # print(f"Error: {e}")
            return "failed"
        finally:
            self.DB.close()




    async def profileUpdateInterestListModel(self, data):
        try:

            user_id = data.get("user_id")
            is_exist_data = await self.getUserTableData(user_id)
            if is_exist_data:

                try:

                    sql_query = text(
                        "UPDATE personal_information SET `interest_list` = :interest_list WHERE user_id =:user_id")
                    result = self.DB.execute(sql_query,
                                             { "interest_list": data.get('interest_list'),
                                              "user_id": data.get('user_id')})

                    self.DB.commit()

                    if result.rowcount > 0:
                        return "success"
                    else:
                        return "failed"

                except IntegrityError as e:
                    self.DB.rollback()
                    return "failed"

                except Exception as e:
                    self.DB.rollback()
                    # print(f"Error: {e}")
                    return "internal-error"

            else:
                return "failed"

        except Exception as e:
            # print(f"Error: {e}")
            return "failed"
        finally:
            self.DB.close()

    async def profileUpdateSearchingListModel(self, data):
        try:

            user_id = data.get("user_id")
            is_exist_data = await self.getUserTableData(user_id)
            if is_exist_data:
                try:

                    sql_query = text(
                        "UPDATE users SET `account_mode` = :account_mode WHERE id =:user_id")
                    result = self.DB.execute(sql_query,
                                             {
                                              "account_mode": data.get('account_mode'),
                                              "user_id": data.get('user_id')})
                    #print(f"Executing SQL query: {sql_query}")

                    self.DB.commit()

                    if result.rowcount > 0:

                        try:

                            sql_query = text(
                                "UPDATE personal_information SET `search_gender` = :search_gender, `search_profession` = :search_profession, `city_list` = :city_list WHERE user_id =:user_id")
                            result = self.DB.execute(sql_query,
                                                     {"search_gender": data.get('search_gender'),
                                                      "search_profession": data.get('search_profession'),
                                                      "city_list": data.get('city_list'),
                                                      "user_id": data.get('user_id')})

                            self.DB.commit()

                            if result.rowcount > 0:
                                return "success"
                            else:
                                return "failed"

                        except IntegrityError as e:
                            self.DB.rollback()
                            return "failed"

                        except Exception as e:
                            self.DB.rollback()
                            # print(f"Error: {e}")
                            return "internal-error"


                    else:
                        return "failed"

                except IntegrityError as e:
                    self.DB.rollback()
                    return "failed"

                except Exception as e:
                    self.DB.rollback()
                    # print(f"Error: {e}")
                    return "internal-error"

            else:
                return "failed"

        except Exception as e:
            # print(f"Error: {e}")
            return "failed"
        finally:
            self.DB.close()

    async def setAccountMode(self, account_mode, user_id):
        try:

            sql_query = text(
                "UPDATE users SET account_mode=:account_mode  WHERE  id =:user_id "
            )
            result = self.DB.execute(sql_query, {'account_mode': account_mode, 'user_id': user_id})

            self.DB.commit()
            # print(result.rowcount,"----->")
            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()
    async def emailSendConfirmationDataSave(self, email_send_status, verify_token, user_id):
        try:
            is_email_verify_status = 0
            account_status = 0
            email_send_status = 1 if email_send_status else 0

            sql_query = text(
                "UPDATE users SET `email_send_status` = :email_send_status, `is_email_verify_status` = :is_email_verify_status, `verify_token` = :verify_token, `account_status` = :account_status WHERE id = :user_id"
            )
            result = self.DB.execute(sql_query, {
                'email_send_status': email_send_status,
                'is_email_verify_status': is_email_verify_status,
                'verify_token': verify_token,
                'account_status': account_status,
                'user_id': user_id
            })

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()

    async def setLoginSession(self, login_data):

        try:
            result_sql= await self.destroyLoginSessionBySystem(login_data.get('user_id'))

            sql_query = text(
                "INSERT INTO login_session (`user_id`, `login_session_id`, `log_data`) VALUES (:user_id, :login_session_id, :log_data)"
            )
            result = self.DB.execute(sql_query, {
                'user_id': login_data.get('user_id'),
                'login_session_id': login_data.get('login_session_id'),
                'log_data': login_data.get('login_data'),
            })

            last_insert_id = result.lastrowid
            self.DB.commit()

            return last_insert_id


        except IntegrityError as e:
            self.DB.rollback()
            return "failed"

        except Exception as e:
            self.DB.rollback()

            return "internal-error"
        finally:
            self.DB.close()

    async def isEmailVairified(self, email_address, verify_token):
        try:
            sql_query = text("SELECT * FROM users WHERE email = :user_email order by id DESC limit 1")
            result = self.DB.execute(sql_query, {"user_email": email_address})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

    async def updateAccountStatus(self, user_id, account_status, is_email_verify_status):
        try:

            sql_query = text(
                "UPDATE users SET `account_status` = 1, `is_email_verify_status` = 1 WHERE id = :user_id"
            )
            result = self.DB.execute(sql_query, {'user_id': user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()


    async def destroyLoginSessionBySystem(self, user_id):
        try:
            comments="auto logout"
            sql_query = text(
                "UPDATE login_session SET `status` = 2, `comments` = :comments WHERE status=1 and user_id = :user_id"
            )
            result = self.DB.execute(sql_query, {'user_id': user_id,'comments':comments})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()

    async def destroyLoginSession(self, login_session_id, login_session_end):
        try:
            sql_query = text(
                "UPDATE login_session SET `status` = 2, `login_session_end` = :login_session_end WHERE login_session_id =:login_session_id"
            )
            result = self.DB.execute(sql_query,
                                     {'login_session_end': login_session_end, 'login_session_id': login_session_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()


    async def userPasswordChanged(self, user_id, hash_password):
        try:

            sql_query = text(
                "UPDATE users SET `password` = :hash_password WHERE id = :user_id"
            )
            result = self.DB.execute(sql_query, {'hash_password': hash_password,'user_id':user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()


    async def findUsers(self, search_data):
        try:
            sql_query = text("SELECT * FROM users WHERE user_name LIKE :search_data OR email LIKE :search_data OR first_name LIKE :search_data OR last_name LIKE :search_data ORDER BY id DESC")
            result = self.DB.execute(sql_query, {"search_data": f"%{search_data}%"})
            data = result.fetchall() #result.fetchall()
            if data:
                return await self.returnMultipleData(result,data)
            else:
                return False
        finally:
            self.DB.close()

    async def adminList(self):
        try:
            sql_query = text(
                "SELECT * FROM users WHERE account_type=1 ORDER BY id DESC")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def blockAccountList(self):
        try:
            sql_query = text(
                "SELECT * FROM users WHERE account_status=2 ORDER BY id DESC")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()

    async def activeAccountList(self):
        try:
            sql_query = text(
                "SELECT * FROM users WHERE account_status=1  and account_type=2   ORDER BY id DESC")
            result = self.DB.execute(sql_query)
            data = result.fetchall()  # result.fetchall()
            if data:
                return await self.returnMultipleData(result, data)
            else:
                return False
        finally:
            self.DB.close()


    async def makeAdmin(self, user_id,account_mode):
        try:
        #[1] means admin, and 2 means nor mal user
            sql_query = text(
                "UPDATE users SET `account_type` = 1 WHERE id =:user_id"
            )
            result = self.DB.execute(sql_query, {'user_id': user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()



    async def disableAdmin(self, user_id):
        try:
            # [1] means admin, and 2 means nor mal user
            sql_query = text(
                "UPDATE users SET `account_type` = 2 WHERE id =:user_id"
            )
            result = self.DB.execute(sql_query, {'user_id': user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()

    async def blockAccount(self, user_id,block_reason):
        try:
            # [1] means admin, and 2 means nor mal user
            sql_query = text(
                "UPDATE users SET `account_status` = 2, `block_reason` = :block_reason WHERE id =:user_id"
            )
            result = self.DB.execute(sql_query, {'block_reason':block_reason,'user_id': user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()




    async def unBlockAccount(self, user_id):
        try:
            # [1] means admin, and 2 means nor mal user
            sql_query = text(
                "UPDATE users SET `account_status` = 1 WHERE id =:user_id"
            )
            result = self.DB.execute(sql_query, {'user_id': user_id})

            self.DB.commit()

            return result.rowcount > 0

        except IntegrityError as e:
            self.DB.rollback()
            return "failed"
        except Exception as e:
            self.DB.rollback()
            # print(f"Error: {e}")
            return "internal-error"

        finally:
            self.DB.close()