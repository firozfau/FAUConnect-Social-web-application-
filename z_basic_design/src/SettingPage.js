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
    const [gender, setGender] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState('');

    // State for active tab
    const [activeTab, setActiveTab] = useState('profile');

    // Function to handle the photo upload
    const handlePhotoUpload = (event) => {
        setProfilePhoto(event.target.files[0]);
    };

    // Function to handle the date of birth change
    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleStaffSelect = (staff) => {
        setSelectedStaff(staff);
    };

    const navigateToMain = () => {
        navigate('/main');
    };

    // Handler for tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">

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
                {/* Tab Titles */}
                <div className="flex border-b">
                <button 
                    className={`py-2 px-4 ${activeTab === 'account' ? 'border-b-2 border-blue-500' : ''}`} 
                    onClick={() => handleTabChange('account')}>
                    Account Setting
                </button>
                <button 
                    className={`py-2 px-4 ${activeTab === 'topic' ? 'border-b-2 border-blue-500' : ''}`} 
                    onClick={() => handleTabChange('topic')}>
                    Topic Setting
                </button>
                <button 
                    className={`py-2 px-4 ${activeTab === 'search' ? 'border-b-2 border-blue-500' : ''}`} 
                    onClick={() => handleTabChange('search')}>
                    Search Setting
                </button>
                {/* ... add more tabs as needed ... */}
                </div>
            </header>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="flex items-center justify-center w-full opacity-80">

                {/* Tab Content */}
                {activeTab === 'account' && (
                    <div className="flex items-center justify-center w-full opacity-100">
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
                    onClick={navigateToMain} // Call the new handler here
                    > Continue </button>
                    </form>
                </div>)}
                {activeTab === 'topic' && (
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
                            onClick={navigateToMain} // Call the new handler here
                            > Apply Changes
                        </button>
                    </form>
                </div>)}

                {activeTab === 'search' && (
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
                            Apply Changes
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