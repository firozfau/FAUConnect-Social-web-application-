# matching_route.py
from fastapi import APIRouter, Depends, UploadFile, HTTPException, File, Form, Path,Query
from pydantic import BaseModel
from library.validation_lib import *
from controllers.general_controller import GeneralController
from library.security_lib import verify_token
from typing import List
from typing import Annotated, List
from datetime import date

general = APIRouter(dependencies=[Depends(verify_token)])
generalController = GeneralController()


@general.post("/api/userNotification")
async def userNotification(user_id: int, title: str, details: str, file: Annotated[UploadFile, File()] = None):
    file_name = file if file is not None else ""
    validation_result = user_complain_validation(file_name, user_id, title, details)
    if validation_result["status"] == "error":
        return validation_result
    else:
        return await generalController.userNotification(user_id, title, details, file)


class GetUserAllNotificationClass(BaseModel):
    user_id: str

@general.get("/api/userNotification")
async def user_notification(user_id: str = Query(..., alias="user_id")):
    # Perform actions to retrieve notifications for the specified user_id
    return await generalController.getUserNotification(user_id)
    #return {"user_id": user_id, "notifications": []}




@general.get("/api/getTotalUnreadUserNotification")
async def getTotalUnreadUserNotification():
    return await generalController.getTotalUnreadUserNotification()


@general.get("/api/getUnreadUserNotificationList")
async def getUnreadNotificationList():
    return await generalController.getUnreadUserNotificationList()


class updateNotificationStatusData(BaseModel):
    notification_id: int
    status: int


@general.post("/api/updateNotificationStatus")
async def updateNotificationStatus(request: updateNotificationStatusData):

    return await generalController.updateNotificationStatus(request.notification_id, request.status)


class getAllUserNotificationListClass(BaseModel):
    start: int
    range: int
@general.post("/api/getAllUserNotificationList")
async def getAllUserNotificationList(request: getAllUserNotificationListClass):
    return await generalController.getAllUserNotificationList(request.start, request.range)


class userNotificationRepliedData(BaseModel):
    notification_id: int
    sender_id: int
    admin_id:int
    message:str

@general.post("/api/userNotificationReplied")
async def userNotificationReplied(request: userNotificationRepliedData):
    return await generalController.userNotificationReplied(request)

class sendUserNotificationByAdminData(BaseModel):
    title: str
    details: str
    admin_id:int
    receiver_type:int
    receiver_email: str
@general.post("/api/sendUserNotificationByAdmin",description="If you set specific user then you have to enter specific user email")
async def sendUserNotificationByAdmin(request: sendUserNotificationByAdminData):
     return await generalController.sendUserNotificationByAdmin(request)


class userActivityClass(BaseModel):
    from_date: date
    to_date: date
@general.post("/api/getClientActivity",description="Description:")
async def getClientActivity(request: userActivityClass):
      activity_data= await generalController.getClientActivity(request)
      return activity_data

@general.get("/api/getTotalAccountInfo")
async def getTotalAccountInfo():
    return await generalController.getTotalAccountInfo()

class userFeedbackAnalysis(BaseModel):
    from_date: date
    to_date: date
@general.post("/api/userFeedbackAnalysis",description="Description:")
async def getUserFeedbackAnalysis(request: userFeedbackAnalysis):
      activity_data= await generalController.getUserFeedbackAnalysis(request)
      return activity_data
