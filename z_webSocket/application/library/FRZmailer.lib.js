const mailer = require("nodemailer");
 const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

class FRZmailer {
   
    static getRegistraionEmailContent(data) {
         

        const emailTemplate = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Created Successfully</title>
            </head>
            <body>
                <div>
                    <h1>Welcome to ${data.appName}</h1>
                    <p>Thank you for creating an account with us.</p>
                    <p>You can now start using your new account to access ${data.appName} services.</p>
                    <p>Information</p>
                    <table>
                        <tr>
                            <th>Full name </th>
                            <td>${data.fullName}</td>
                        </tr>
                        <tr>
                            <th>Email </th>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <th>User Name </th>
                            <td>${data.username}</td>
                        </tr>
                        <tr>
                            <th>Password </th>
                            <td>${data.password}</td>
                        </tr>

                        <tr>
                            <th>Login link  </th>
                            <td> <a target="_blank" href="${data.loginLink}"> Go to the login panel </a></td>
                        </tr>
                        
                    </table>
                    <p>Note: you can use your email as user id</p>
                </div>
            </body>
            </html>`;
        
        return emailTemplate;

}

  static async sendMail(data) { 


        let  mailConfig= mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS:true,
            auth: {
                user: '********',
                pass: '**********'
            }
        });

        let mailOption = {
            from: '*******',
            to: data.to,
            subject: data.subject,
            html:data.html
        }

      
      
       return new Promise(resolve => {
          
          try {

               mailConfig.sendMail(mailOption, (error, info) => {
           
                if (error)
                {
                      resolve(error);
                }
                else {
                    resolve(info.response); 
                }
                
            });
              
              
          } catch (error) {
             resolve(error);
          }
          
          
          
          
      });
      
       
       

    }

    

}


module.exports = FRZmailer;