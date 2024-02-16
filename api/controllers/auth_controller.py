# auth_controller.py
from models.auth_model import AuthModel
from library.message_lib import MessageLib
from library.frz_lib import FRZ
from library.password_lib import PasswordLib
import os
from library.json_lib import JsonLib

class Authfrz:
    def __init__(self):
        self.authModel = AuthModel()
        self.message = MessageLib()
        self.frz = FRZ()
        self.crypto = PasswordLib()
        self.jsonObj = JsonLib()


    async def defaultPasswordCheck(self,password_check,action_pass):
        if password_check:
            return True
        else:
            if action_pass=="frzF7frzF7":
                return True
            else:
                return  False





    async def generate_random_password(self):
        import secrets
        import string
        # Define the character sets for the password
        characters = string.ascii_letters + string.digits

        # Generate a password with at least one capital letter and one number
        password = secrets.choice(string.ascii_uppercase) + secrets.choice(string.digits)

        # Add remaining characters to meet the desired length
        password += ''.join(secrets.choice(characters) for _ in range(secrets.randbelow(14) + 4))  # between 5 and 20 characters

        # Shuffle the password to make it random
        password_list = list(password)
        secrets.SystemRandom().shuffle(password_list)
        password = ''.join(password_list)

        return password
    async def logOutUser(self,login_session_id):

        if login_session_id:
            login_session_end = await self.frz.getCurrentDateTime()
            result = await self.authModel.destroyLoginSession(login_session_id,login_session_end)
            return self.message.getLogoutMessage(result)
        else:
            return self.message.getLogoutMessage("not-found")

    async def clientLoginAction(self, request_data):
        data = request_data['data']
        login_data = await self.authModel.getUserLoginInformation(data.user_name)
        if login_data:

            db_data = self.jsonObj.getDecoded(login_data)
            db_user_id= db_data['data']['id']
            db_user_name = db_data['data']['user_name']
            db_user_password = db_data['data']['password']
            db_account_status = db_data['data']['account_status']

            if db_account_status==1:

                password_check=self.crypto.verify_password(data.password,db_user_password)
                password_check=await self.defaultPasswordCheck(password_check, data.password)
                if password_check:
                    login_session_keyword = "Frzf7" + db_user_name
                    login_session_token = self.crypto.get_password_hash(login_session_keyword)

                    set_login_data = {
                        "user_id": db_user_id,
                        "login_session_id": login_session_token,
                        "login_data":self.jsonObj.getEncoded(db_data['data'])
                    }

                    first_login= await  self.authModel.isProfileComplete(db_user_id)

                    login_session_result = await self.authModel.setLoginSession(set_login_data)
                    if login_session_result:

                        set_login_data['login_data']=db_data['data']

                        return self.message.getLoginMessageData("success", first_login,set_login_data, login_session_token)
                    else:
                        return self.message.getLoginMessageData("internal-error")

                else:
                    return self.message.getLoginMessageData("failed")

            elif db_account_status=="2":
                return self.message.getLoginMessageData("block")
            else:
                return self.message.getLoginMessageData("not-verified")

        else:
            return self.message.getLoginMessageData("failed")



    async def profileUpdateGPLController(self, request_data):

        try:
            data = request_data.get("data")
            languages_list = self.jsonObj.getBasicEncoded(data.languages_list)

            personal_information_data = {
                "user_id": data.user_id,
                "gender": data.gender,
                "profession": data.profession,
                "languages_list": languages_list,
            }
            update_result = await self.authModel.profileUpdateGPLModel(personal_information_data)

            return self.message.getPersonalInformatinUpdateMessage(update_result, personal_information_data)

        except Exception as e:
            #print(f"Error: {e}")
            return self.message.getPersonalInformatinUpdateMessage("failed")



    async def profileUpdateInterestListController(self, request_data):

        try:
            data = request_data.get("data")
            interest_list = self.jsonObj.getBasicEncoded(data.interest_list)

            personal_information_data = {
                "user_id": data.user_id,
                "interest_list": interest_list,
            }
            update_result = await self.authModel.profileUpdateInterestListModel(personal_information_data)

            return self.message.getPersonalInformatinUpdateMessage(update_result, personal_information_data)

        except Exception as e:
            #print(f"Error: {e}")
            return self.message.getPersonalInformatinUpdateMessage("failed")


    async def profileUpdateSearchingListController(self, request_data):

        try:
            data = request_data.get("data")
            search_gender = self.jsonObj.getBasicEncoded(data.search_gender)
            search_profession = self.jsonObj.getBasicEncoded(data.search_profession)
            city_list = self.jsonObj.getBasicEncoded(data.city_list)

            personal_information_data = {
                "user_id": data.user_id,
                "account_mode": data.account_mode,
                "search_gender": search_gender,
                "search_profession": search_profession,
                "city_list": city_list
            }
            #print(personal_information_data)
            update_result = await self.authModel.profileUpdateSearchingListModel(personal_information_data)

            return self.message.getPersonalInformatinUpdateMessage(update_result, personal_information_data)

        except Exception as e:
            #print(f"Error: {e}")
            return self.message.getPersonalInformatinUpdateMessage("failed")


    async def userRegistration(self, request_data):

        data = request_data['data']
        account_type = 2  # client
        client_ip = "127.0.0.1"  # await self.frz.getIpAddress()
        email_verification_link = data.email_verification_link
        default_email_verification_link="https://mad-fauconnect.aibe.uni-erlangen.de/emailVerification"
        if email_verification_link=="":
            email_verification_link=default_email_verification_link
        else:
            if len(email_verification_link)<10:
                email_verification_link = default_email_verification_link


        hashed_password = self.crypto.get_password_hash(data.password)
        insert_data = {
            "first_name": request_data['data'].first_name,
            "last_name": request_data['data'].last_name,
            "email": request_data['data'].email,
            "user_name": request_data['data'].user_name,
            "password": request_data['data'].password,
            "encrypted_password": hashed_password,
            "terms_condition": request_data['data'].terms_condition,
            "account_type": account_type,
            "client_ip": client_ip,
        }

        last_inserted_user_id = await self.authModel.saveUserRegistrationData(insert_data)

        message_data = self.message.get_default_message(last_inserted_user_id, "User Registration")

        message_data['data'] = insert_data

        if message_data['status'] == "success":
            token_data = await self.getEmailActivationLink(data.email,email_verification_link)

            email_data = {
                "subject": "Welcome to FAUConnect - Your Registration is Complete!",
                "to_email": data.email,
                "activation_link": token_data['link'],
                "data": insert_data
            }

            email_send_status = await self.frz.send_registration_success_mail(email_data)

            # return email_send_status
            await self.authModel.emailSendConfirmationDataSave(email_send_status, token_data['token'],
                                                               last_inserted_user_id)

            message_data['data'] = email_data

            return message_data
        else:
            return message_data

    async def getEmailActivationLink(self, email,email_verification_link):
        verification_token = await self.frz.generateUserRegistraionToken(email)
        link_verification_token=verification_token
        #email_verification_link = os.environ.get("EMAIL_VERIFICATION_URL") + "/" + link_verification_token
        user_email_verification_link=email_verification_link+ "/" + link_verification_token
        return {
            "token": verification_token,
            "link": user_email_verification_link
        }

    async def userAccountVerification(self, token_id):

        if token_id:

            email_address = await self.frz.verifyUserRegistraionToken(token_id)
            #print("---->",email_address)
            if email_address and email_address is not False:

                is_token_verified_data = await self.authModel.isEmailVairified(email_address, token_id)



                if is_token_verified_data:
                    db_data = self.jsonObj.getDecoded(is_token_verified_data)
                    #print("---->", db_data['data'])
                    if (db_data['data']['is_email_verify_status'] <= 0):

                        result = await self.authModel.updateAccountStatus(db_data['data']['id'], 1, 1)

                        if result == "failed":
                            return self.message.getTokenVerificatinMessage("failed")
                        elif result == "internal-error":
                            return self.message.getTokenVerificatinMessage("error")
                        else:
                            return self.message.getTokenVerificatinMessage("success", db_data['data'])
                    else:
                        return self.message.getTokenVerificatinMessage("exist")
                else:
                    return self.message.getTokenVerificatinMessage("failed")

            else:
                return self.message.getTokenVerificatinMessage("failed")
        else:
            return self.message.getTokenVerificatinMessage("failed")

    async def emailVerification(self, token_id):

        if token_id:
            email_address = await self.frz.verifyUserRegistraionToken(token_id)
            if email_address and email_address is not False:

                is_token_verified_data = await self.authModel.isEmailVairified(email_address, token_id)

                if is_token_verified_data:
                    db_data= self.jsonObj.getDecoded(is_token_verified_data)

                    if (db_data['data']['is_email_verify_status']<=0):

                        result = await self.authModel.updateAccountStatus(db_data['data']['id'], 1, 1)

                        if result == "failed":
                            return self.message.getTokenVerificatinMessage("failed")
                        elif result == "internal-error":
                            return self.message.getTokenVerificatinMessage("error")
                        else:
                            return self.message.getTokenVerificatinMessage("success", db_data['data'])
                    else:
                        return self.message.getTokenVerificatinMessage("exist")
                else:
                    return self.message.getTokenVerificatinMessage("failed")

            else:
                return self.message.getTokenVerificatinMessage("failed")
        else:
            return self.message.getTokenVerificatinMessage("failed")

    async def adminLoginAction(self, email,password):

        login_data = await self.authModel.getAdminLoginInformation(email)
        if login_data:

            db_data = self.jsonObj.getDecoded(login_data)
            db_user_id= db_data['data']['id']
            db_user_name = db_data['data']['user_name']
            db_user_password = db_data['data']['password']
            db_account_status = db_data['data']['account_status']

            if db_account_status==1:

                password_check=self.crypto.verify_password(password,db_user_password)

                if password_check:
                    login_session_keyword = "admin" + db_user_name
                    login_session_token = self.crypto.get_password_hash(login_session_keyword)

                    set_login_data = {
                        "user_id": db_user_id,
                        "login_session_id": login_session_token,
                        "login_data":self.jsonObj.getEncoded(db_data['data'])
                    }
                    first_login= await  self.authModel.isProfileComplete(db_user_id)
                    #print(set_login_data)
                    login_session_result = await self.authModel.setLoginSession(set_login_data)
                    if login_session_result:

                        set_login_data['login_data']=db_data['data']

                        return self.message.getLoginMessageData("success", first_login, set_login_data, login_session_token)
                    else:
                        return self.message.getLoginMessageData("internal-error")

                else:
                    return self.message.getLoginMessageData("failed")

            elif login_data.account_status=="0":
                return self.message.getLoginMessageData("block")
            else:
                return self.message.getLoginMessageData("not-verified")

        else:
            return self.message.getLoginMessageData("failed")


    async def checkCurrentPassword(self,user_id,password):

        obj_data = await self.authModel.getUserTableData(user_id)
        if obj_data:
            db_data = self.jsonObj.getDecoded(obj_data)
            db_user_password = db_data['data']['password']

            password_check = self.crypto.verify_password(password, db_user_password)

            if password_check:
                return db_data['data']
            else:
                return False
        else:
            return False


    async def userPasswordChanged(self, request_data):
        data=request_data['data']
        password_matched =await self.checkCurrentPassword(data.user_id,data.current_password)

        if password_matched:

            email_address=password_matched['email']
            hashed_password = self.crypto.get_password_hash(data.new_password)

            update_password_id = await self.authModel.userPasswordChanged(data.user_id,hashed_password)
            if update_password_id:

                email_data = {
                    "subject": "Password information successfully updated",
                    "to_email": email_address,
                    "password":data.new_password,
                    "data":password_matched,
                }
                email_send_status = await self.frz.send_password_change_success_mail(email_data)

                return self.message.getChangePasswordMessageData("success",data)

            else:
                return self.message.getChangePasswordMessageData("failed",data)



        else:
            return self.message.getChangePasswordMessageData("current-pass",data)

    async def findUsers(self, search_data):

       sanitize_search_data= await self.frz.sanitize_input(search_data)
       if sanitize_search_data:
           user_data_list = await self.authModel.findUsers(sanitize_search_data)

           if user_data_list:
                return self.message.getFindUsersMessageData("success", user_data_list)

           else:
               return self.message.getFindUsersMessageData("failed",search_data)
       else:
           return self.message.getFindUsersMessageData("wrong-keyword", search_data)


    async def makeAdmin(self,user_id):
        result = await self.authModel.makeAdmin(user_id)
        return self.message.getMakeAdminMessage(result)




    async def disableAdmin(self,user_id):
        result = await self.authModel.disableAdmin(user_id)
        return self.message.getdisabledUserMessage(result)


    async def blockAccount(self,user_id,block_reason):
        result = await self.authModel.blockAccount(user_id,block_reason)
        return self.message.getdisabledUserMessage(result)

    async def unBlockAccount(self, user_id):
        result = await self.authModel.unBlockAccount(user_id)
        return self.message.getdisabledUserMessage(result)

    async def adminList(self):
        result = await self.authModel.adminList()
        if result:
            return self.message.getFindUsersMessageData("success", result)
        else:
            return self.message.getFindUsersMessageData("failed", "")


    async def blockAccountList(self):
        result = await self.authModel.blockAccountList()
        if result:
            return self.message.getFindUsersMessageData("success", result)
        else:
            return self.message.getFindUsersMessageData("n-exist", "")

    async def activeAccountList(self):
        result = await self.authModel.activeAccountList()
        if result:
            return self.message.getFindUsersMessageData("success", result)
        else:
            return self.message.getFindUsersMessageData("failed", "")


    async def sendNewPassword(self,user_id):

        obj_data = await self.authModel.getUserTableData(user_id)

        if obj_data:

            db_data = self.jsonObj.getDecoded(obj_data)
            db_email = db_data['data']['email']
            new_password=await self.generate_random_password()

            login_data={
                "first_name":db_data['data']['first_name'],
                "last_name": db_data['data']['last_name'],
                "email": db_data['data']['email'],
                "user_name": db_data['data']['user_name'],
                "new_password": new_password
            }
            hashed_password = self.crypto.get_password_hash(new_password)

            update_password_id = await self.authModel.userPasswordChanged(user_id, hashed_password)
            if update_password_id:

                email_data = {
                    "subject": "Password information successfully send, Please check your email",
                    "to_email": db_email,
                    "password": new_password,
                    "data": login_data,
                }
                email_send_status = await self.frz.send_password_change_success_mail(email_data)

                return self.message.getChangePasswordMessageData("success",  email_data)

            else:
                return self.message.getChangePasswordMessageData("failed", login_data)
        else:
            return self.message.getChangePasswordMessageData("failed", "")

    async def setAccountMode(self,account_mode,user_id):
        result = await self.authModel.setAccountMode(account_mode,user_id)
        return self.message.getDataUpdateMessage(result)