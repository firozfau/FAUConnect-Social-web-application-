import React, { useState,useEffect } from 'react';
import { IoMdMale, IoMdFemale, IoMdTransgender } from 'react-icons/io';
import { FaMicroscope, FaTools, FaLock } from 'react-icons/fa';
import LoadingModal from './modal';
import MessageModal from './message';
import config from './config';

const Options = ({onAccountModeChange,isProfileImageLink,isProfileData}) => {

  const [selectedGender, setSelectedGender] = useState(''); 
  const [isLanguageList, setLanguageList] = useState([]);  
  const [selectedStaff, setSelectedStaff] = useState(1);

  const [searchedGender, setSearchedGender] = useState(1);
  const [searchedStaff, setSearchedStaff] = useState(1);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const [iscurrentAccountMode, setcurrentAccountMode] = useState(1);
  const [isCurrentPassword, setCurrentPassword] = useState(false);
  const [isNewPassword, setNewPassword] = useState(false);
  const [isConfirmPassword, setConfirmPassword] = useState(false);

  const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setMessageOpen] = useState(false);


  const closeMessageModal = () => {
    setMessageOpen(false);
    setMessage('');
    };


  const handleGenderSelect = (gender) => {
    //setSelectedGender(gender);
};

const handelLanguageSelect = (language) =>{
 // setLanguageList(language)  
};
 
const handleStaffSelect = (staff) => {
       
  //setSelectedStaff(staff);
};


const handleGender = (gender) => {
  /*
  if (searchedGender.includes(gender)) {
      setSearchedGender(searchedGender.filter((item) => item !== gender));
  } else {
      setSearchedGender([...searchedGender, gender]);
  }
  */
};

const handleStaff = (staff) => {
  /*if (searchedStaff.includes(staff)) {
      setSearchedStaff(searchedStaff.filter((item) => item !== staff));
  } else {
      setSearchedStaff([...searchedStaff, staff]);
  }
  */
};

const handleCity = (city) => {
 /* if (selectedCity.includes(city)) {
      setSelectedCity(selectedCity.filter((item) => item !== city));
  } else {
      setSelectedCity([...selectedCity, city]);
  }
  */
};

const handleButtonClick = (category) => {
/*
  if (selectedButtons.includes(category)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== category));
  } else {
      if (selectedButtons.length < 3) {
          setSelectedButtons([...selectedButtons, category]);
      }
  }
  */

};
const handleAccountMode = (item) => {

  setcurrentAccountMode(item);
} 

const actionCurrentPassword = (event) => {

  setErrorCurrentPassword(false);
  const password = event.target.value; 
  setCurrentPassword(password);
} 

const actionNewPassword = (event) => {

  setErrorNewPassword(false);
  const password = event.target.value;
  setNewPassword(password); 
} 

const actionConfirmPassword = (event) => {

  setErrorConfirmPassword(false);
  const password = event.target.value;
  setConfirmPassword(password);  
} 


const passwordValidation = () => {

 
  let val_isCurrentPassword= (typeof isCurrentPassword === 'string')?isCurrentPassword.replace(/\s/g, ''):'';
  let val_isNewPassword= (typeof isNewPassword === 'string')?isNewPassword.replace(/\s/g, ''):'';
  let val_isConfirmPassword= (typeof isConfirmPassword === 'string')?isConfirmPassword.replace(/\s/g, ''):'';

  
 
    const upper_case_val_isCurrentPassword = /[A-Z]/.test(val_isCurrentPassword);
    const number_val_isCurrentPassword = /\d/.test(val_isCurrentPassword);

    const upper_case_val_isNewPassword = /[A-Z]/.test(val_isNewPassword);
    const number_val_isNewPassword = /\d/.test(val_isNewPassword);





    if(val_isCurrentPassword=="")
    {
      setErrorCurrentPassword('Enter your current password') ;
      return false;
   }
    else if(val_isCurrentPassword.length<5  || !upper_case_val_isCurrentPassword || !number_val_isCurrentPassword)
    {
      setErrorCurrentPassword('Password must be at least 5 characters with capital letter and number') ;
      return false;
    }
    else if(val_isNewPassword=="")
    {
      setErrorNewPassword('Enter your new password') ;
      return false;
  }
  else if(val_isNewPassword.length<5  || !upper_case_val_isNewPassword || !number_val_isNewPassword)
  {
    setErrorNewPassword('Password must be at least 5 characters with capital letter and number') ;
    return false;
  }
  else if(val_isConfirmPassword=="")
    {
      setConfirmPassword('Enter your confirm password') ;
      return false;
  }
  else if(val_isNewPassword!=val_isConfirmPassword)
  {
    setErrorNewPassword('Your confirm password does not match!') ;
    return false;
  }
  else{
    return true;
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
 


const interestList = [
  { 1: "Marketing" },
  { 2: "Administration" },
  { 3: "Finance" },
  { 4: "Management & Coordination" },
  { 5: "Technical Services" },
  { 6: "Support & Infrastructure" },
  { 7: "Communication" },
  { 8: "Legal & regulatory matters" },
  { 9: "Student Services" },
  { 10: "Who is who at FAU?" },
  { 11: "Humanities" },
  { 12: "Economics" },
  { 13: "Law" },
  { 14: "Natural Science" },
  { 15: "Medicine & Health" },
  { 16: "Computer Science" },
  { 17: "Engineering" },
  { 18: "Teaching" },
  { 19: "Internationalization" },
  { 20: "Interdisciplinary collaboration" },
  { 21: "Social Science" }
];

 


const actionAccountMode = () => { 

  if(iscurrentAccountMode>0)
  {

    setLoading(true); 

    let current_login_user_id =isProfileData.user_id;
    let changeUserModeAPI=config.setAccountModeAPI+"?account_mode="+iscurrentAccountMode+"&user_id="+current_login_user_id;



    fetch(changeUserModeAPI, {
      method: 'POST',
      headers: {
          'Authorization': config.apiAccessToken,
          'Content-Type': 'application/json',
      },
      body: "",//JSON.stringify(profile_search_data),
      })
      .then(response => response.json())
      .then(data => { 
          
          setLoading(false); 
 

          if(data.status == "success"){
            onAccountModeChange(iscurrentAccountMode);
            //alert("Successfully change your account mode.");
          }else{
            setMessage(data.message);
            setMessageOpen(true);
          }

        

      })
      .catch(error => {
          // Handle errors from the API call
          setLoading(false); 
          console.error('Error:', error);
          showErrorMessage("Something is wrong!");
         
      });




  }

  
 };

 const actionChangePassword = () => { 
 

 if(passwordValidation())
 {

 
 
  let current_login_user_id =isProfileData.user_id;

  const user_password_info={
    "user_id": current_login_user_id,
    "current_password": isCurrentPassword,
    "new_password": isNewPassword,
    "confirm_password": isConfirmPassword
  }

     

  setLoading(true); 
 
  setErrorCurrentPassword("");
  setErrorNewPassword("");
  setErrorConfirmPassword("");
  

  fetch(config.userPasswordChangedAPI, {
    method: 'POST',
    headers: {
        'Authorization': config.apiAccessToken,
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(user_password_info),
    })
    .then(response => response.json())
    .then(data => { 
        
        setLoading(false); 


        if(data.status == "success"){
           
          setCurrentPassword(false);
          setNewPassword(false);
          setConfirmPassword(false); 
          

          setMessage(data.message);
          setMessageOpen(true);

        } 
        else{
         
          showErrorMessage(data.message)
        }

       

      

    })
    .catch(error => {
        // Handle errors from the API call
        setLoading(false); 
        console.error('Error:', error);
        showErrorMessage("Something is wrong!");
       
    });







 }

 
 


 };



useEffect(() => {
    


      setSelectedGender(isProfileData.gender);
      setUserLanguage(isProfileData.languages_list);
      setSelectedStaff(isProfileData.profession); 
      setUserPreferredGender(isProfileData.search_gender);
      setUserPreferredProfession(isProfileData.search_profession);
      setUserPreferredCity(isProfileData.city_list);
      setUserPreferredInterest(isProfileData.interest_list);
      setcurrentAccountMode(isProfileData.account_mode);
      
       

    }, [onAccountModeChange,isProfileImageLink,isProfileData]);
  

    
    

 const setUserLanguage = (language_list_string) => {
  
  if(language_list_string)
  {

    const language_list = JSON.parse(language_list_string);


    if (language_list !== undefined && language_list !== null && language_list !== "") {
        setLanguageList("");
         setLanguageList(language_list);
      }

  }
 

    
    };   


    const setUserPreferredGender = (gender_list_string) => {
  
        if(gender_list_string)
        {
          const data = JSON.parse(gender_list_string);
        
        
          if (data !== undefined && data !== null && data !== "") {
            data.forEach(item => {
                
              setSearchedGender(item);
              
        
                });
            }

        }
          
      
        
        };   
        
   const setUserPreferredProfession = (profession_list_string) => {
  
    if(profession_list_string)
    {

      const data = JSON.parse(profession_list_string);
        
        
          if (data !== undefined && data !== null && data !== "") {
            data.forEach(item => {
                 
              setSearchedStaff(item);
               
        
                });
            }


    }
          
        
            
    };           

const setUserPreferredCity = (city_list_string) => {
  
  if(city_list_string)
  {

    const data = JSON.parse(city_list_string);
    
    
    if (data !== undefined && data !== null && data !== "") {
       
      setSelectedCity("");
      setSelectedCity(data);

      }


  }

      
    
        
}; 

const setUserPreferredInterest = (interest_list_string) => {
  
if(interest_list_string){


  const data = JSON.parse(interest_list_string);


  if (data !== undefined && data !== null && data !== "") {
     

    const filteredList = interestList.filter(interest => {
      const key = parseInt(Object.keys(interest)[0]);
      return data.includes(key);
    });

    setSelectedButtons("");
    setSelectedButtons(filteredList);

    }



}


 

    
}; 

    

  return (
    <div className="flex flex-wrap flex-1">

      <form className="bg-chat-side-nav p-8 grid grid-cols-1 gap-4 justify-items-center rounded-xl shadow-2xl text-white max-w-sm w-full m-4 border-2 border-solid border-black border-opacity-20">
        <div className='grid grid-cols-2 gap-4 justify-items-center'>
          <label htmlFor="photo-upload" className="flex pt-4 flex-col items-center justify-center h-24 hover:border-2 hover:border-solid hover:border-black max-w-24">

            <div className="justify-center">
              <img src={isProfileImageLink}  alt="Placeholder" className="mb-3" />
            </div>
            <input id="photo-upload" type="file" className="opacity-0" />
          </label>

          <div className="pl-4">
            <label className="block pt-4">Your gender</label>
            <div className="flex justify-evenly">
              

            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender == '1' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGenderSelect('1')}>
                <IoMdMale size={24} />
            </button>
            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender == '2' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGenderSelect('2')}>
                <IoMdFemale size={24} />
            </button>
            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${selectedGender == '3' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGenderSelect('3')}>
                <IoMdTransgender size={24} />
            </button>

            </div>
          </div>
        </div>

        <div className="">
             <div className="mb-4">
                  <label className="mb-6 text-sm opacity-75">Which languages do you speak?</label>
                  <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">


                  {isLanguageList.includes(1) && (
                    <button 
                      type="button" 
                      className={'bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active'} 
                      onClick={() => handelLanguageSelect('1')}
                    >
                      Deutsch
                    </button>
                  )}

                  {isLanguageList.includes(2) && (
                    <button 
                      type="button" 
                      className={'bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active'} 
                      onClick={() => handelLanguageSelect('1')}
                    >
                      English
                    </button>
                  )}

                   </div>
              </div>
        </div>


        <div className="">
          <label className="pb-2">Your occupation</label>
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




      </form>

     



      <div className="bg-chat-side-nav p-6 rounded-xl shadow-2xl text-white m-4 border-2 border-solid border-black border-opacity-20">


        {/* Gender selection */}
        <div className="mb-4">
          <label className="mb-6 text-sm opacity-75">Preferred gender</label>
            <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">

            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${searchedGender == '1' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGender('1')}>
                <IoMdMale size={24} />
            </button>
            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${searchedGender == '2' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGender('2')}>
                <IoMdFemale size={24} />
            </button>
            <button type="button"
                className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen hover:text-white ${searchedGender == '3' ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                onClick={() => handleGender('3')}>
                <IoMdTransgender size={24} />
            </button>
 
              </div>
        </div>

        {/* Employment preference */}
        <div className="mb-4">
          <label className="mb-6 text-sm opacity-75">Preferred employment</label>
          <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">

               <button type="button"
                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen ${searchedStaff === 1 ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                    onClick={() => handleStaff(1)}>
                    <FaMicroscope size={24} className="m-2" />
                    <span className="ml-2">Scientific staff</span>
                </button>
                <button type="button"
                    className={`flex items-center justify-center p-2 rounded hover:bg-custom-darkgreen ${searchedStaff === 2 ? 'bg-green-950/[.70]' : 'bg-transparent'}`}
                    onClick={() => handleStaff(2)}>
                    <FaTools size={24} className="m-2" />
                    <span className="ml-2">Non-Scientific staff</span>
                </button>



      
       
                                    
          </div>
        </div>

        {/* City selection */}
        <div className="mb-4">
          <label className="mb-6 text-sm opacity-75">Preferred city</label>
          <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">


          {selectedCity.includes(1) && (

            <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active`} onClick={() => handleCity('1')}>Erlangen</button>

          )}

          {selectedCity.includes(2) && (

          <button type="button" className={'bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active'} onClick={() => handleCity('2')}>Nürnberg</button>

          )}

          {selectedCity.includes(3) && (

          <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active`} onClick={() => handleCity('3')}>Bamberg</button>

          )}

          {selectedCity.includes(4) && (

          <button type="button" className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active`} onClick={() => handleCity('4')}>Fürth</button> 

          )}
         
          
          
          
           </div>
        </div>


        <div className="mb-4">
        <label className="mb-6 text-sm opacity-75"> Focus mode will base your 3 matches on these topics.</label>
        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">

        {selectedButtons.map((item, index) => {
              const key = Object.keys(item)[0];
              const text = item[key];
              return (
                <button 
                  key={key}
                  type="button" 
                  className={`bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active`} 
                  onClick={() => handleButtonClick(key, text)}
                >
                  {text}
                </button>
              );
          })}
           
        </div>
      </div> 



        
      </div>
 


 


      

  <div className="bg-chat-side-nav p-2 grid grid-cols-1 justify-items-center rounded-xl shadow-2xl text-white max-w-sm m-2 border-2 border-solid border-black border-opacity-20">
    {/* accoutn mode */}
    <h2 className="pt-4 pb-5 border-b-2 border-none border-black text-center">Change your Account Mode</h2>
    
    <div className="space-y-2 pl-10">
        <label className="inline-flex items-center cursor-pointer">
            <input  onClick={() => handleAccountMode(1)} value={iscurrentAccountMode} checked={iscurrentAccountMode == 1} type="radio" name="account_mode"  className="form-radio text-indigo-600 h-5 w-5 cursor-pointer" />
            <span className="ml-2 text-sm">Inspiration mode (randomly match)</span>
        </label>
        <label className="inline-flex items-center cursor-pointer">
            <input onClick={() => handleAccountMode(2)} value={iscurrentAccountMode}  checked={iscurrentAccountMode == 2}  type="radio" name="account_mode" className="form-radio text-indigo-600 h-5 w-5 cursor-pointer" />
            <span className="ml-2 text-sm">Focus mode (interest)</span>
        </label>
        <label className="inline-flex items-center cursor-pointer">
            <input onClick={() => handleAccountMode(3)} value={iscurrentAccountMode}  checked={iscurrentAccountMode == 3} type="radio" name="account_mode"  className="form-radio text-indigo-600 h-5 w-5 cursor-pointer" />
            <span className="ml-2 text-sm">Invisible mode (Nobody found you)</span>
        </label>
        <label className="inline-flex items-center cursor-pointer">
            <input onClick={() => handleAccountMode(4)} value={iscurrentAccountMode}  checked={iscurrentAccountMode == 4}   type="radio" name="account_mode"   className="form-radio text-indigo-600 h-5 w-5 cursor-pointer" />
            <span className="ml-2 text-sm">Vacation mode (Not allowed for a match)</span>
        </label>
    </div>

    <button onClick={actionAccountMode} type="button" className="bg-custom-green text-white hover:bg-custom-darkgreen hover:text-white px-4 h-10 rounded-full mt-4 cursor-pointer">Change Now</button>
</div>








<div className="bg-chat-side-nav p-2 grid grid-cols-1 justify-items-center rounded-xl shadow-2xl text-white max-w-sm m-2 border-2 border-solid border-black border-opacity-20"
style={{ zIndex: 99, position: 'relative' }} 
>
    {/* account password mode */}
    <h2 className="pt-4 pb-5 border-b-2 border-none border-black text-center">Change your Current password</h2>
    
    <div className="space-y-2 pl-10  pr-10 pb-10 pt-5">
        <input
            type="password"
            id="currentPassword"
            className="min-w-300 w-full px-3 py-2 mb-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your current password"
            onChange={actionCurrentPassword}

        />
    <b className="text-red-500 text-sm">{errorCurrentPassword}</b>
        <input
            type="password"
            id="newPassword"
            className="min-w-300 w-full px-3 py-2 mb-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your new password"
            onChange={actionNewPassword}

        />
 <b className="text-red-500 text-sm">{errorNewPassword}</b>
        <input
            type="password"
            id="confirmPassword"
            className="min-w-300 w-full px-3 py-2 mb-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm your new password"
            onChange={actionConfirmPassword}
        />
        <b className="text-red-500 text-sm">{errorConfirmPassword}</b>
    </div>

    <button onClick={actionChangePassword}  type="button" className="bg-custom-green text-white hover:bg-custom-darkgreen hover:text-white px-4 h-10 rounded-full mt-4 cursor-pointer">Change Password</button>
</div>


 



                   



 
  <LoadingModal isOpen={isLoading} />
   <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />

 
    </div>
  )
}

export default Options;