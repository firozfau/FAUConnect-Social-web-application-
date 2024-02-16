import React, { useState,useEffect } from 'react';
import './App.css'; // Ensure you import your Tailwind CSS file
import Footer from './footer.js';
import Header from './header.js';
import { IoMdMale, IoMdFemale, IoMdTransgender } from 'react-icons/io';
import { FaMicroscope, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from './config';
import LoadingModal from './modal';
import MessageModal from './message';


const RegistrationPage = () => {
    const navigate = useNavigate();
    // State for form fields (not fully implemented for brevity)
    const [gender, setGender] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [staff, setStaff] = useState('');
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [searchedGender, setSearchedGender] = useState([]);
     
    const [searchedStaff, setSearchedStaff] = useState([]);

    const [selectedCity, setSelectedCity] = useState([]);
    const [selectedGer, setSelectedGer] = useState(false);
    const [selectedEng, setSelectedEng] = useState(false);

    const [focus, setFocus] = useState(false);
    const [inspiration, setInspiration] = useState(false);

    const [showInfoCard, setInfoCard] = useState(false); // State for info card
    const [showProfileCard, setProfileCard] = useState(true); // State for info card
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('');
    const [showResearchCard, setShowResearchCard] = useState(false);
    const [showPhotoUploadCard, setShowPhotoUploadCard] = useState(false);
    const [showSearchPreferencesCard, setShowSearchPreferencesCard] = useState(false);
 

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isMessageOpen, setMessageOpen] = useState(false);

        



    useEffect(() => {
        
        const userData = getSessionForUsers("login_data");
        if(userData)
        {
            if(userData.first_login=="done")
            {
                navigate('/main'); 
            }

     
        sessionStorage.setItem('current_login_user_id', userData.user_id);
       
        
        }
        else{
            navigate('/'); 
        }

    }, []); 

const getSessionForUsers = (session_key) => {
    const storedUserDataString = sessionStorage.getItem(session_key);
    if (storedUserDataString === null) {
        return false;
    } else {
        return JSON.parse(storedUserDataString);
    }
}





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


let profile_gpl_data={
    user_id:0,
    gender:'',
    languages_list:[],
    profession:'', 

};

let profile_interest_data={ 
    user_id:0,
    interest_list:[], 

};
let profile_search_data={ 
    user_id:0,
    search_gender:[],
    search_profession:[],
    city_list:[],
    account_mode:''

};


 
const firstValidation = () => {


    let error_data = false; 
    profile_gpl_data['user_id']=getSessionForUsers("current_login_user_id");

    if (selectedGender.length > 0) {
        profile_gpl_data['gender'] = parseInt(selectedGender);
    } else {
        error_data = true;
    }

    if (selectedGer || selectedEng)
    {
        let languages = "";

        if (selectedGer && selectedEng) {
            languages = [1,2];
        } else if (selectedGer) {
            languages = [1];
        } else {
            languages = [2];
        }

        // Assign an array directly without wrapping it
        profile_gpl_data['languages_list'] =languages;
    } else {
        error_data = true;
    }

    if (selectedStaff>0) 
    {
        profile_gpl_data['profession'] = selectedStaff;
    } else {
        error_data = true;
    }

    if(error_data)
    {
        return false;
        
    }
    else{
        return true;
    }

};



const secondValidation = () => {
 
    
    profile_interest_data['user_id']=getSessionForUsers("current_login_user_id");
    const interestList = selectedButtons.join(', ');
  
    let error_data = false;

    if (interestList.length > 0) {
        profile_interest_data['interest_list'] = [interestList];
    } else {
        error_data = true;
    }
    
    if(error_data)
    {
        return false;
        
    }
    else{
        return true;
    }

};



const thirdValidation = () => {

  
 
    
    profile_search_data['user_id']=getSessionForUsers("current_login_user_id");
 
    const searchedGenderList = searchedGender.join(', ');
    const searchedStaffList = searchedStaff.join(', ');
    const selectedCityList = selectedCity.join(', ');

  
  
    let error_data = false;

    if (searchedGenderList.length > 0) {
        profile_search_data['search_gender'] = [searchedGenderList];
    } else {
        error_data = true;
    }


    if (searchedStaffList.length > 0) {
        profile_search_data['search_profession'] = [searchedStaffList];
    } else {
        error_data = true;
    }

    if (selectedCityList.length > 0) {
        profile_search_data['city_list'] = [selectedCityList];
    } else {
        error_data = true;
    }

    if (focus || inspiration) 
    {
        if(inspiration){
            profile_search_data['account_mode'] = 1;
        }else{
            profile_search_data['account_mode'] = 2;
        }


    } else {
        error_data = true;
    }

    

    
    if(error_data)
    {
        return false;
        
    }
    else{
        return true;
    }

};


   // Handler for the "Continue" button on the profile card
   const handleContinue = () => {

    
    if(firstValidation())
    {
 
        setLoading(true); 

        fetch(config.profileUpdateGPL, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile_gpl_data),
            })
            .then(response => response.json())
            .then(data => { 
                setLoading(false); 

                if(data.status=="success")
                {
                    setProfileCard(false);
                    setShowResearchCard(true); // Show the research fields card

                }
                else{
                    showErrorMessage(data.message);
                      
                }


              

            })
            .catch(error => {
                // Handle errors from the API call
                setLoading(false); 
                console.error('Error:', error);
                showErrorMessage("Something is wrong !");
                
            });
         

       
    }
    else{
       
        showErrorMessage("All field are required");
        
    }
 
};
 
 

const handleContinueToSearchPreferences = () => {
      
 
    if(secondValidation())
    {
        setLoading(true); 

        profile_interest_data.interest_list = profile_interest_data.interest_list[0].split(',').map(item => parseInt(item.trim(), 10));
 
        fetch(config.profileUpdateInterestList, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile_interest_data),
            })
            .then(response => response.json())
            .then(data => { 
                
                setLoading(false); 
               
                if(data.status=="success")
                {
                   
                    setShowResearchCard(false); // Hide the Interest card
                    setShowSearchPreferencesCard(true); // Show the search preferences card

                }
                else{
                    showErrorMessage(data.message);
                      
                }


              

            })
            .catch(error => {
                // Handle errors from the API call

                setLoading(false); 
                console.error('Error:', error);
                showErrorMessage("Something is wrong!");
                
            });
        
      



    }
    else{
        
        showErrorMessage("Please select least one!");
        
    } 
       
 };


const handleContinueToPhotoUpload = () => {
   
 
        if(thirdValidation())
        {
            setLoading(true); 
            
            profile_search_data.search_gender = profile_search_data.search_gender[0].split(',').map(item => parseInt(item.trim(), 10));
            profile_search_data.search_profession = profile_search_data.search_profession[0].split(',').map(item => parseInt(item.trim(), 10));
            profile_search_data.city_list = profile_search_data.city_list[0].split(',').map(item => parseInt(item.trim(), 10));
 
        fetch(config.profileUpdateSearchingList, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile_search_data),
            })
            .then(response => response.json())
            .then(data => { 
                
                setLoading(false); 

                if(data.status=="success")
                {
                    setShowSearchPreferencesCard(false); // Hide the search preferences card
                    setShowPhotoUploadCard(true); // Show the photo upload card

                }
                else{

                     showErrorMessage(data.message);
                      
                }


              

            })
            .catch(error => {
                // Handle errors from the API call
                setLoading(false); 
                console.error('Error:', error);
                showErrorMessage("Something is wrong!");
               
            });
        
      



            
        }
        else{
           
            showErrorMessage("All fields area required");
            
        }
     
           
        };
 


const chooseUserPhoto= ()=>{
      
    const input = document.getElementById('photo-upload');
    const preview = document.getElementById('current_user_image_link');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }

}

const finishProfileUpdated= ()=>{


    const input = document.getElementById('photo-upload'); 
    
    if (input.files && input.files[0]) {
        
            const file = input.files[0];
 

             uploadUserImage(file);
             
            
    }


   

}
const uploadUserImage = (file) => {

    
    if(file)
    {
        setLoading(true); 

        let current_login_user_id =getSessionForUsers("current_login_user_id");
        let user_photo_upload_api=config.saveUserPhoto+"?user_id="+current_login_user_id;


        const formData = new FormData();
        formData.append('file', file);

        fetch(user_photo_upload_api, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                // No need to set 'Content-Type' for FormData
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                
                setLoading(false); 

                if(data.status=="success"){
                   


                    const session_user_data = getSessionForUsers("login_data");
                    session_user_data.first_login="done";

                    const userDataString = JSON.stringify(session_user_data);
                    sessionStorage.setItem('login_data', userDataString);

                    navigate('/main'); 


                }
                else{
                     
                      showErrorMessage(data.message);
                      
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false); 
                showErrorMessage("Something is wrong try again!");
            });
        
    }
    else{
        showErrorMessage("Please select your beloved photo!");
        
    }


}



  
    const handleButtonClick = (category) => {
        if (selectedButtons.includes(category)) {
            setSelectedButtons(selectedButtons.filter((item) => item !== category));
        } else {
            if (selectedButtons.length < 3) {
                setSelectedButtons([...selectedButtons, category]);
            }
        }
     
    };

    const handleCity = (city) => {
        if (selectedCity.includes(city)) {
            setSelectedCity(selectedCity.filter((item) => item !== city));
        } else {
            setSelectedCity([...selectedCity, city]);
        }
    };

    const handleSelectedGer = () =>{
        selectedGer ? setSelectedGer(false) : setSelectedGer(true)  
    };

    const handleSelectedEng = () => {
        selectedEng ? setSelectedEng(false) : setSelectedEng(true)
    };
 

    const handleGender = (gender) => {
        if (searchedGender.includes(gender)) {
            setSearchedGender(searchedGender.filter((item) => item !== gender));
        } else {
            setSearchedGender([...searchedGender, gender]);
        }
    };


    const handleStaff = (staff) => {
        if (searchedStaff.includes(staff)) {
            setSearchedStaff(searchedStaff.filter((item) => item !== staff));
        } else {
            setSearchedStaff([...searchedStaff, staff]);
        }
    };

    const handleFocus = () => { 
        if(focus){
            setFocus(false);
        }
        else{
            setFocus(true);
        }
    };

 

    const handleInspiration = () => {
        if(inspiration){
            setInspiration(false);
        }
        else{
            setInspiration(true);
        }
        
        
    };









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
                src="/images/registration_page_bg.png"
                alt="FAU Campus"
                className="absolute inset-0 object-cover w-full h-full"
            />

            <Header />

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
                            <label className="block pb-2">Your gender</label>
                            <div className="flex justify-evenly">
                                <button type="button"
                                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender === '1' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                                    onClick={() => handleGenderSelect('1')}>
                                    <IoMdMale size={24} />
                                </button>
                                <button type="button"
                                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender === '2' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                                    onClick={() => handleGenderSelect('2')}>
                                    <IoMdFemale size={24} />
                                </button>
                                <button type="button"
                                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender === '3' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                                    onClick={() => handleGenderSelect('3')}>
                                    <IoMdTransgender size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="mb-6 text-sm opacity-75">Which languages do you speak?</label>
                            <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedGer ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={handleSelectedGer}>Deutsch</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedEng ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={handleSelectedEng}>English</button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block pb-2">Your occupation</label>
                            <div className="flex justify-between pb-2 gap-4">
                                <button type="button"
                                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen ${selectedStaff === 1 ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                                    onClick={() => handleStaffSelect(1)}>
                                    <FaMicroscope size={24} className="m-2" />
                                    <span className="ml-2">Scientific staff</span>
                                </button>
                                <button type="button"
                                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen ${selectedStaff === 2 ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                                    onClick={() => handleStaffSelect(2)}>
                                    <FaTools size={24} className="m-2" />
                                    <span className="ml-2">Non-Scientific staff</span>
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="bg-green-500 text-black hover:bg-custom-darkgreen hover:text-white px-4 py-3 rounded-full focus:outline-none w-full"
                            onClick={handleContinue} // Call the new handler here
                        > Continue</button>
                    </form>
                </div>)}

                {showResearchCard && (
                    <div className="flex items-center justify-center w-full opacity-100">
                        <form className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full" style={{ maxWidth: '34rem', width: '100% !important' }}>
                            <h2 className="text-2xl font-bold mb-6">Your Interest fields and topics?</h2>
                            <p className="mb-6 opacity-75">Choose 3 topics. Focus mode will base your matches on these topics.</p>
                            <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto pb-2">
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(1) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black '}`} onClick={() => handleButtonClick(1)}>Marketing</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(2) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(2)}>Administration</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(3) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(3)}>Finance</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(4) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(4)}>Management & Coordination</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(5) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(5)}>Technical Services</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(6) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(6)}>Support & Infrastructure</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(7) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(7)}>Communication</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(8) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(8)}>Legal & regulatory matters</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(9) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(9)}>Student Services</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(10) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(10)}>Who is who at FAU?</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(11) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(11)}>Humanities</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(12) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(12)}>Economics</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(13) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(13)}>Law</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(14) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(14)}>Natural Science</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(15) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(15)}>Medicine & Health</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(16) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(16)}>Computer Science</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(17) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(17)}>Engineering</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(18) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(18)}>Teaching</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(19) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(19)}>Internationalization</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(20) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(20)}>Interdisciplinary collaboration</button>
                                <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedButtons.includes(21) ? 'bg-green-950/[.70]  text-white active' : 'bg-custom-green-500 text-black'}`} onClick={() => handleButtonClick(21)}>Social Science</button> 

                            </div>
                            <button
                                type="button"
                                className="bg-green-500 text-black hover:bg-custom-darkgreen hover:text-white my-2 px-4 py-3 rounded-full focus:outline-none w-full"
                                onClick={handleContinueToSearchPreferences} // Call the new handler here
                            > Continue
                            </button>
                        </form>
                    </div>)}

               

                {showSearchPreferencesCard && (
                    <div className="flex items-center justify-center w-full opacity-100">
                        <div className="bg-custom-green p-8 rounded-xl shadow-lg text-white max-w-sm w-full" style={{ maxWidth: '28rem', width: '100% !important' }}>
                            <h2 className="text-2xl font-bold mb-6">What are you searching for?</h2>

                            {/* Gender selection */}
                            <div className="mb-4">
                                <label className="mb-6 text-sm opacity-75">The preferred gender of your coffee date?</label>
                                <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${searchedGender.includes('1') ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleGender('1')}>Male</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${searchedGender.includes('2') ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleGender('2')}>Female</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${searchedGender.includes('3') ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleGender('3')}>Diverse</button>
                                   
                                </div>
                            </div>

                            {/* Employment preference */}
                            <div className="mb-4">
                                <label className="mb-6 text-sm opacity-75">Their preferred employment?</label>
                                <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${searchedStaff.includes(1) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleStaff(1)}>Scientific Stuff</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${searchedStaff.includes(2) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleStaff(2)}>Non-Scientific Staff</button>
                                    
                                </div>
                            </div>

                            {/* City selection */}
                            <div className="mb-4">
                                <label className="mb-6 text-sm opacity-75">In which city are you around?</label>
                                <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedCity.includes(1) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleCity(1)}>Erlangen</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedCity.includes(2) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleCity(2)}>Nürnberg</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedCity.includes(3) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleCity(3)}>Bamberg</button>
                                    <button className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${selectedCity.includes(4) ? 'bg-green-950/[.70]  text-white active' : ''}`} onClick={() => handleCity(4)}>Fürth</button>
                                    
                                </div>
                            </div>

                            {/* Mode toggles */}
                            <div className="mb-4 text-white"> {/* Adjust the text color as necessary */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className='pr-2'>
                                        <span className="mr-2">Activate Inspiration Mode?</span>
                                        <p className="mb-6 text-sm opacity-75">You will get matched independent from your topics and interests to get to know new and exciting things.</p></div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="1" class="sr-only peer" />
                                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none ${inspiration ? 'peer-focus:ring-4 peer-focus:ring-blue-300' : ''} dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500/[.70] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-950`} onClick={handleInspiration} ></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className='pr-2'>
                                        <span className="mr-2">Activate Focus Mode?</span>
                                        <p className="mb-6 text-sm opacity-75">Your match will be based on interests and topics chosen by both of you. You will definitely find common ground!</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="1" class="sr-only peer" />
                                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none ${focus ? 'peer-focus:ring-4 peer-focus:ring-blue-300' : ''} dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500/[.70] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-950`} onClick={handleFocus} ></div>
                                    </label>
                                </div>

                            </div>


                            {/* Continue button */}
                            <button
                                type="button"
                                className="bg-green-500 text-black hover:bg-custom-darkgreen hover:text-white px-4 py-3 rounded-full focus:outline-none w-full"
                                onClick={handleContinueToPhotoUpload}
                            >
                                Continue
                            </button>
                        </div>
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
                                        <img src="/images/placeholder.jpeg" alt="Placeholder" id="current_user_image_link" className="mb-3 profileUploadedImageSize" />
                                        <p className="mb-3 text-sm">click to upload</p>
                                    </div>
                                    <input  onChange={chooseUserPhoto} name="user_photo" id="photo-upload" type="file" className="opacity-0" />
                                </label> 
                            </div>
                            <button
                                type="button"
                                className="bg-green-500 text-black hover:bg-custom-darkgreen hover:text-white px-4 py-3 rounded-full focus:outline-none w-full"
                                onClick={finishProfileUpdated} // Call the new handler here
                            >Finish
                            </button>
                        </div>
                    </div>)}
            </div>

            {/* Footer */}
            <Footer />
            
            <LoadingModal isOpen={isLoading} />
            <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />
        </div>
    );
};

export default RegistrationPage;
