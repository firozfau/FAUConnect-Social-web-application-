import React, { useState,useEffect } from 'react';
import './App.css'; // Make sure to import your CSS styles
import Footer from './footer.js';
import Header from './header.js';
import { GiWorld } from "react-icons/gi";
import { useNavigate,useLocation} from 'react-router-dom';
import { FaUser, FaLock} from 'react-icons/fa';
import config from './config';
import LoadingModal from './modal';
import MessageModal from './message';


const LandingPage = () => {
    const navigate = useNavigate(); 
    const  actionPage  = useLocation().pathname;
     
 
    const [register_user_name, set_register_user_name] = useState('');
    const [error_show_register_user_name, set_error_show_register_user_name] = useState('');

    const [register_password, set_register_password] = useState('');
    const [error_show_register_password, set_error_show_register_password] = useState('');
    
    const [register_retype_password, set_register_retype_password] = useState('');
    const [error_show_register_retype_password, set_error_show_register_retype_password] = useState('');
    

    const [register_first_name, set_register_first_name] = useState('');
    const [error_show_register_first_name, set_error_show_register_first_name] = useState('');
    

    const [register_last_name, set_register_last_name] = useState('');
    const [error_show_register_last_name, set_error_show_register_last_name] = useState('');
    
    const [register_email, set_register_email] = useState('');
    const [error_show_register_email, set_error_show_register_email] = useState('');
    



    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isMessageOpen, setMessageOpen] = useState(false);

        
    

    
    
    


    const [login_user_name, set_login_user_name] = useState('');
    const [error_show_login_user_name, set_error_show_login_user_name] = useState('');

    const [login_password, set_login_password] = useState('');
    const [error_show_login_password, set_error_show_login_password] = useState('');
    

    const [showWelcomeCard, setShowWelcomeCard] = useState(true); // State for welcome card
    const [showLoginForm, setShowLoginForm] = useState(false); // for both login and register.
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const [isLanguage, setislanguage] = useState(false);
    const [language, setLanguage] = useState('English');
    const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
    const [showOnlyEmail, setShowOnlyEmail] = useState(false); // for both login and register.

    const handleLanguage = () => {
        setislanguage(!isLanguage)
    }

    const handleCreateAccountClick = () => {
        setShowWelcomeCard(false);
        setShowLoginForm(false);
        setShowRegisterForm(true);
        setShowEmailConfirmation(false);
        setShowOnlyEmail(false);
    };


    const navigateToRegister = () => {
        navigate('/register'); 
    };



    const handleBackToMainPageClick = () => {
        setShowOnlyEmail(false);
        setShowEmailConfirmation(false);
        setShowWelcomeCard(false);
        setShowLoginForm(true);
        setShowRegisterForm(false);
 
    };
    

    useEffect(() => {
       
        const userData = getLoginSession("login_data");
        if(userData)
        {
            if(userData.first_login=="done")
            {
                navigate('/main'); 
            }
            else{
 
                navigate('/incomplete'); 
            }

        }else{
            actionPageActive(actionPage);

        }

    }, []); 



    const actionPageActive = (key_actionPage)=>{
        
        if(key_actionPage=="/login" || key_actionPage=="login")
            {

                setShowOnlyEmail(false);
                setShowEmailConfirmation(false);
                setShowWelcomeCard(false);
                setShowRegisterForm(false);
                
                setShowLoginForm(true);

            }
            else if(key_actionPage=="/register" || key_actionPage=="register")
            {
                setShowOnlyEmail(false);
                setShowEmailConfirmation(false);
                setShowWelcomeCard(false);
                setShowLoginForm(false);
                setShowRegisterForm(true);
            }

    }


       
    const registerUerNameChange = (e)=>{
        
        set_error_show_register_user_name('')
        set_register_user_name(e.target.value); 

    }

    const registerPasswordChange = (e)=>{
        
        set_error_show_register_password('')
        set_register_password(e.target.value); 

    }

    
    const registerRetypePasswordChange = (e)=>{
        
        set_error_show_register_retype_password('')
        set_register_retype_password(e.target.value); 

    }

    const registerFirstNameChange = (e)=>{
        
        set_error_show_register_first_name('')
        set_register_first_name(e.target.value); 

    }

    const registerLastNameChange = (e)=>{
        
        set_error_show_register_last_name('')
        set_register_last_name(e.target.value); 

    }

    const registerEmailChange = (e)=>{
        
        set_error_show_register_email('')
        set_register_email(e.target.value); 

    }



const registrationValidation = () => {


    let e_register_first_name=register_first_name.replace(/\s/g, '');
    let e_register_last_name=register_last_name.replace(/\s/g, '');

    let e_register_email=register_email.replace(/\s/g, '');


    let userName=register_user_name.replace(/\s/g, '');
    let reUserPassword=register_retype_password.replace(/\s/g, '');

    let userPassword=register_password.replace(/\s/g, '');
    const hasUppercasePassword = /[A-Z]/.test(userPassword);
    const hasNumberPassword = /\d/.test(userPassword);

    

    if(e_register_first_name==""){
        set_error_show_register_first_name('Enter your first name') ;
       
        return false;
    }
    else if(e_register_first_name.length<5){
        set_error_show_register_first_name('First name must be at least 5 characters long') ;
       
        return false;
    }
    else if(e_register_last_name==""){
        set_error_show_register_last_name('Enter your last name') ;
       
        return false;
    } 
    else if(e_register_email==""){
        set_error_show_register_email('Enter your valid email') ;
      
        return false;
    } 
    else if(userName==""){
        set_error_show_register_user_name('Enter your username') ;
      
        return false;
    }
    else if(userName.length<5){
        set_error_show_register_user_name('Username must be at least 5 characters long') ;
    
        return false;
    }
    else if(userPassword==""){
        set_error_show_register_password('Enter your password') ;
        return false;
    }
    else if(userPassword.length<5  || !hasUppercasePassword || !hasNumberPassword){
        set_error_show_register_password('Password must be at least 5 characters with capital letter and number') ;
        return false;
    }
    else if(userPassword!=reUserPassword){
        set_error_show_register_retype_password('Retype password does not match') ;
        return false;
    }

    return true;


};

    
 


const handleClickOnAccountCreated = () => {

    
        if(registrationValidation())
        {
            
            setLoading(true);

            let data={
                "first_name": register_first_name,
                "last_name": register_last_name,
                "email": register_email,
                "user_name": register_user_name,
                "password": register_password,
                "confirm_password": register_retype_password,
                "terms_condition": true,
                "email_verification_link": config.domain_name+"/emailVerification"
              };

              fetch(config.userRegistrationUrl, {
                method: 'POST',
                headers: {
                    'Authorization': config.apiAccessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {

                    setLoading(false);

                    if(data.status=="success"){
     
                        setShowOnlyEmail(true);
                        setShowEmailConfirmation(true);
    
                    }else{

                        showErrorMessage(data.message);
                          
                    }
                })
                .catch(error => {
                    // Handle errors from the API call
                    console.error('Error:', error);
                    setLoading(false);
                    showErrorMessage('Something is wrong! Please try again.');
                });
                  


           

        } 
        

    };




    
    
    




    
    const LoginUerNameChange = (e)=>{
        
        set_error_show_login_user_name('')
        set_login_user_name(e.target.value);


    }

    const LoginPasswordChange = (e)=>{
        set_error_show_login_password('')
        set_login_password(e.target.value);
    }
  
     const validateUserLoginData=(e)=>{ 

        let userName=login_user_name.replace(/\s/g, '');
        let userPassword=login_password.replace(/\s/g, '');

        const hasUppercasePassword = /[A-Z]/.test(userPassword);
        const hasNumberPassword = /\d/.test(userPassword);

         
        if(userName==""){
            set_error_show_login_user_name('Enter your username') 
            return false
        }
        else if(userName.length<5){
            set_error_show_login_user_name('Username must be at least 5 characters long') 
            return false
        }
        else if(userPassword==""){
            set_error_show_login_password('Enter your password') 
            return false
        }
        else if(userPassword.length<5  || !hasUppercasePassword || !hasNumberPassword){
            set_error_show_login_password('Password must be at least 5 characters with capital letter and number') 
            return false
        }

        return true
     }


      const userLoginAction = () => {

     


        if(validateUserLoginData())
        {
            setLoading(true);
       
            fetch(config.userLoginUrl, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: login_user_name,
                password: login_password,
            }),
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
               // console.log(data);

                if(data.status=="success"){

                    let view=data.data;
                    let user_id=view.user_id;
                    let login_session_id= view.login_session_id;
                    let login_data=view.login_data;


                    

                    const session_data = {
                        user_id: login_data.id,
                        account_status: login_data.account_status,
                        account_mode: login_data.account_mode,
                        first_name: login_data.first_name,
                        last_name: login_data.last_name,
                        email: login_data.email ,
                        first_login:data.first_login
                      };

                    setLoginSession(session_data);

                    if(data.first_login=="done")
                    { 
 
                         
                          navigate('/main'); 

                    }else{
                        navigate('/incomplete'); 
                    }
                    
                    

                }else{
                    
                    showErrorMessage(data.message); 
                }
            })
            .catch(error => {
                // Handle errors from the API call
                console.error('Error:', error);
                setLoading(false); 
                showErrorMessage('Something is wrong! Please try again.');

            });
        }
      }  
      
      const setLoginSession = (data) => {

        const userDataString = JSON.stringify(data);
        sessionStorage.setItem('login_data', userDataString);
    
    }
    
    const getLoginSession = (session_key) => {
        // login_data
        const storedUserDataString = sessionStorage.getItem(session_key);
        if (storedUserDataString === null) 
        {
            return false;
        } 
        else{
            return JSON.parse(storedUserDataString);
        } 
    
    }




const showErrorMessage = (data) => {

 let error_html = "";

if (typeof data === 'object') 
{
    
    
  
    for (let [key, value] of Object.entries(data)) 
    {
        const words = key.split('_');
        const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        const formated_keyWord = [firstWord, ...words.slice(1)].join(' ');
        const formated_keyWord_html="<button style='padding: 5px; margin: 5px;' class='bg-gray-500 text-white '>"+formated_keyWord+"</button>";

        error_html += `<p>${formated_keyWord_html}  ${value}</p>`;
    }
 
} 
else 
{

    const inputString = data;
    let resultArray = inputString.split('.'); 
    resultArray.forEach((element, index) => {
        // Check if it's the last element
        const isLastElement = index === resultArray.length - 1;
    
        // Add the element to error_html
        error_html += `<p>${element}${isLastElement ? '' : '.'}</p>`;
    });
     
}

setLoading(false);
setMessage(error_html);
setMessageOpen(true);

}


const closeMessageModal = () => {
    setMessageOpen(false);
    setMessage('');
    };





    return (
        
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
            {/* Background image */}
            <img
                src="/images/fau_background.png"
                alt="FAU Building"
                className="absolute inset-0 object-cover w-full h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Header: Logo and Language/Login buttons */}
            <div className='flex justify-between'>
            <Header/>
            <div className="absolute top-0 right-0 p-4 flex justify-between items-center z-30">
                {/* Language and Login buttons */}
                <div className="flex space-x-6 mr-8 relative ">

                        <button className="flex relative items-center text-white px-4 py-2 hover:bg-custom-darkgreen hover:text-white rounded-full w-full focus:outline-none" onClick={handleLanguage}><GiWorld className='mr-2' />Language</button>
                        {isLanguage &&
                            (
                                <div className=" absolute right-30 mt-9 py-2 w-24 bg-white rounded-md shadow-xl z-20 pt-2">
                                    <button
                                        className="flex px-4 py-2 text-sm capitalize w-full text-gray-700 hover:bg-blue-500 hover:text-white"
                                        onClick={() => {setLanguage('English'); handleLanguage()}}
                                    >
                                        English
                                    </button>
                                    <button
                                        className="flex px-4 py-2 text-sm capitalize w-full text-gray-700 hover:bg-blue-500 hover:text-white"
                                        onClick={() => {setLanguage('German'); handleLanguage()}}
                                    >
                                        German
                                    </button>
                                </div>)}

                    <button
                        className="bg-custom-green text-white px-8 py-2 rounded-full w-full focus:outline-none shadow-lg hover:bg-custom-darkgreen hover:text-white"
                        onClick={() => {

                            setShowWelcomeCard(false);
                            // setShowLoginForm(!showLoginForm);
                            setShowEmailConfirmation(false);
                            setShowOnlyEmail(false);

                            if(showLoginForm==true){
                                //login to sign up
                                setShowLoginForm(false)
                                setShowRegisterForm(true);

                            }else{
                                 //sign up to login
                                 setShowLoginForm(true)
                                 setShowRegisterForm(false);
                            }

                        }}>
                        {showLoginForm ? ' Sign Up  ' : ' Log In '}
                    </button>
                </div>
            </div>
            <div/>

            {/* Cards Container */}
            <div className="flex items-center justify-center w-full opacity-80">
                {showWelcomeCard && !showRegisterForm && !showLoginForm &&(
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
                        <h1 className="text-2xl font-bold text-center mb-4">Welcome to FAUConnect!</h1>
                        <p className="text-sm text-gray-600 text-center mb-8">We bring together people from all of FAU. Maybe you will find a nice chat, maybe you will find new input for your current work, maybe you get an excellent recommendation for a nice hidden restaurant in Erlangen. Don’t miss out!</p>
                        <button
                            className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full hover:bg-custom-darkgreen hover:text-white"
                            onClick={handleCreateAccountClick}  >
                            Create your account now
                        </button>
                    </div>
                )}

                {!showWelcomeCard && !showRegisterForm && showLoginForm && !showOnlyEmail &&(
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4 z-10" style={{ height: '350px' }}>
                    <h1 className="text-2xl font-bold text-center mb-4">Log in to your account</h1>
                    <p className="text-sm text-gray-600 text-center mb-8">Meet new people from FAU!</p>
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="text" id="login_user_name"
                            placeholder="Enter your username"
                            value={login_user_name}
                            onChange={LoginUerNameChange}
                        />
                        <i className='error_show error_show_login_user_name'>{error_show_login_user_name}</i>
                    </div>

                    {/* IdM-Password */}
                    <div className="mb-4 relative">
                        <FaLock className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="password" 
                            id="login_password"
                            placeholder="Enter your Password"
                            value={login_password}
                            onChange={LoginPasswordChange}
                        />
                        <i className='error_show error_show_login_password'>{error_show_login_password}</i>
                    </div>
                    <button className="w-full bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none mt-4 hover:bg-custom-darkgreen hover:text-white"
                    onClick={userLoginAction}>Log in</button>
                </div>
                )}

                {showRegisterForm && !showLoginForm && !showOnlyEmail && !showWelcomeCard &&(
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 z-10 relative" style={{ height: 'auto' }}>
                    <h1 className="text-2xl font-bold text-center mb-4">Create your account</h1>
                    <p className="text-sm text-gray-600 text-center mb-8">Meet new people from FAU!</p>

                  

                    {/* First and Last Name */}
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2 relative">
                            <input
                                className="pl-3 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                                type="text"
                                placeholder="Enter your first name"
                                value={register_first_name}
                                onChange={registerFirstNameChange}
                            />
                             <i className='error_show error_show_register_first_name'>{error_show_register_first_name}</i>
                        </div>
                        <div className="w-1/2 relative">
                            <input
                                className="pl-3 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                                type="text"
                                placeholder="Enter your last name"
                                value={register_last_name}
                                onChange={registerLastNameChange}
                            />
                            <i className='error_show error_show_register_last_name'>{error_show_register_last_name}</i>
                        </div>
                    </div>
 
                    {/* e mail */}
                    <div className="mb-4 relative">

                    <input
                        className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                        type="email"
                           id="register_email"
                            placeholder="Enter your email"
                            value={register_email}
                            onChange={registerEmailChange}
                    />
                    <i className='error_show error_show_register_email'>{error_show_register_email}</i>
                    </div>
                    
                    {/* IdM-ID */}
                    <div className="mb-4 relative">

                    <input
                        className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                        type="text"
                        id="register_user_name"
                            placeholder="Enter your username"
                            value={register_user_name}
                            onChange={registerUerNameChange}
                    />
                    <i className='error_show error_show_register_user_name'>{error_show_register_user_name}</i>
                    </div>

                    {/* IdM-Password */}
                    <div className="mb-4 relative">
                    <FaLock className="absolute left-3 top-3" />
                    <input
                        className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                        type="password"
                        id="register_password"
                            placeholder="Enter your Password"
                            value={register_password}
                            onChange={registerPasswordChange}
                    />
                         <i className='error_show error_show_register_password'>{error_show_register_password}</i>
                    </div>
                    {/* IdM-Password again */}
                    <div className="mb-4 relative">
                    <FaLock className="absolute left-3 top-3" />
                    <input
                        className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                        type="password"
                        placeholder="Enter Confirm Password"
                        id="register_retype_password"
                        value={register_retype_password}
                        onChange={registerRetypePasswordChange}
                    />
                 <i className='error_show error_show_register_retype_password'>{error_show_register_retype_password}</i>
                    </div>
                   

                    <button className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full hover:bg-custom-darkgreen hover:text-white" 
                    onClick={handleClickOnAccountCreated}>Accept terms and conditions and create account</button>
                </div>
                )}

                {/* Conditionally render the email confirmation form */}
                {!showWelcomeCard && showOnlyEmail && showEmailConfirmation && (
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 z-10 relative" style={{ height: 'auto' }}>
                    <div className="email-confirmation-form">
                        {/* Content of your email confirmation form goes here */}
                        <h1 className="text-2xl font-bold text-center mb-4">Please confirm your Email address</h1>
                        <p className="text-sm text-gray-600 text-center mb-8">After confirmation you can log into your new account and start your profile creation.</p>
                        <button className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full hover:bg-custom-darkgreen hover:text-white"
                        onClick={handleBackToMainPageClick}>Back to login page</button>
                    </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer/>

            <LoadingModal isOpen={isLoading} />
            <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />
        </div></div>
    );
};


export default LandingPage;


