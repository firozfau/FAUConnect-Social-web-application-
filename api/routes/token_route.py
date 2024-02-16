import os
from fastapi import APIRouter, Path
from fastapi.responses import HTMLResponse

from controllers.auth_controller import Authfrz

token = APIRouter()
autController = Authfrz()

html_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "html"))



@token.post("/api/userAccountVerification/{token_id}",description="This API will be used for user account verification.")
async def userAccountVerification(token_id: str = Path(..., title="Token ID")):
    data =await autController.userAccountVerification(token_id)
    return data


@token.get("/api/emailVerification/{token_id}", description="Don't use It is just for testing purpose", response_class=HTMLResponse)
async def email_verification(token_id: str = Path(..., title="Token ID")):


    data = await autController.emailVerification(token_id)



    message = data['message']
    go_login_page = ""
    status_text = '<h1 class="failed">Email Verification Failed</h1>'
    status_icon = '<div class="error-icon">&#10006;</div>'
    status="Failed"

    if data['status']=="success":
        go_login_page = f"<a class='loging_redirect_button login_success' href='{data['redirect']}' target='_blank'> Go to login page</a>"

        status_text = '<h1 class="success">Email Verification Successful</h1>'
        status_icon=' <div class="success-icon">&#10004;</div>'
        status = "Success"
    elif data['status']=="exist":
        go_login_page = f"<a class='loging_redirect_button login_failed' href='{data['redirect']}' target='_blank'> Go to login page</a>"
        status_text = '<h1 class="exist">Email Already Verified</h1>'
        status_icon = ' <div class="info-icon">&#8505;</div>'
        status = "Verified"



    file_path = os.path.join(os.getcwd(), "html", "email_verification.html")

    with open(file_path, "r") as file:
        html_content = file.read()

    # Replace placeholders with data
    html_content = html_content.replace("{{status}}", status)
    html_content = html_content.replace("{{status_text}}", status_text)
    html_content = html_content.replace("{{go_login_page}}", go_login_page)
    html_content = html_content.replace("{{message}}", message)
    html_content = html_content.replace("{{status_icon}}", status_icon)

    # Return HTML response
    return HTMLResponse(content=html_content, status_code=200)
