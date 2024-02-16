# library/validation_lib.py

from pydantic.v1 import EmailError
from fastapi import UploadFile, File

import os

import re

ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg"}
ALLOWED_FILES_EXTENSIONS = {"png", "jpg", "jpeg", "docx", "doc", "pdf"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def login_validation(user_name: str, password: str):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_name": "User name must be between 5 and 50 characters and can only contain letters and numbers.",
                  "password": "Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number"
              }}

    # Validate user name
    if not (5 <= len(user_name) <= 50 and user_name.isalnum()):
        errors["message"][
            "user_name"] = "User name must be between 5 and 50 characters and can only contain letters and numbers."

    # Validate password
    if not (5 <= len(password) <= 20):
        errors["message"]["password"] = "Password must be between 5 and 20 characters"
    elif not any(char.isupper() for char in password):
        errors["message"]["password"] = "Password must contain at least one capital letter"
    elif not any(char.isdigit() for char in password):
        errors["message"]["password"] = "Password must contain at least one number"

    if not errors["message"]:
        errors["status"] = "success"

    return errors


def userRegistrationRequestValidation(
        first_name: str,
        last_name: str,
        email: str,
        user_name: str,
        password: str,
        confirm_password: str,
        terms_condition: bool,
):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_name": "User name must be between 5 and 50 characters and can only contain letters and numbers.",
                  "password": "Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number",
                  "name": "name must be between 3 and 50 characters and can only contain letters, numbers, _, or .",
                  "email": "Email should be valid email such as frz@gmail.com"
              }
              }

    # Validate first name
    first_name = first_name.strip().replace(" ",
                                            "")  # Remove leading and trailing whitespaces, replace consecutive spaces
    if (
            3 <= len(first_name) <= 50
            and all(char.isalnum() or char in "_.-" for char in first_name)
    ):
        pass
    else:
        errors["message"][
            "first_name"] = "First name must be between 3 and 50 characters and can only contain letters, numbers, _, ."

    # Validate last name
    last_name = last_name.strip().replace(" ",
                                          "")  # Remove leading and trailing whitespaces, replace consecutive spaces
    if (
            3 <= len(last_name) <= 50
            and all(char.isalnum() or char in "_.-" for char in last_name)
    ):
        pass
    else:
        errors["message"][
            "last_name"] = "Last name must be between 3 and 50 characters and can only contain letters, numbers, _,."

    # Validate email
    try:
        if not (7 <= len(email) <= 50 and re.match(r"[a-zA-Z0-9_.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+", email)):
            raise EmailError()
    except EmailError:
        errors["message"]["email"] = "Invalid email address."

    # Validate user name
    if not (5 <= len(user_name) <= 50 and user_name.isalnum()):
        errors["message"][
            "user_name"] = "User name must be between 5 and 50 characters and can only contain letters and numbers."

    # Validate password
    if not (5 <= len(password) <= 50 and any(char.isupper() for char in password) and any(
            char.isdigit() for char in password)):
        errors["message"][
            "password"] = "Password must be between 5 and 50 characters, contain at least one uppercase letter, one number."

    # Validate confirm password
    if password != confirm_password:
        errors["message"]["confirm_password"] = "Confirm password does not match the password."

    # Validate terms_condition
    if not terms_condition:
        errors["message"]["terms_condition"] = "Terms and conditions must be accepted."

    if not errors["message"]:
        errors["status"] = "success"

    return errors



def validationProfileUpdateGPL(request):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "User ID must be an integer.",
                   "gender": "Gender must be an integer with value 1, 2, or 3.",
                   "profession": "Profession must be an integer between 1 and 99.",
                  "languages_list": "Languages list must be a list of strings representing integers between 1 and 99. example {1,2,3}",

              }}

    # Validate user_id
    if not isinstance(request.user_id, int) or request.user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."
    # Validate gender
    if not (request.gender in {1, 2, 3}):
        errors["message"]["gender"] = "Gender must be an integer with value 1, 2, or 3."

        # Validate profession
    if not (1 <= request.profession <= 99):
        errors["message"]["profession"] = "Profession must be an integer between 1 and 99."


    # Validate lists
    for list_name in ["languages_list"]:
        list_values = getattr(request, list_name, [])
        if not (isinstance(list_values, list) and len(list_values) <= 3):
            errors["message"][list_name] = f"{list_name} must be a list with a maximum of 3 values."

        if not all(isinstance(item, int) and 1 <= item <= 99 for item in list_values):
            errors["message"][
                list_name] = f"{list_name} must be a list of integers between 1 and 99."

    if not errors["message"]:
        errors["status"] = "success"

    return errors





def validationProfileUpdateInterestList(request):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "User ID must be an integer.",
                    "interest_list": "Interest list must be a list of strings representing integers between 1 and 99. example {1,2,3}",

              }}

    # Validate user_id
    if not isinstance(request.user_id, int) or request.user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."



    # Validate lists
    for list_name in ["interest_list"]:
        list_values = getattr(request, list_name, [])
        if not (isinstance(list_values, list) and len(list_values) <= 3):
            errors["message"][list_name] = f"{list_name} must be a list with a maximum of 3 values."

        if not all(isinstance(item, int) and 1 <= item <= 99 for item in list_values):
            errors["message"][
                list_name] = f"{list_name} must be a list of integers between 1 and 99."

    if not errors["message"]:
        errors["status"] = "success"

    return errors


def validationProfileUpdateSearchingList(request):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "User ID must be an integer.",
                  "account_mode": "Account 1 or 2",
                  "search gender": "Gender must be an integer with value 1, 2, or 3.",
                  "search profession": "Profession must be an integer between 1 and 99.",
                  "city_list": "City list must be a list of strings representing integers between 1 and 99. example {1,2,3}"

              }}

    # Validate user_id
    if not isinstance(request.user_id, int) or request.user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."
    # Validate gender
    if not (request.account_mode in {1, 2}):
        errors["message"]["account_mode"] = "Account mode must be an integer with value 1 or 2."


    # Validate lists
    for list_name in ["search_gender", "search_profession", "city_list"]:
        list_values = getattr(request, list_name, [])
        if not (isinstance(list_values, list) and len(list_values) <= 3):
            errors["message"][list_name] = f"{list_name} must be a list with a maximum of 3 values."

        if not all(isinstance(item, int) and 1 <= item <= 99 for item in list_values):
            errors["message"][
                list_name] = f"{list_name} must be a list of integers between 1 and 99."

    if not errors["message"]:
        errors["status"] = "success"

    return errors



def personal_information_validation(request):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "User ID must be an integer.",
                  "name": "name must be between 3 and 50 characters and can only contain letters, numbers, _, or .",
                  "gender": "Gender must be an integer with value 1, 2, or 3.",
                  "profession": "Profession must be an integer between 1 and 99.",
                  "search gender": "Gender must be an integer with value 1, 2, or 3.",
                  "search profession": "Profession must be an integer between 1 and 99.",
                  "languages_list": "Languages list must be a list of strings representing integers between 1 and 99. example {1,2,3}",
                  "interest_list": "Interest list must be a list of strings representing integers between 1 and 99. example {1,2,3}",
                  "city_list": "City list must be a list of strings representing integers between 1 and 99. example {1,2,3}"

              }}

    # Validate user_id
    if not isinstance(request.user_id, int) or request.user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."

        # Validate first name
    first_name = request.first_name.strip().replace(" ",
                                            "")  # Remove leading and trailing whitespaces, replace consecutive spaces
    if (
            3 <= len(first_name) <= 50
            and all(char.isalnum() or char in "_.-" for char in first_name)
    ):
        pass
    else:
        errors["message"][
            "first_name"] = "First name must be between 3 and 50 characters and can only contain letters, numbers, _, ."

    # Validate last name
    last_name = request.last_name.strip().replace(" ",
                                          "")  # Remove leading and trailing whitespaces, replace consecutive spaces
    if (
            3 <= len(last_name) <= 50
            and all(char.isalnum() or char in "_.-" for char in last_name)
    ):
        pass
    else:
        errors["message"][
            "last_name"] = "Last name must be between 3 and 50 characters and can only contain letters, numbers, _,."

        # Validate gender
    if not (request.gender in {1, 2, 3}):
        errors["message"]["gender"] = "Gender must be an integer with value 1, 2, or 3."

        # Validate profession
    if not (1 <= request.profession <= 99):
        errors["message"]["profession"] = "Profession must be an integer between 1 and 99."

        # Validate gender
    if not (request.search_gender in {1, 2, 3}):
        errors["message"]["search_gender"] = "Search Gender must be an integer with value 1, 2, or 3."

        # Validate profession
    if not (1 <= request.search_profession <= 99):
        errors["message"]["search_profession"] = "Search Profession must be an integer between 1 and 99."

        # Validate lists
    for list_name in ["languages_list", "interest_list", "city_list"]:
        list_values = getattr(request, list_name, [])
        if not (isinstance(list_values, list) and len(list_values) <= 3):
            errors["message"][list_name] = f"{list_name} must be a list with a maximum of 3 values."

        if not all(isinstance(item, int) and 1 <= item <= 99 for item in list_values):
            errors["message"][
                list_name] = f"{list_name} must be a list of integers between 1 and 99."


    if not errors["message"]:
        errors["status"] = "success"

    return errors



def setAccountModeValidation(user_id,account_mode):
    errors = {
        "status": "error",
        "message": {},
        "details": {
            "user_id": "User ID must be an integer.",
            "account_mode": "1: Inspiration mode (randomly match) <br>2: Focus mode (expertise or interest)<br>3: Invisible mode (Nobody found them)<br>4: Vacation mode (found but not allowed for a match)",
        },
    }

    # Validate user_id
    if not isinstance(user_id, int) or user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."

    # Validate account_mode
    if not (account_mode in {1, 2, 3, 4}):
        errors["message"]["account_mode"] = "Account mode must be an integer with value 1 to 4."

    if not errors["message"]:
        errors["status"] = "success"

    return errors



def LogoutLoginSession_validation(login_session_id: str):
    errors = {"status": "error", "message": {}}

    # Validate login_session_id
    if not (20 <= len(login_session_id) <= 250):
        errors["message"]["password"] = "Invalid session id"
    if not errors["message"]:
        errors["status"] = "success"

    return errors


def is_valid_files(file_extension: str) -> bool:
    """
    Check if the file extension corresponds to a valid image format.
    """
    return file_extension.lower() in ALLOWED_FILES_EXTENSIONS


def is_valid_image(file_extension: str) -> bool:
    """
    Check if the file extension corresponds to a valid image format.
    """
    return file_extension.lower() in ALLOWED_IMAGE_EXTENSIONS


def photo_validation(file_name: str, user_id: int):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "The logged user ID must be added.",
                  "file": "Only allow jpg,jpeg,png and maximum size 5mb"
              }
              }

    # Validate user_id
    if not int(user_id):
        errors["message"]["user_id"] = "User id must be an integer"

    # Get file extension
    file_extension = file_name.split(".")[-1]
    # Check if the file is a valid image
    if not is_valid_image(file_extension):
        errors["message"]["file"] = "Invalid file format. Only images (jpg,jpeg,png) are allowed."

    if not errors["message"]:
        errors["status"] = "success"

    return errors

def user_complain_validation(file: UploadFile, user_id: int, title: str, details: str):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "The logged user ID must be added.",
                  "title": "Required field.",
                  "details": "Required field.",
                  "file": "Only allow jpg, jpeg, png, pdf, doc, and maximum size 5mb"
              }
              }

    # Validate user_id
    if not isinstance(user_id, int):
        errors["message"]["user_id"] = "User id must be an integer."

    # Validate title
    if not (5 <= len(title) <= 200):
        errors["message"]["title"] = "Title is required and must be between 5 and 200 characters."

    # Validate details
    if not len(details) >= 5:
        errors["message"]["details"] = "Details are required and must have at least 5 characters."

    # Validate file
    if file:
        content_type = file.content_type.lower()
        if content_type not in ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/msword"]:
            errors["message"]["file"] = "Invalid file format. Only images (jpg, jpeg, png), PDF, and DOC are allowed."

    if not errors["message"]:
        errors["status"] = "success"

    return errors




def admin_login_validation(email: str, password: str):
    errors = {"status": "error", "message": {},
              "details": {
                  "email": "Email should be valid email",
                  "password": "Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number"
              }}

    # Validate email
    try:
        if not (7 <= len(email) <= 50 and re.match(r"[a-zA-Z0-9_.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+", email)):
            raise EmailError()
    except EmailError:
        errors["message"]["email"] = "Invalid email address."

    # Validate password
    if not (5 <= len(password) <= 20):
        errors["message"]["password"] = "Password must be between 5 and 20 characters"
    elif not any(char.isupper() for char in password):
        errors["message"]["password"] = "Password must contain at least one capital letter"
    elif not any(char.isdigit() for char in password):
        errors["message"]["password"] = "Password must contain at least one number"

    if not errors["message"]:
        errors["status"] = "success"

    return errors


def userPasswordChanged_validation(
        user_id: int,
        current_password: str,
        new_password: str,
        confirm_password: str
):
    errors = {"status": "error", "message": {},
              "details": {
                  "user_id": "User_id must be integer value",
                  "current_password": "Current Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number",
                  "new_password": "New Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number",
                  "confirm_password": "Confirm Password must be between 5 and 20 characters and must contain at least one capital letter and at least one number and it should be matched with new password",
              }}

    # Validate user_id
    if not isinstance(user_id, int) or user_id <= 0:
        errors["message"]["user_id"] = "User ID must be a positive integer greater than 0."

    # Validate password
    if not (5 <= len(current_password) <= 50 and any(char.isupper() for char in current_password) and any(
            char.isdigit() for char in current_password)):
        errors["message"][
            "current_password"] = "Current Password must be between 5 and 50 characters, contain at least one uppercase letter, one number."

    # Validate password
    if not (5 <= len(new_password) <= 50 and any(char.isupper() for char in new_password) and any(
            char.isdigit() for char in new_password)):
        errors["message"][
            "new_password"] = "New Password must be between 5 and 50 characters, contain at least one uppercase letter, one number."

    # Validate confirm password
    if new_password != confirm_password:
        errors["message"]["confirm_password"] = "Confirm password does not match the password."

    if not errors["message"]:
        errors["status"] = "success"

    return errors


def find_user_validation(search_data: str):
    errors = {"status": "error", "message": {},
              "details": {
                  "search_data": "it should be user name or email or name"
              }}

    # Validate email
    if '@' in search_data:
        try:
            if not (7 <= len(search_data) <= 50 and re.match(r"[a-zA-Z0-9_.\-']+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+",
                                                             search_data)):
                raise EmailError()
        except EmailError:
            errors["message"]["search_data"] = "Invalid email address."
    else:
        # Validate user name
        if not (3 <= len(search_data.strip()) <= 50 and re.match(r"^[a-zA-Z0-9_\-']+?$", search_data)):
            errors["message"][
                "search_data"] = "Search data must be between 3 and 50 characters, can only contain letters, numbers, '_', '-', and ''', and cannot start or end with a space."

    if not errors["message"]:
        errors["status"] = "success"

    return errors