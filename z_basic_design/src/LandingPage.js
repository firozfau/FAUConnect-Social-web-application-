import React, { useState } from 'react';
import './index.css'; // Make sure to import your CSS styles
import { GiWorld } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaCalendarAlt } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();

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

    const handleClickOnAccountCreated = () => {
        setShowOnlyEmail(true);
        setShowEmailConfirmation(true);
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    const handleBackToMainPageClick = () => {
        //navigate('/');
        setShowOnlyEmail(false);
        setShowEmailConfirmation(false);
        setShowWelcomeCard(false);
        setShowLoginForm(true);
        setShowRegisterForm(false);
 
    };

    return (
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
            {/* Background image */}
            <img
                src="/images/fau_backgroud.png"
                alt="FAU Building"
                className="absolute inset-0 object-cover w-full h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Header: Logo and Language/Login buttons */}
            <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center w-full z-30">
                {/* Logo */}
                <img
                    src="/images/logo.svg"
                    alt="FAU Logo"
                    className="h-16"
                />

                {/* Language and Login buttons */}
                <div className="flex space-x-6 mr-8 relative ">
                        <button className="flex relative items-center text-white px-4 py-2 rounded-full w-full focus:outline-none" onClick={handleLanguage}><GiWorld className='mr-2' />Language</button>
                        {isLanguage &&
                            (
                                <div className=" absolute right-28 mt-9 py-2 w-40 bg-white rounded-md shadow-xl z-20">
                                    <button
                                        className="flex px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                                        onClick={() => setLanguage('English')}
                                    >
                                        English
                                    </button>
                                    <button
                                        className="flex px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                                        onClick={() => setLanguage('German')}
                                    >
                                        Deutsch
                                    </button>
                                </div>)}
                    <button
                        className="bg-custom-green text-white px-8 py-2 rounded-full w-full focus:outline-none shadow-lg"
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
            </header>

            {/* Cards Container */}
            <div className="flex items-center justify-center w-full opacity-80">
                {showWelcomeCard && !showRegisterForm && !showLoginForm &&(
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
                        <h1 className="text-2xl font-bold text-center mb-4">Welcome to FAUConnect!</h1>
                        <p className="text-sm text-gray-600 text-center mb-8">We bring together people from all of FAU. Maybe you will find a nice chat, maybe you will find new input for your current work, maybe you get an excellent recommendation for a nice hidden restaurant in Erlangen. Don’t miss out!</p>
                        <button
                            className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full"
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
                            type="text"
                            placeholder="Enter your IdM-ID"
                        />
                    </div>

                    {/* IdM-Password */}
                    <div className="mb-4 relative">
                        <FaLock className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="password"
                            placeholder="Enter your IdM-Password"
                        />
                    </div>
                    <button className="w-full bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none mt-4"
                    onClick={navigateToRegister}>Log in</button>
                </div>
                )}

                {showRegisterForm && !showLoginForm && !showOnlyEmail && !showWelcomeCard &&(
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 z-10 relative" style={{ height: 'auto' }}>
                    <h1 className="text-2xl font-bold text-center mb-4">Create your account</h1>
                    <p className="text-sm text-gray-600 text-center mb-8">Meet new people from FAU!</p>

                    {/* IdM-ID */}
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="text"
                            placeholder="Enter your IdM-ID"
                        />
                    </div>

                    {/* IdM-Password */}
                    <div className="mb-4 relative">
                        <FaLock className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="password"
                            placeholder="Enter your IdM-Password"
                        />
                    </div>

                    {/* First and Last Name */}
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2 relative">
                            <FaUser className="absolute left-3 top-3" />
                            <input
                                className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                                type="text"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="w-1/2 relative">
                            <input
                                className="pl-3 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                                type="text"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4 relative">
                        <FaCalendarAlt className="absolute left-3 top-3" />
                        <input
                            className="pl-10 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-custom-green"
                            type="text"
                            placeholder="dd.mm.yyyy Enter your date of birth"
                        />
                    </div>

                    <button className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full" 
                    onClick={handleClickOnAccountCreated}>Create account</button>
                </div>
                )}

                {/* Conditionally render the email confirmation form */}
                {!showWelcomeCard && showOnlyEmail && showEmailConfirmation && (
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 z-10 relative" style={{ height: 'auto' }}>
                    <div className="email-confirmation-form">
                        {/* Content of your email confirmation form goes here */}
                        <h1 className="text-2xl font-bold text-center mb-4">Please confirm your Email address</h1>
                        <p className="text-sm text-gray-600 text-center mb-8">After confirmation you can log into your new account and start your profile creation.</p>
                        <button className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full"
                        onClick={handleBackToMainPageClick}>Back to login page</button>
                    </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-white z-10">
                <a href="#" className="underline">FAQ</a> | <a href="#" className="underline">Contact</a> | <a href="#" className="underline">Impressum</a> | <a href="#" className="underline">AGBs</a>
            </div>
        </div>
    );
};


export default LandingPage;


