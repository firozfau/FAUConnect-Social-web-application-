import React, { useState,useEffect } from 'react';
import './index.css'; // Ensure you import your Tailwind CSS file
import { useNavigate,useParams } from 'react-router-dom';
import config from './config';
import LoadingModal from './modal';


const EmailVerification = () => {
    const navigate = useNavigate(); 
    const { token } = useParams();
    const [emailVerificationStatusClass, setEmailVerificationStatusClass] = useState(null);
    const [emailVerificationMessage, setEmailVerificationMessage] = useState("Please wait a few seconds while the email verification process continues....");
    const [isLoading, setLoading] = useState(false);

    
    const backToLoginPage = () => {
        navigate('/login'); 
    };
    


    useEffect(() => {
        const verifyToken = () => {
          const verificationApiUrl = `${config.emailVerificationAPI}/${token}`;
          setLoading(true);
          fetch(verificationApiUrl, {
            method: 'POST',
            headers: {
              'Authorization': config.apiAccessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token_id: token,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);

 

             let message_data = data.message.replace(/<br>/g, '\n'); 



            /*const inputString = data.message;
            let resultArray = inputString.split('.'); 
            resultArray.forEach((element, index) => {
                // Check if it's the last element
                const isLastElement = index === resultArray.length - 1;
            
                // Add the element to error_html
                message_data += `<p>${element}${isLastElement ? '' : '.'}</p>`;
            });
            */


    
              if (data.status == "success") { 
                setEmailVerificationStatusClass("verificationBoxGreenColor");

              } 
              else if (data.status == "exist") 
              { 
                
                setEmailVerificationStatusClass("verificationBoxBlueColor"); 
              } 
              else { 
                setEmailVerificationStatusClass("verificationBoxRedColor");
              } 


              

              setEmailVerificationMessage(message_data);

            })
            .catch(error => {
              // Handle errors from the API call
              console.error('Error:', error);
              setEmailVerificationStatusClass("verificationBoxRedColor");
              setEmailVerificationMessage("Email verification failed! Please try again.");
            });
        };
    
        verifyToken();
      }, [token]);



    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">

            {/* Background image */}
            <img
                src="/images/registration_page_bg.png"
                alt="FAU Campus"
                className="absolute inset-0 object-cover w-full h-full"
            />

           

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50">  </div>

            <div className="flex items-center justify-center w-full opacity-80">

                   <div className='verificationBox'> 

                   <div className={`verificationBoxMessage ${emailVerificationStatusClass}`} >{emailVerificationMessage}</div>




                    <button className=" verificationBoxButton bg-custom-green text-white px-4 py-3  focus:outline-none  hover:bg-custom-darkgreen hover:text-white" 
                    onClick={backToLoginPage}>Back to login page</button>
                   </div>
                
            </div>

        </div>
    );
};

export default EmailVerification;