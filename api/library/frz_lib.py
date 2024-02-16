import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer
import requests
import ipaddress
from datetime import datetime, date

import time
import re


regTokenKey = URLSafeTimedSerializer("BOKA-CHODA")


class FRZ:
    def __init__(self):
        pass

    async def getUserModeList(self):
        return {
            "1": "Inspiration mode (randomly match)",
            "2": "Focus mode (expertise or interest)",
            "3": "Invisible mode (Nobody found them)",
            "4": "Vacation mode (found but not allowed for a match)"
        }

    async def getUserDepartmentList(self):
        return {
            "1": "Scientific",
            "2": "Non-scientific",
        }

    async def getProfessionList(self):
        return {
            "1": "Professor",
            "2": "Lecturer",
            "3": "PhD Student",
            "4": "Master's Student",
            "5": "Lab Assistant",
        }
    async def getCurrentDateTime(self):
        current_datetime = datetime.now()
        formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
        return formatted_datetime

    async def getCurrentTimestamp(self):
        timestamp = time.time()
        return timestamp

    async def is_valid_date(self, date_data, date_format="%Y-%m-%d"):
        try:
            if isinstance(date_data, str):
                # If date_data is a string, try to parse it
                datetime.strptime(date_data, date_format)
            elif isinstance(date_data, date):
                # If date_data is a datetime.date object, it's already valid
                pass
            else:
                # If it's neither a string nor a datetime.date object, raise an exception
                raise ValueError("Invalid date data type")

            return True
        except ValueError:
            return False

    async def isAvailableId(self,client_id):
       if client_id =="":
           return False
       elif client_id <=0:
           return False
       else:
            return True

    async def getIpAddress(self):
        try:
            # Use an external service to get the public IP address
            response = requests.get("https://api64.ipify.org?format=json")
            public_ip = response.json()["ip"]
            ipv6_address = ipaddress.IPv6Address(public_ip)
            return ipv6_address
        except requests.RequestException as e:
            # print(f"Error: {e}")
            return None

    async def generateUserRegistraionToken(self, email):
        return regTokenKey.dumps(email, salt='email-confirm')

    async def verifyUserRegistraionToken(self, token):
        try:
            # Verify the token and get the original email
            email = regTokenKey.loads(token, salt='email-confirm')
            #print("hello kutta -----------",email)
            return email
        except Exception as e:
            # Token verification failed
            #print(f"Error: {e}")
            #print(f"Exception Type: {type(e).__name__}")
            return None


    async def sanitize_input(self,user_input):
        # Detect potential SQL injection patterns
        sql_injection_patterns = [
            r'\b(?:SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b',
            r'\b(?:FROM|INTO|VALUES|TABLE|DATABASE|WHERE)\b',
            r'\b(?:OR|AND|NOT|EXEC|DECLARE|CREATE)\b'
        ]

        for pattern in sql_injection_patterns:
            if re.search(pattern, user_input, re.IGNORECASE):
                # Remove potential SQL injection strings
                user_input = re.sub(pattern, '', user_input, flags=re.IGNORECASE)

        cleaned_str = ' '.join(user_input.split())
        return cleaned_str

    async def mail_configuration(self):
        return {
            'host': 'smtp.gmail.com',
            'port': 587,
            'secure': False,
            'requireTLS': True,
            'auth': {
                'user': '*********',
                'pass': '**************'
            }
        }

    async def send_registration_success_mail(self, email_data):
        data = email_data['data']
        to = email_data['to_email']
        subject = email_data['subject']
        activation_link = email_data['activation_link']

        message = await self.get_registration_message_html(data, activation_link)

        mail_config = await self.mail_configuration()
        try:
            with smtplib.SMTP(mail_config['host'], mail_config['port']) as server:
                server.starttls()
                server.login(mail_config['auth']['user'], mail_config['auth']['pass'])

                msg = MIMEMultipart()
                msg['From'] = mail_config['auth']['user']
                msg['To'] = to
                msg['Subject'] = subject
                msg.attach(MIMEText(message, 'html'))

                server.sendmail(mail_config['auth']['user'], to, msg.as_string())
                return True

        except Exception as e:
            return False

    async def get_registration_message_html(self, data, activation_link):
        # Create account registration success HTML content
        html_template = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FAUConnect APP</title>
        </head>
        <body>
            <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Welcome to FAUConnect - Your Registration is Complete!</h2>
                <p style="color: #555;">Hello {first_name} {last_name},</p>
                <p style="color: #555;"> <b style="color:green;">Congratulations! </b>Your registration on FAUConnect has been successfully completed, and we are thrilled to welcome you to our community.</p>
                <p style="color: #555;">Here are some key details about your account.</p>
                <p style="color: #555;">Email: {email}</p>
                <p style="color: #555;"><b>User Name:</b> {user_name}</p>
                <p style="color: #555;"><b>Password:</b> {password}</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a target="_blank" href="{verification_link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #4CAF50; color: #fff; border-radius: 5px;">Verify Email</a>
                <p style="color: #555;">You must verify your email to gain access to the application</p>
                
                <p  style="color: #555; margin-top:20px">To make the most of your FAUConnect experience, please log in using the credentials above. Explore our platform, connect with fellow members, and stay updated on the latest happenings within our community.</p>
                <p  style="color: #555;">Thank you for choosing FAUConnect. We look forward to seeing you actively engage and connect with others in our community.</p>
                <p style="color: #555;">Best regards,<br>The FAUConnect Team </p>
            </div>
        </body>
        </html>
        """
        formatted_html = html_template.format(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            user_name=data['user_name'],
            password=data['password'],
            verification_link=activation_link
        )
        return formatted_html


    async def send_password_change_success_mail(self, email_data):

        data = email_data['data']
        to = email_data['to_email']
        subject = email_data['subject']

        message = await self.get_password_changed_message_html(data,email_data['password'])

        mail_config = await self.mail_configuration()
        try:
            with smtplib.SMTP(mail_config['host'], mail_config['port']) as server:
                server.starttls()
                server.login(mail_config['auth']['user'], mail_config['auth']['pass'])

                msg = MIMEMultipart()
                msg['From'] = mail_config['auth']['user']
                msg['To'] = to
                msg['Subject'] = subject
                msg.attach(MIMEText(message, 'html'))

                server.sendmail(mail_config['auth']['user'], to, msg.as_string())
                return True

        except Exception as e:
            return False



    async def get_password_changed_message_html(self, data,new_password):
        # Create account registration success HTML content
        html_template = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to FAUConnect</title>
        </head>
        <body>
            <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Update password information</h2>
                <p style="color: #555;">Hello {first_name} {last_name},</p>
                <p style="color: #555;">You password information successfully changed, Please check below:</p>
                <p style="color: #555;">Email: {email}</p>
                <p style="color: #555;">User Name: {user_name}</p>
                <p style="color: #555;">New Password: {password}</p>
                <p style="color: #555;">Best regards,<br>FauConnect</p>
            </div>
        </body>
        </html>
        """
        formatted_html = html_template.format(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            user_name=data['user_name'],
            password=new_password
        )
        return formatted_html
