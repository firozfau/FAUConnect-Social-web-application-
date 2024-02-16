# profile_route.py
from fastapi import APIRouter, Depends, UploadFile, HTTPException, File, Form, Path
from pydantic import BaseModel
from library.validation_lib import photo_validation
from typing import Annotated, List

from library.validation_lib import *
from controllers.profile_controller import Profilefrz
from library.security_lib import verify_token

profile = APIRouter(dependencies=[Depends(verify_token)])
profileController = Profilefrz()


@profile.get("/api/userBasicInformation/{user_id}")
async def userBasicInformation(user_id: int = Path(..., title="User id")):
    data = await profileController.getUserBasicInformation(user_id)
    return data





@profile.post("/api/userPhoto")
async def upload_photo(user_id: int, file: Annotated[UploadFile, File()]):
    validation_result = photo_validation(file.filename, user_id)
    if validation_result["status"] == "error":
        return validation_result
    else:
        data = await profileController.uploadUserPhoto(file, user_id)
        return data


class PersonalInformationRequest(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    gender: int
    profession: int
    search_gender: int
    search_profession: int
    city_list: List[int]
    languages_list: List[int]
    interest_list: List[int]
    class Config:
        # Use custom alias to convert to and from JSON
        json_encoders = {
            set: list,
        }


@profile.post("/api/updatePersonalInformation")
async def updatePersonalInformation(request: PersonalInformationRequest):
    validation_result = personal_information_validation(request)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }

        data = await profileController.updatePersonalInformation(request_data)
        return data