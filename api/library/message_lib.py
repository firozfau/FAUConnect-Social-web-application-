import os
class MessageLib:
    def __init__(self):
        pass

    def getDataInsertMessage(self, status, data=False):
        if status:
            return {
                "status": "success",
                "message": "Your data insert successfully done.",
                "redirect": False,
                "data": data
            }
        else:
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data": data
            }

    def getDataUpdateMessage(self,status,data=False):
        if status=="not-found":
            return {
                "status": "error",
                "message": "Your information was not found in the system.",
                "redirect": False,
                "data": data
            }
        elif status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":data
            }
        elif status == "failed":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again.",
                "redirect": False,
                "data": data
            }
        else:

            success_data={
                    "status":"success",
                    "message":"Your information has been successfully updated.",
                    "redirect":False,
                    "data":data
            }
            error_data = {
                    "status": "error",
                    "message": "Apologies, your request could not be successful. Please try again.",
                    "redirect": False,
                    "data": data
                }
            message_data = success_data if isinstance(status, int) and status > 0 else error_data

            return message_data






    def getSpcialDataUpdateMessage(self,status,data=False):
        if status=="not-found":
            return {
                "status": "error",
                "message": "Your information was not found in the system.",
                "redirect": False,
                "data": data
            }
        elif status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":data
            }
        elif status == "failed":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again.",
                "redirect": False,
                "data": data
            }
        else:

            return {
                    "status":"success",
                    "message":"Your information has been successfully updated.",
                    "redirect":False,
                    "data":data
            }



    def getDataRetriveMessage(self,status,data=False):
        if status=="not-found":
            return {
                "status": "success",
                "message": "We couldn't find any information in our system.",
                "redirect": False,
                "data": data
            }
        elif status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":data
            }
        elif status=="success":
            return{
                "status":"success",
                "message":"Successfully retrieve your expected data",
                "redirect": False,
                "data":data
            }
        else:

            return {
                    "status": "error",
                    "message": "Apologies, your request could not be successful. Please try again.",
                    "redirect": False,
                    "data": data
                }

    def getAnalysisMessage(self, status, data=False):

        if status == "success":
            return {
                "status": "success",
                "message": "Congratulations! We have obtained client analytics information and will check it for you.",
                "redirect": False,
                "data": data
            }
        elif status == "not-found":
            return {
                "status": "success",
                "message":"There is no available data within the specified date range.",
                "redirect": False,
                "data": data
            }
        elif status == "date-error":
            return {
                "status": "error",
                "message": "Please check From and To date, it is not correct!",
                "redirect": False,
                "data": data
            }
        elif status == "client-error":
            return {
                "status": "error",
                "message": "Your requested client could not be found!",
                "redirect": False,
                "data": data
            }
        elif status == "specific-client-error":
            return {
                "status": "error",
                "message": "You select the action type Specified Client but you did not enter the Specified Client ID!",
                "redirect": False,
                "data": data
            }
        else:
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data": data
            }



    def getDataMatchingMessage(self,status,data=False):

        if status == "success":
            return {
                "status": "success",
                "message": "Congratulations! We have obtained important information and will check it for you.",
                "redirect": False,
                "data": data
            }
        elif status=="not-found":
            return {
                "status": "success",
                "message": "Congratulation, You are ready for new match",
                "redirect": False,
                "data": data
            }
        else:
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":data
            }

    def getDataRetriveNotificaitonMessage(self, status, data=False):
        if status == "not-found":
            return {
                "status": "success",
                "message": "We couldn't find any information in our system.",
                "redirect": False,
                "attached_file_location":"",
                "data": data
            }
        elif status == "internal-error":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "attached_file_location": "",
                "data": data
            }
        elif status == "success":
            file_location = os.path.join(os.environ.get("NOTIFICATION_FILE_LOCATION"))
            return {
                "status": "success",
                "message": "Successfully retrieve your expected data",
                "redirect": False,
                "attached_file_location":file_location,
                "data": data
            }
        else:

            return {
                "status": "error",
                "message": "Apologies, your request could not be successful. Please try again.",
                "redirect": False,
                "data": data
            }

    def getUserBasicInformationMessage(self,status,data=False):
        if status == "failed":
            return {
                "status": "error",
                "message": "Apologies, your information could not find our system.",
                "data": False
            }

        elif status =="internal-error":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "data": False
            }
        elif status =="string":
            return {
                "status": "error",
                "message": "Only integer allowed example 1,2,3,3",
                "data": False
            }
        elif status == "success":
            return {
                "status": "success",
                "message": "Successfully showed user basic information.",
                "data": data
            }

    def getPersonalInformatinUpdateMessage(self,status,data=False):
        if status == "failed":
            return {
                "status": "error",
                "message": "Apologies, your information could not be updated. Please review and ensure the accuracy of your input data.",
                "data": False
            }

        elif status =="internal-error":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "data": False
            }
        elif status == "success":
            return {
                "status": "success",
                "message": "Your information has been successfully updated.",
                "data": data
            }

    def getPhotoUploadMessage(self, status,file_name=False):
        if status == "failed":
            return {
                "status": "error",
                "message": "Your image upload failed !",
                "file_location": False,
                "data": False
            }
        elif status == "test":
            return {
                "status": "error",
                "message": "Testing purpose",
                "file_location": False,
                "data": False
            }
        else:

            file_location = os.path.join(os.environ.get("USER_PHOTO_LOCATION"), file_name)

            return {
                "status": "success",
                "message": "Photo uploaded successfully",
                "file_location":file_location,
                "data": False
            }


    def getCompalinMessageData(self, status,data=False):
        if status == "failed":
            return {
                "status": "error",
                "message": "Something is wrong! Your complaint cannot be sent successfully. Please try again.",
                "data": False
            }
        elif status == "test":
            return {
                "status": "error",
                "message": "Testing purpose",
                "data": False
            }
        else:
            return {
                "status": "success",
                "message": "Your complaint has been successfully sent.",
                "data": data
            }

    def getLogoutMessage(self,status):
        if status=="not-found":
            return {
                "status": "error",
                "message": "Your user session is not valid!",
                "redirect": os.environ.get("PROFILE_URL"),
                "data": False
            }
        elif status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": os.environ.get("PROFILE_URL"),
                "data":False
            }
        else:

            success_data={
                    "status":"success",
                    "message":"User session successfully logged out.",
                    "redirect":os.environ.get("LOGIN_URL"),
                    "data":False
            }
            error_data = {
                    "status": "error",
                    "message": "Invalid login session ID.",
                    "redirect": os.environ.get("PROFILE_URL"),
                    "data": False
                }
            message_data = success_data if isinstance(status, int) and status > 0 else error_data

            return message_data

    def getMakeAdminMessage(self,status):
        if status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":False
            }
        elif status == "failed":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data": False
            }
        else:

            return {
                    "status":"success",
                    "message":"This user has been successfully designated as an administrator.",
                    "redirect":False,
                    "data":False
            }

    def getdisabledUserMessage(self,status):
        if status=="internal-error":
            return{
                "status":"error",
                "message":"Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data":False
            }
        elif status == "failed":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data": False
            }
        else:

            return {
                    "status":"success",
                    "message":"Your request successfully done.",
                    "redirect":False,
                    "data":False
            }



    def getTokenVerificatinMessage(self,status,data=False):
        if status=="success":
            return{
                "status":"success",
                "message":"Your email has been successfully verified. You are now ready to enjoy FAUConnect services.",
                "redirect":os.environ.get("LOGIN_URL"),
                "data":data
            }
        elif status=="exist":
            return {
                "status": "exist",
                "message": "Your email has already been verified. Thank you for using our services.",
                "redirect":os.environ.get("LOGIN_URL"),
                "data":data
            }
        elif status=="failed":
            return {
                "status": "error",
                "message": "We're sorry, but there was an issue verifying your email.  Please contact support for assistance. <br> Or try again!",
                "redirect": False,
                "data": False
            }
        elif status == "error":
            return {
                "status": "error",
                "message": "Something is wrong. Please try again or communicate with support.",
                "redirect": False,
                "data": False
            }
        elif status == "test":
            return {
                "status": "test",
                "message": "test error.",
                "redirect": False,
                "data": data
            }
    def getLoginMessageData(self,status_keyword,first_login=False,login_data=False,login_session=False):

        if status_keyword=="success":

            data={
                "status": "success",
                "first_login":first_login,
                "message": "Login successfully done.",
                "redirect_page": os.environ.get("PROFILE_URL"),
                "login_session": login_session,
                "data": login_data
            }

        elif status_keyword=="failed":
            data = {
                "status": "error",
                "message": "Apologies, your login information does not match our records. Please double-check your input and try again.",
                "redirect_page": False,
                "login_session": False,
                "data": False
            }

        elif status_keyword=="not-verified":
            data = {
                "status": "error",
                "message": "Your email is not yet verified. Please verify your email before attempting to log in.",
                "redirect_page": False,
                "login_session": False,
                "data": False
            }
        elif status_keyword=="block":
            data = {
                "status": "error",
                "message": "Your account is currently inactive. Please reach out to our support team for assistance.",
                "redirect_page": False,
                "login_session": False,
                "data": False
            }
        elif status_keyword == "test":
            data = {
                "status": "test",
                "message": "Test",
                "redirect_page": False,
                "login_session": False,
                "data": False
            }
        else:
            data = {
                "status": "error",
                "message": "Something is wrong. Please communicate with support.",
                "redirect_page": False,
                "login_session": False,
                "data": False
            }

        return data


    def getFindUsersMessageData(self,status_keyword,search_data=False):

        if status_keyword=="success":

            data={
                "status": "success",
                "message": "Successfully we get some user information",
                "redirect_page": False,
                "data": search_data
            }

        elif status_keyword=="failed":
            data = {
                "status": "error",
                "message":"Apologies, something is wrong. We did not find any matches for your input. Please try again or communicate with support.",
                "redirect_page": False,
                "data": search_data
            }

        elif status_keyword == "n-exist":
            data = {
                "status": "success",
                "message": "In response to your request, we did not find any information in our system.",
                "redirect_page": False,
                "data": search_data
            }

        elif status_keyword=="wrong-keyword":
            data = {
                "status": "error",
                "message":"Sorry, it seems you entered a vulnerable input in your search keyword.",
                "redirect_page": False,
                "data": search_data
            }

        return data
    def getChangePasswordMessageData(self,status_keyword,login_data=False):

        if status_keyword=="success":

            data={
                "status": "success",
                "message": "Password successfully changed. Please check your email",
                "redirect_page": os.environ.get("PROFILE_URL"),
                "data": login_data
            }

        elif status_keyword=="failed":
            data = {
                "status": "error",
                "message": {
                "new_password":"Apologies, Something is wrong. Please communicate with support."
                 },
                "redirect_page": False,
                "data": login_data
            }

        elif status_keyword=="current-pass":
            data = {
                "status": "error",
                "message":{
                "current_password":"Your current password does not match our system."
            },
                "redirect_page": False,
                "data": login_data
            }


        return data

    def get_default_message(self, message_type, key_word):
        default_messages = {
            "failed": f"{key_word} Failed. Please check your input or try again!",
            "exist": f"{key_word} information already exists. Please check your input.",
            "not-found": f"Sorry, we couldn't find essential information for {key_word} in our system.",
            "not-match": f"Apology, we could not find essential information for {key_word}. Please check your input.",
            "internal-error": "Something is wrong. Please communicate with support."
        }

        status = "success" if isinstance(message_type, int) and message_type > 0 else "error"

        message = default_messages.get(message_type, f"{key_word} Successfully done")

        message_data = {
            "status": status,
            "message": message,
            "data": ""
        }

        return message_data
