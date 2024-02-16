
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from database.dbcon import SessionLocal
import re
from library.json_lib import JsonLib

class ProfileModel:
    def __init__(self):
        self.DB = SessionLocal()
        self.jsonObj = JsonLib()

    async def returnMultipleData(self, result, data):
        mergeData = [
            dict(zip(result.keys(), row))
            for row in data
        ]
        return mergeData
    async def uploadUserPhoto(self,user_id,user_photo):
        try:
            sql_query = text(
                "UPDATE users SET `user_photo` = :user_photo WHERE id =:user_id"
            )
            result = self.DB.execute(sql_query, {'user_photo':user_photo , 'user_id':user_id })

            self.DB.commit()

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

    async def isPersonalInformationExist(self, user_id):
        try:
            sql_query = text("SELECT * FROM personal_information WHERE user_id = :user_id")
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return data
            else:
                return False
        finally:
            self.DB.close()

    async def updatePersonalInformation(self,data):
        try:

            user_id=data.get("user_id")
            is_exist_data= await self.isPersonalInformationExist(user_id)
            if is_exist_data:

                try:
                    sql_query = text( "UPDATE personal_information SET `search_gender` = :search_gender,`search_profession`= :search_profession,`languages_list`= :languages_list , `interest_list` = :interest_list , `city_list` = :city_list WHERE user_id =:user_id")
                    result = self.DB.execute(sql_query, {"search_gender": data.get('search_gender'),
                                                         "search_profession": data.get('search_profession'),
                                                         "languages_list": data.get('languages_list'),
                                                         "interest_list": data.get('interest_list'),
                                                         "city_list":data.get('city_list'),
                                                         "user_id": data.get('user_id')})
                    self.DB.commit()

                    if result.rowcount > 0:

                        try:
                            sql_query = text(
                                "UPDATE users SET `first_name` = :first_name,`last_name`= :last_name,`gender`= :gender,`profession`= :profession  WHERE id =:user_id")
                            result = self.DB.execute(sql_query, {"first_name": data.get('first_name'),
                                                                 "last_name": data.get('last_name'),
                                                                 "gender": data.get('gender'),
                                                                 "profession": data.get('profession'),
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
                            #print(f"Error: {e}")
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


    async def getUserBasicInformation(self, user_id):
        try:
            sql_query = text("SELECT users.*,personal_information.interest_list,personal_information.user_id, personal_information.languages_list,personal_information.matching_list,personal_information.mobile,personal_information.objective from users LEFT JOIN personal_information on users.id=personal_information.user_id where users.id= :user_id")
            result = self.DB.execute(sql_query, {"user_id": user_id})
            data = result.fetchone()
            if data:
                return self.jsonObj.getEncoded(data)
            else:
                return False
        finally:
            self.DB.close()

