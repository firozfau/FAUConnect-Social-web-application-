# matching_route.py
from fastapi import APIRouter, Path, Depends
from pydantic import BaseModel
from library.validation_lib import *
from controllers.matching_controller import Matching

from library.security_lib import verify_token
from typing import List


matching = APIRouter(dependencies=[Depends(verify_token)])
matchController = Matching()

@matching.get("/api/accountModeList")
async def getAccountModeList():
    data = await matchController.getAccountModeList()
    return data

@matching.get("/api/departmentList")
async def getDepartmentList():
    data = await matchController.getDepartmentList()
    return data

@matching.get("/api/professionList")
async def getProfessionList():
    data = await matchController.getProfessionList()
    return data

@matching.get("/api/feedbackContentList")
async def getfeedbackContentList():
    data = await matchController.getfeedbackContentList()
    return data

@matching.get("/api/archivedFriendList")
async def getArchivedFriendList(user_id:int):
    data = await matchController.getArchivedFriendList(user_id)
    return data
@matching.get("/api/matchingStatus")
async def getMatchingStatus(user_id:int):
    data = await matchController.getMatchingStatus(user_id)
    return data



@matching.get("/api/matchingPartner")
async def getmatchingPartner(user_id:int):
    data = await matchController.matchingPartner(user_id)
    return data

class FeedbackItem(BaseModel):
    id:int
    status: int
    comments: str

class FeedbackList(BaseModel):
    user_id: int
    friend_id: int
    feedbackList: List[FeedbackItem]

description_example="Instruction: <br> id: 1 [id of feedback item]=>Was the assistance you provided in our last conversation helpful], <br> status: 1 [YES=1 and NO=2], <br> comments:'' Not required but when the client chose [Would you recommend the FAUConnect app? == YES]=> must be required <br> note: comments text length max 150 characters."
@matching.post("/api/sendFeedback",description=description_example)
async def sendFeedback(feedback_list: FeedbackList):
    data = await matchController.sendFeedback(feedback_list)
    return data


class sendMessageFRZ(BaseModel):
    sender_id: int
    receiver_id: int
    message: str
    message_type: int

send_message_instruction_details="Instruction: <br> message_type: 1 or 2 or 3 [1=> Text, 2=> Symbol, 3=>Files] <br> {message_type: 1 should be default value }"
@matching.post("/api/sendMessage",description=send_message_instruction_details)
async def sendMessage(messageData:sendMessageFRZ):
    data = await matchController.sendMessage(messageData)
    return data



class getArchiveConversation(BaseModel):
    user_id: int
    friend_id: int
    start: int
    range: int

getArchiveConversation_details="Example:<br> start: 0 <br> range: 10 [start from 0 to max 10 conversation]"
@matching.post("/api/getArchiveMessage",description=getArchiveConversation_details)
async def getArchiveMessage(data:getArchiveConversation):
    data = await matchController.getArchiveMessage(data)
    return data


@matching.get("/api/userAdvanceInformation/{user_id}")
async def userAdvanceInformation(user_id: int = Path(..., title="User id")):
    data = await matchController.getUserAdvanceInformation(user_id)
    return data

@matching.get("/api/getActiveFriendList/{user_id}")
async def getActiveFriendList(user_id: int = Path(..., title="User id")):
    data = await matchController.getActiveFriendList(user_id)
    return data
