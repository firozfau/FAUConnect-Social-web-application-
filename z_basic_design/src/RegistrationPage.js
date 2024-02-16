import React, { useState } from 'react';
import './index.css'; // Ensure you import your Tailwind CSS file
import { IoMdMale, IoMdFemale, IoMdTransgender } from 'react-icons/io';
import { FaMicroscope, FaLaptopMedical } from 'react-icons/fa';
import { MdOutlineScience } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
    const navigate = useNavigate();
    // State for form fields (not fully implemented for brevity)
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [staff, setStaff] = useState('');

    const [showInfoCard, setInfoCard] = useState(true); // State for info card
    const [showProfileCard, setProfileCard] = useState(false); // State for info card
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [showResearchCard, setShowResearchCard] = useState(false);
    const [showHobbiesCard, setShowHobbiesCard] = useState(false);
    const [showPhotoUploadCard, setShowPhotoUploadCard] = useState(false);
    const [showSearchPreferencesCard, setShowSearchPreferencesCard] = useState(false);
    const [showPositionCard, SetShowPositionCard] = useState(false);
    

    const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    };

    const handleStaffSelect = (staff) => {
        setSelectedStaff(staff);
    };

    const handleGetStarted = () => {
        setInfoCard(false);
        setProfileCard(true);

    };

    const navigateToMain = () => {
        navigate('/main');
    };

    const handleContinueToSearchPreferences = () => {
        setShowPhotoUploadCard(false); // Hide the photo upload card
        setShowSearchPreferencesCard(true); // Show the search preferences card
    };

    
    const handleContinuePosition = () => {
        setProfileCard(false);
        SetShowPositionCard(true); // Show the research fields card
    };

    // Handler for the "Continue" button on the profile card
    const handleContinue = () => {
        SetShowPositionCard(false);
        setShowResearchCard(true); // Show the research fields card
    };

    const handleContinueToHobbies = () => {
        setShowResearchCard(false); // Hide the research fields card
        setShowHobbiesCard(true); // Show the hobbies card
    };

    const handleContinueToPhotoUpload = () => {
        setShowHobbiesCard(false); // Hide the hobbies card
        setShowPhotoUploadCard(true); // Show the photo upload card
    };

    return (
        <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
            {/* Background image */}
            <img
                src="/images/registration_page_bg.png"
                alt="FAU Campus"
                className="absolute inset-0 object-cover w-full h-full"
            />

            <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center w-full z-10">
                {/* Logo */}
                <img
                    src="/images/logo.svg" // Replace with the path to your logo image
                    alt="FAU Logo"
                    className="h-14" // Adjust the size as needed
                />
            </header>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* New Info Card */}
            <div className="flex items-center justify-center w-full opacity-80">
                {showInfoCard && (<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 z-10 relative" style={{ height: 'auto' }}>
                    <h2 className="text-xl font-bold mb-2">Meet new people!</h2>
                     <p className="text-sm text-gray-600 mb-8">
                        We have a lot of friendly FAU people and some of them really want to drink a coffee with you.
                    </p>
                    <h2 className="text-xl font-bold mb-2">Don’t chat too much!</h2>
                    <p className="text-sm text-gray-600 mb-8">
                        This platform is about meeting each other in person. Keep the chatting to the organizational minimum.
                    </p>
                    <h2 className="text-xl font-bold mb-2">Be spontaneous!</h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Even if you don’t have so much time, 15 minutes for a nice chat are not asked too much.
                    </p>
                    <button
                            className="bg-custom-green text-white px-4 py-3 rounded-full focus:outline-none w-full"
                            onClick={handleGetStarted}>Get Started
                        </button>
                </div>)}

                {showProfileCard && (<div className="flex items-center justify-center w-full opacity-100">
                <form className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-6">Let's get started!</h2>
                    <div className="mb-4">
                    <label className="block">
                        Please enter your first Name and Age.
                    </label>
                    <input type="text" placeholder="First Name" className="w-full h-8 mt-2 p-2 rounded"/>
                    <input type="number" placeholder="Age" className="w-full h-8 mt-2 p-2 rounded"/>
                    </div>
                    <div className="mb-4">
                    <label className="block">Your gender</label>
                    <div className="flex justify-between">
                        <button type="button"
                        className={`flex items-center justify-center p-2 rounded ${selectedGender === 'male' ? 'bg-custom-darkgreen' : 'bg-transparent'}`}
                        onClick={() => handleGenderSelect('male')}>
                        <IoMdMale size={24} />
                        </button>
                        <button type="button" 
                        className={`flex items-center justify-center p-2 rounded ${selectedGender === 'female' ? 'bg-custom-darkgreen' : 'bg-transparent'}`}
                        onClick={() => handleGenderSelect('female')}>
                        <IoMdFemale size={24} />
                        </button>
                        <button type="button" 
                        className={`flex items-center justify-center p-2 rounded ${selectedGender === 'diverse' ? 'bg-custom-darkgreen' : 'bg-transparent'}`}
                        onClick={() => handleGenderSelect('diverse')}>
                        <IoMdTransgender size={24} />
                        </button>
                    </div>
                    </div>
                    <div className="mb-4">
                    <label className="block">Your pronouns</label>
                    <select className="w-full mt-2 p-2 rounded bg-white text-gray-700">
                        <option>Please select</option>
                        <option className="hover:bg-custom-darkgreen">He/Him</option>
                        <option className="hover:bg-custom-darkgreen">She/Her</option>
                        <option className="hover:bg-custom-darkgreen">They/Them</option>
                    </select>
                    </div>
                    <div className="mb-4">
                    <label className="block">Your occupation</label>
                    <div className="flex justify-between">
                        <button type="button" 
                        className={`flex items-center justify-center p-2 rounded ${selectedStaff === 'Scientific' ? 'bg-custom-darkgreen' : 'bg-transparent'}`}
                        onClick={() => handleStaffSelect('Scientific')}>
                        <FaMicroscope size={24} />
                        <span className="ml-2">Scientific staff</span>
                        </button>
                        <button type="button" 
                        className={`flex items-center justify-center p-2 rounded ${selectedStaff === 'NonScientific' ? 'bg-custom-darkgreen' : 'bg-transparent'}`}
                        onClick={() => handleStaffSelect('NonScientific')}>
                        <MdOutlineScience size={24} />
                        <span className="ml-2">Non-Scientific staff</span>
                        </button>
                    </div>
                    </div>
                    <button
                    type="button"
                    className="bg-custom-darkgreen text-white px-4 py-3 rounded-full focus:outline-none w-full"
                    onClick={handleContinuePosition} // Call the new handler here
                    > Continue </button>
                    </form>
                </div>)}

                {showPositionCard && (<div className="flex items-center justify-center w-full opacity-100">
                    <form className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-6">Your position at FAU</h2>
                    <p className="mb-6 text-sm opacity-75">
                        This information will be displayed in your profile and is not used during the matching process
                    </p>
                    <div className="mb-4">
                        <label className="block mb-2">Your title</label>
                        <select className="w-full p-2 rounded bg-white text-gray-700">
                        <option>Please select</option>
                        <option className="focus:bg-custom-darkgreen">He/Him</option>
                        <option className="hover:bg-custom-darkgreen">She/Her</option>
                        <option className="hover:bg-custom-darkgreen">They/Them</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Your job description</label>
                        <select className="w-full p-2 rounded bg-white text-gray-700">
                        <option>Please select</option>
                        <option className="focus:bg-custom-darkgreen">He/Him</option>
                        <option className="hover:bg-custom-darkgreen">She/Her</option>
                        <option className="hover:bg-custom-darkgreen">They/Them</option>
                        </select>
                    </div>
                    <div className="mb-8">
                        <label className="block mb-2">Your department</label>
                        <select className="w-full p-2 rounded bg-white text-gray-700">
                        <option>Please select</option>
                        <option className="focus:bg-custom-darkgreen">He/Him</option>
                        <option className="hover:bg-custom-darkgreen">She/Her</option>
                        <option className="hover:bg-custom-darkgreen">They/Them</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        className="bg-custom-darkgreen text-white px-4 py-3 rounded-full focus:outline-none w-full"
                        onClick={handleContinue} // Call the new handler here
                    >
                        Continue
                    </button>
                    </form>
                </div>
                )}


                {showResearchCard && (
                <div className="flex items-center justify-center w-full opacity-100">
                    <form className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full" style={{ maxWidth: '34rem', width: '100% !important' }}>                                          
                        <h2 className="text-2xl font-bold mb-6">Which fields and topics are you interested in?</h2>
                        <p className="mb-6 opacity-75">Choose 3 topics. When using focus mode, your matches will be based on these topics.</p>
                        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Marketing</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Administration</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Finance</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Management & Coordination</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Technical Services</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Support & Infrastructure</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Communication</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Legal & regulatory matters</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Student services</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Who is who at FAU?</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Humanities</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Economics</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Law</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Natural Science</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Medicine & Health</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Computer Science</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Engineering</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Teaching</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Internationalization</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Interdisciplinary collaboration</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Social Science</button>
                            <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Languages</button>
                        </div>
                        <button
                            type="button"
                            className="bg-custom-darkgreen text-white my-2 px-4 py-3 rounded-full focus:outline-none w-full"
                            onClick={handleContinueToHobbies} // Call the new handler here
                            > Continue
                        </button>
                    </form>
                </div>)}

                {showHobbiesCard && (
                    <div className="flex items-center justify-center w-full opacity-100">
                        <form className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full">
                            <h2 className="text-2xl font-bold mb-6">Tell us something about yourself</h2>
                            <p className="mb-6 opacity-75">Choose your hobbies</p>
                            <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Reading</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Yoga</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Hiking</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">World Domination</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Netflix</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Cinema</button>
                                <button type="button" className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">other</button>
                            </div>
                            <button
                                type="button"
                                className="bg-custom-darkgreen text-white my-2 px-4 py-3 rounded-full focus:outline-none w-full"
                                onClick={handleContinueToPhotoUpload} // Call the new handler here
                                >Continue
                            </button>
                        </form>
                    </div>)}

                    {showPhotoUploadCard && (
                        <div className="flex items-center justify-center w-full opacity-100">
                            <div className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full">
                                <h2 className="text-2xl font-bold mb-6">Upload a Photo</h2>
                                <p className="mb-4">Don't forget your happy smile :-)</p>
                                <div className="flex items-center justify-center mb-4">
                                    <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div className="flex flex-col items-center justify-center pt-7">
                                            {/* Placeholder silhouette or image */}
                                            <img src="/images/placeholder.jpeg" alt="Placeholder" className="mb-3" />
                                            <p className="mb-3 text-sm">click to upload</p>
                                        </div>
                                        <input id="photo-upload" type="file" className="opacity-0" />
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="bg-custom-darkgreen text-white px-4 py-3 rounded-full focus:outline-none w-full"
                                    onClick={handleContinueToSearchPreferences} // Call the new handler here
                                >Continue
                                </button>
                            </div>
                        </div>)}
                    
                        {showSearchPreferencesCard && (
                            <div className="flex items-center justify-center w-full opacity-100">
                                <div className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full" style={{ maxWidth: '28rem', width: '100% !important' }}>
                                    <h2 className="text-2xl font-bold mb-6">What are you searching for?</h2>
                                    
                                    {/* Gender selection */}
                                    <div className="mb-4">
                                        <label className="mb-6 text-sm opacity-75">The preferred gender of your coffee date?</label>
                                        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Male</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Female</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Diverse</button>
                                        </div>
                                    </div>

                                    {/* Employment preference */}
                                    <div className="mb-4">
                                        <label className="mb-6 text-sm opacity-75">Their preferred employment?</label>
                                        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Scientific Stuff</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Non-Scientific Staff</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Both</button>
                                        </div>
                                    </div>

                                    {/* City selection */}
                                    <div className="mb-4">
                                        <label className="mb-6 text-sm opacity-75">In which city are you around?</label>
                                        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Erlangen</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Nürnberg</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Bamberg</button>
                                            <button className="bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap">Fürth</button>
                                        </div>
                                    </div>

                                    {/* Mode toggles */}
                                    <div className="mb-4 text-white"> {/* Adjust the text color as necessary */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="mr-2">Activate Inspiration Mode?</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"/>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <p className="mb-6 text-sm opacity-75">You will get matched independent from your topics and interests to get to know new and exciting things.</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="mr-2">Activate Focus Mode?</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"/>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <p className="mb-6 text-sm opacity-75">Your match will be based on interests and topics chosen by both of you. You will definitely find common ground!</p>
                                    </div>


                                    {/* Continue button */}
                                    <button
                                        type="button"
                                        className="bg-custom-darkgreen text-white px-4 py-3 rounded-full focus:outline-none w-full"
                                        onClick={navigateToMain}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>)}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-white z-10">
                <a href="#" className="underline">FAQ</a> | <a href="#" className="underline">Contact</a> | <a href="#" className="underline">Impressum</a> | <a href="#" className="underline">AGBs</a>
            </div>
        </div>
    );
};

export default RegistrationPage;
