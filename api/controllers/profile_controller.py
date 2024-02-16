# profile_controller.py
from fastapi import UploadFile
from library.message_lib import MessageLib
from library.frz_lib import FRZ
import os
from library.json_lib import JsonLib
from models.profile_model import ProfileModel
class Profilefrz:
    def __init__(self):
        self.message = MessageLib()
        self.frz = FRZ()
        self.profileModel = ProfileModel()
        self.jsonObj = JsonLib()
    async def uploadUserPhoto(self, file: UploadFile,user_id):
        try:
            file_content = await file.read()
            file_extension = file.filename.split(".")[-1]
            file_pre_name = f"user_photo_{user_id}_"
            new_filename = f"{file_pre_name}.{file_extension}"

            upload_dir = os.environ.get("USER_PHOTO_UPLOAD_LOCATION")
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, new_filename)

            try:
                with open(file_path, "wb") as new_file:
                    new_file.write(file_content)


                if not os.path.isfile(file_path):
                    return self.message.getPhotoUploadMessage("failed")
                else:
                    # profileModel
                    upload_result = await self.profileModel.uploadUserPhoto(user_id, new_filename)

                    if upload_result == "failed" or upload_result == "internal-error":
                        return self.message.getPhotoUploadMessage("failed")
                    else:
                        return self.message.getPhotoUploadMessage("success",new_filename)

            except Exception as e:
                #print(f"Error writing file: {e}")
                return self.message.getPhotoUploadMessage("failed")

        except Exception as e:
            #print(f"Error handling file: {e}")
            return self.message.getPhotoUploadMessage("failed")


    async def updatePersonalInformation(self, request_data):
        try:
            data = request_data.get("data")
            languages_list = self.jsonObj.getBasicEncoded(data.languages_list)
            interest_list = self.jsonObj.getBasicEncoded(data.interest_list)
            city_list = self.jsonObj.getBasicEncoded(data.city_list)


            personal_information_data = {
                "user_id": data.user_id,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "gender": data.gender,
                "profession": data.profession,
                "search_gender": data.search_gender,
                "search_profession": data.search_profession,
                "languages_list": languages_list,
                "interest_list": interest_list,
                "city_list": city_list
            }

            update_result = await self.profileModel.updatePersonalInformation(personal_information_data)

            return self.message.getPersonalInformatinUpdateMessage(update_result,personal_information_data)

        except Exception as e:
            return self.message.getPersonalInformatinUpdateMessage("failed")

    async def getUserBasicInformation(self,user_id):
        update_result = await self.profileModel.getUserBasicInformation(user_id)
        if update_result:
            db_data = self.jsonObj.getDecoded(update_result)

            return self.message.getUserBasicInformationMessage("success",db_data['data'])
        else:
            return self.message.getUserBasicInformationMessage("failed")



