# auth_route.py
from fastapi import APIRouter, Path, Depends
from pydantic import BaseModel
from library.validation_lib import *
from controllers.auth_controller import Authfrz

from library.security_lib import verify_token
import os
from library.json_lib import JsonLib
from typing import Annotated, List
auth = APIRouter(dependencies=[Depends(verify_token)])
autController = Authfrz()



@auth.get("/api/userPhoto")
async def userPhoto():
        return {
            "status":"success",
            "user_photo_link":os.path.join(os.environ.get("REMOTE_USER_PHOTO_LINK"),"")
        }

class LogoutLoginSession(BaseModel):
    login_session_id: str

@auth.post("/api/logout")
async def logout(request: LogoutLoginSession):
    validation_result = LogoutLoginSession_validation(request.login_session_id)
    if validation_result["status"] == "error":
        return validation_result
    else:
        data = await autController.logOutUser(request.login_session_id)
        return data
        # return {"status": "success", "message": "Login successful"}


class LoginRequest(BaseModel):
    user_name: str
    password: str


@auth.post("/api/userLogin")
async def login(request: LoginRequest):
    validation_result = login_validation(request.user_name, request.password)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }

        data = await autController.clientLoginAction(request_data)
        return data
        # return {"status": "success", "message": "Login successful"}


class userRegistrationRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    user_name: str
    password: str
    confirm_password: str
    terms_condition: bool
    email_verification_link:str
    class Config:
        extra = "forbid"  # Ensure no extra fields are allowed


@auth.post("/api/userRegistration",description="Default email verification link: https://mad-fauconnect.aibe.uni-erlangen.de/emailVerification")
async def userRegistration(request: userRegistrationRequest):
    validation_result = userRegistrationRequestValidation(
        request.first_name,
        request.last_name,
        request.email,
        request.user_name,
        request.password,
        request.confirm_password,
        request.terms_condition,
    )
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional":""
        }

        data = await autController.userRegistration(request_data)
        return data




class profileUpdateGPLclass(BaseModel):
    user_id: int
    gender: int
    profession: int
    languages_list: List[int]
    class Config:
        # Use custom alias to convert to and from JSON
        json_encoders = {
            set: list,
        }

@auth.post("/api/profileUpdateGPL")
async def profileUpdateGPL(request: profileUpdateGPLclass):
    validation_result = validationProfileUpdateGPL(request)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }
        #return request_data
        data = await autController.profileUpdateGPLController(request_data)
        return data




class profileUpdateInterestListclass(BaseModel):
    user_id: int
    interest_list: List[int]
    class Config:
        # Use custom alias to convert to and from JSON
        json_encoders = {
            set: list,
        }

@auth.post("/api/profileUpdateInterestList")
async def profileUpdateInterestList(request: profileUpdateInterestListclass):
    validation_result = validationProfileUpdateInterestList(request)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }
        #return request_data
        data = await autController.profileUpdateInterestListController(request_data)
        return data






class profileUpdateSearchingListclass(BaseModel):
    user_id: int
    account_mode: int
    search_gender: List[int]
    search_profession: List[int]
    city_list: List[int]
    class Config:
        # Use custom alias to convert to and from JSON
        json_encoders = {
            set: list,
        }

@auth.post("/api/profileUpdateSearchingList")
async def profileUpdateSearchingList(request: profileUpdateSearchingListclass):
    validation_result = validationProfileUpdateSearchingList(request)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }
        #return request_data
        data = await autController.profileUpdateSearchingListController(request_data)
        return data




 


description_example = (
    "Account-mode:<br> 1: Inspiration mode (randomly match) "
    "<br>2: Focus mode (expertise or interest)<br>3: Invisible mode (Nobody found them)<br>4: Vacation mode (found but not allowed for a match)"
)

@auth.post("/api/setAccountMode", description=description_example)
async def setAccountMode(account_mode:int,user_id:int):
    validation_result = setAccountModeValidation(user_id,account_mode)
    if validation_result["status"] == "error":
        return validation_result

    data = await autController.setAccountMode(account_mode, user_id)
    return data



class AdminLoginRequest(BaseModel):
    email: str
    password: str


@auth.post("/api/adminLogin")
async def login(request: AdminLoginRequest):
    validation_result = admin_login_validation(request.email, request.password)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes


        data = await autController.adminLoginAction(request.email,request.password)
        return data
        # return {"status": "success", "message": "Login successful"}




class userPasswordChangedRequest(BaseModel):
    user_id: int
    current_password: str
    new_password: str
    confirm_password: str
@auth.post("/api/userPasswordChanged")
async def userPasswordChanged(request: userPasswordChangedRequest):
    validation_result = userPasswordChanged_validation(request.user_id, request.current_password, request.new_password, request.confirm_password)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        request_data = {
            "data": request,
            "optional": ""
        }

        data = await autController.userPasswordChanged(request_data)
        return data
        # return {"status": "success", "message": "Login successful"}



class findUsers(BaseModel):
    search_data: str


@auth.post("/api/findUsers")
async def findUsers(request: findUsers):
    validation_result = find_user_validation(request.search_data)
    if validation_result["status"] == "error":
        return validation_result
    else:
        # Your login logic here if validation passes
        data = await autController.findUsers(request.search_data)
        return data

@auth.post("/api/makeAdmin")
async def makeAdmin(user_id: int ):

    data = await autController.makeAdmin(user_id)
    return data

@auth.post("/api/disableAdmin")
async def disableAdmin(user_id: int ):

    data = await autController.disableAdmin(user_id)
    return data

@auth.post("/api/blockAccount")
async def blockAccount(user_id: int,block_reason:str ):
    data = await autController.blockAccount(user_id,block_reason)
    return data
@auth.post("/api/unBlockAccount")
async def unBlockAccount(user_id: int):
    data = await autController.unBlockAccount(user_id)
    return data

@auth.post("/api/sendNewPassword")
async def sendNewPassword(user_id: int):
    data = await autController.sendNewPassword(user_id)
    return data

@auth.get("/api/adminList")
async def adminList():
    data = await autController.adminList()
    return data

@auth.get("/api/blockAccountList")
async def blockAccountList():
    data = await autController.blockAccountList()
    return data

@auth.get("/api/activeAccountList")
async def activeAccountList():
    data = await autController.activeAccountList()
    return data
