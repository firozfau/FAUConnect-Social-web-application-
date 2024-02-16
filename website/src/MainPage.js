import React, { useState,useEffect } from 'react';
import {FaBell, FaRegComments, FaArchive, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Make sure to install react-icons
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

import './frz.css';
import { getUserInformationDetails } from './frz.js';

import IdleChat from './IdleChat.js'; 
import EmptyArchive from './emptyarchive.js';
import NotificationPage from './notification.js';
import Chat from './chat.js';
import Options from './options.js'
import MatchingPartnerProfile from './matchingPartnerProfile.js'

import config from './config';
import LoadingModal from './modal';
import MessageModal from './message';
import FeedbackModal from './feedbackModal';



const MainPage = () => {
  const navigate = useNavigate();
  const [isActiveCurrentUserMode, setActiveCurrentUserMode] = useState(1);
  const [activeItem, setActiveItem] = useState(1);
  const [isActiveChat,  setActiveChat] = useState(false);
  const [isPartnerProfileVisible, setPartnerProfileVisibility] = useState(false);
  const [isPartnerProfileVisibleClass, setPartnerProfileVisibilityClass] = useState('w-3/3');

  const [isUserAllImageLink, setUserAllImageLink] = useState(false);

  const [isProfileData, setProfileData] = useState([]);
  const [isPartnerProfileData, setPartnerProfileData] = useState([]);
  const [isProfileImageLink, setProfileImageLink] = useState(false);
  const [isPartnerProfileImageLink, setPartnerProfileImageLink] = useState(false);

  const [isMatchingPartnerProfileModalOpen, setMatchingPartnerProfileModalOpen] = useState(false);
  const [isMatchingPartnerProfileData, setMatchingPartnerProfileData] = useState([]);

  const [isChatStatusData, setChatStatusData] = useState(false);
  const [isCurrentPartnerId, setCurrentPartnerId] = useState(false);
  const [isCurrentUserId, setCurrentUserId] = useState(false);
  const [isArchiveChatData, setArchiveChatData] = useState(false);
  const [isAlreadyPartnerUserId, setAlreadyPartnerUserId] = useState(false);
  const [isArchivePartnerList, setArchivePartnerList] = useState([]);

  const [isAdminNotificationData, setAdminNotificationData] = useState([]);

   
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageOpen, setMessageOpen] = useState(false);



/*------------------------------- feedback code -------------------------------*/
const [isOpenFeedback, setOpenFeedback] = useState(false);
const [isUserFeedbackBaseData, setUserFeedbackBaseData] = useState(false);
const [isUserFeedbackList, setUserFeedbackList] = useState(false);

const sendFeedBack = (feedback_data) => {
 
 
  setLoading(true); 
 

  fetch(config.sendFeedbackApi, {
    method: 'POST',
    headers: {
        'Authorization': config.apiAccessToken,
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(feedback_data),
    })
    .then(response => response.json())
    .then(data => { 
        
     
      if(data.status=="success")
      {

        const userData = getSessionForUsers("login_data");
        fetchData(userData);
       



        setTimeout(() => {
          
          setOpenFeedback(false);
          setLoading(false); 

           }, 3000);

      }
      else{

        setLoading(false); 
        alert(data.message);
      }
         

      


    })
    .catch(error => {
      setLoading(false); 
        console.error('Error:', error); 
    
    });






}






const onCloseFeedBack = () => {
  setOpenFeedback(false);


};






/*------------------------------- feedback code close -------------------------------*/






  const closeMessageModal = () => {
    setMessageOpen(false);
    setMessage('');
    };

  const setChatStatusFunction = (status) => {
 

    setChatStatusData(status);
    if(status){

      setActiveChat(true);
      setActiveItem(1);
      
      
    } 
    
 


  };
 
  const setAccountModeChange = (account_mode) => {
    
    setActiveCurrentUserMode(account_mode);


    const login_data = getSessionForUsers("login_data");
    const session_data = {
      user_id: login_data.user_id,
      account_status: login_data.account_status,
      account_mode:account_mode,
      first_name: login_data.first_name,
      last_name: login_data.last_name,
      email: login_data.email ,
      first_login:login_data.first_login
    };

  setLoginSession(session_data);
 
       fetchData(session_data);
 



    




     
    
  }



  const handleItemClick = (label) => {

    setActiveChat(false);
    if(label==1 || label==2)
    {
      if(isActiveCurrentUserMode==label){
        setActiveChat(true);
      }
     
    } 

    setActiveItem(label);
  };
  
// MainPage.js
const showHideProfile = () => {

 
  setPartnerProfileVisibility(!isPartnerProfileVisible);
  setPartnerProfileVisibilityClass(isPartnerProfileVisible ? 'w-3/3' : 'w-2/3');
};


const getUserInformation = (userData) => {


  getUserInformationDetails(userData);

};

const showAndHideMatchingModal = (default_user_img_link,data,matching_partner) => {



  if(data.matching_status=="Unlock")
  {
    

    let matched_data={
      "status":false,
      "message":matching_partner.message,
      "data":false,
    };

    if(matching_partner.data){
      let object_data= matching_partner.data[0];

        matched_data.status=true; 
        matched_data.data={
          "partner_id":object_data.user_id,
          "gender":object_data.gender, 
          "full_name":object_data.first_name+" "+object_data.last_name,
          "user_photo_link":default_user_img_link+object_data.user_photo,  
          "account_mode":object_data.account_mode
        };
    } 


    
    setMatchingPartnerProfileModalOpen(true);  
    setMatchingPartnerProfileData(matched_data);


  }
  else{
   

    let archive_chat_data= data.archive_chat_data;
    let partner_data= data.data;
     
    const is_current_user_send_message = archive_chat_data.some(item => item.sender_id === partner_data.user_id); 
    
    if(is_current_user_send_message==false)
    {
       

      let matched_data={
          "status":true,
          "message":"Congratulations! Your profile has finally matched with someone, and you have received a welcome message. Check it out!",
          "data":{
          "partner_id":partner_data.friend_id,
          "gender":partner_data.gender, 
          "full_name":partner_data.first_name+" "+partner_data.last_name,
          "user_photo_link":default_user_img_link+partner_data.user_photo,  
          
        },
        };
        
        

        setMatchingPartnerProfileData(matched_data);
        setMatchingPartnerProfileModalOpen(true); 
    }

  }

  //getUserInformationDetails(data);

};


const actionSelectedPartnerId = (partner_id) => {


  setCurrentPartnerId(partner_id);

};


const managePartnerProfileData = (data) => {




  setPartnerProfileData(data);

};



async function fetchData(userData) {
 

  try {
      let user_db_data = await getUserInformationDetails(userData);
      

      setCurrentUserId(userData.user_id); 
      setUserAllImageLink(user_db_data.user_image_url);
      setProfileData(user_db_data.profile_data);
      setProfileImageLink(user_db_data.logged_user_image_url);
      setAdminNotificationData(user_db_data.admin_notification);

      if(user_db_data.friend_list) {  setArchivePartnerList(user_db_data.friend_list);  }

      
      //feedback_list   feedback_pending_data

        if(user_db_data.feedback_pending_data)
        {

          //console.log(user_db_data.feedback_pending_data);
          setUserFeedbackList(user_db_data.feedback_list);
          setUserFeedbackBaseData(user_db_data.feedback_pending_data);
          setOpenFeedback(true);

        //  isUserFeedbackBaseData, setUserFeedbackBaseData


        }
        else
        {
      
      

              if(user_db_data.matching_status_data.matching_status=="Unlock")
              {
        

                    if(user_db_data.matching_partner.status=="success")
                    {

                    
                      if(user_db_data.matching_partner.account_mode!="Unknown")
                      {
                        

                        if(user_db_data.friend_list)
                        { 
                          setAlreadyPartnerUserId(user_db_data.friend_list[0].friend_id);
                        }
            

                        if(user_db_data.matching_partner.data[0])
                        {
                          //console.log(user_db_data.matching_partner.data);
                          managePartnerProfileData(user_db_data.matching_partner.data[0]);

                      

                          actionSelectedPartnerId(user_db_data.matching_partner.data[0].user_id);
                          setPartnerProfileImageLink(user_db_data.user_image_url+user_db_data.matching_partner.data[0].user_photo);
                        }


                      }
                        
                    }

                    
                    showAndHideMatchingModal(user_db_data.user_image_url,user_db_data.matching_status_data,user_db_data.matching_partner);
              } 
              else
              {

                  if(user_db_data.friend_list)
                  { 

                    managePartnerProfileData(user_db_data.friend_list[0]);
                    actionSelectedPartnerId(user_db_data.friend_list[0].friend_id);
                    setAlreadyPartnerUserId(user_db_data.friend_list[0].friend_id);
                    
                    setPartnerProfileImageLink(user_db_data.user_image_url+user_db_data.friend_list[0].user_photo);

                    
                    let active_friend_data={
                      "data":user_db_data.friend_list[0],
                      "matching_status":"lock",
                      "archive_chat_data":user_db_data.archive_chat_data
                    }



                    showAndHideMatchingModal(user_db_data.user_image_url,active_friend_data,"");


                    retriveArchiveChatData(user_db_data.archive_chat_data,user_db_data.friend_list[0].friend_id,userData.user_id);

                  }
              }

        }

      
         
      

       
      

     
      
        
   
       




  } catch (error) {
      console.error('Error fetching user information:', error);
  }
}

const retriveArchiveChatData = (data,partner_id,user_id) => {
 
  const allowedReceiverIds = [partner_id, user_id];
  const filteredMessages = data.filter((message) => allowedReceiverIds.includes(message.receiver_id));

  setArchiveChatData(filteredMessages); 


};



  useEffect(() => {
    
    const userData = getSessionForUsers("login_data");
    
    if(userData)
    {
      
    

        if(userData.first_login!="done")
        {
            navigate('/incomplete')
        }

        if(userData.account_mode==1 || userData.account_mode==2)
        {
          setActiveChat(true);
        }
        else{
          setActiveChat(false);
        }

        setActiveCurrentUserMode(userData.account_mode);
        setActiveItem(userData.account_mode); 

       fetchData(userData);
       
   


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

const setLoginSession = (data) => {

  const userDataString = JSON.stringify(data);
  sessionStorage.setItem('login_data', userDataString);

}

const signOut = (label) => {
  sessionStorage.setItem('login_data',"");
  sessionStorage.clear();
  navigate('/'); 
};






  const NavItem = ({ icon: Icon, label, onClick, active }) => {
    return (
      <div
        onClick={onClick} // Adding the onClick handler here
        className={`flex items-center p-2 rounded-lg cursor-pointer ${active ? 'bg-custom-darkgreen' : 'hover:bg-custom-darkgreen'}`}
      >
        <Icon className="mr-4" />
        <span className={`${active ? 'font-bold' : ''}`}>{label}</span>
      </div>
    );
  };

  return (
    <div className={`flex h-screen text-white transition-opacity bg-black bg-opacity-80`}>
      {/* Sidebar */}
      {/* <aside className="w-1/4 bg-chat-side-nav p-5 flex flex-col justify-between"> */}
      <aside className="w-1/4 bg-chat-side-nav p-5 flex flex-col justify-between border-r border-solid border-black border-opacity-20 shadow-2xl sticky top-0">

        <div>
          <div className="flex mb-8">
            {/* Replace with your logo */}
            <header className="h-16 left-0 right-0 p-4 flex  items-center z-10">
              {/* Logo */}
              <img
                src="/images/fauconnect.svg" // Replace with the path to your logo image
                alt="FAU Logo"
                className="h-16" // Adjust the size as needed
              />
              <div className="w-32 flex item-center font-bold justify-center text-white ">FAUConnect</div>

            </header>
          </div>

          <div className="w-32 font-bold text-white">{isProfileData.first_name} {isProfileData.last_name}</div>
          {/* Main navigation */}
          <nav className="mt-4 space-y-4">
          
            <NavItem icon={FaRegComments} label="Inspiration Chat" onClick={() => handleItemClick(1)} active={activeItem === 1} />
            <NavItem icon={FaRegComments} label="Focus Chat" onClick={() => handleItemClick(2)} active={activeItem === 2} />
            <NavItem icon={FaArchive} label="Archived Chats" onClick={() => handleItemClick(3)} active={activeItem === 3} />
            <NavItem icon={FaBell}  label="Admin Notification" onClick={() => handleItemClick(5)} active={activeItem === 5} />
          </nav>
        </div>

        {/* Settings and Sign Out */}
        <div className='mt-4 space-y-4'>
          <NavItem icon={FaCog} label="Settings" onClick={() => handleItemClick(4)} active={activeItem === 4} />
          <NavItem icon={FaSignOutAlt} onClick={() => signOut()}  label="Sign Out" />
        </div>
      </aside>

      {/* Chat Panel */}
      {/* ... rest of the MainPage component */}
      {/* Chat Panel */}
      <main className="w-3/4 flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/images/pattren.png)' }}>

        <header className="flex items-center justify-between p-5" style={{ background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)' }}>
          {/* Invisible spacer div to balance the logo in the center */}
          <div className="h-16 w-16"></div>

          {/* FAU Connect Logo centered */}
          <div className="flex-grow text-center">
            <img
              src="/images/FAUlogo.svg" // Replace with the path to your logo image
              alt="FAU Logo"
              className="h-4 inline-block" // Adjust the size as needed
            />
          </div>
          
          

          {isActiveChat  && (
            <img onClick={showHideProfile} src={isPartnerProfileImageLink} alt="Profile" className="rounded-full h-14 w-14 smallProfileLogo" />
          )}

        
          {/* Profile Image to the right */}
          
        </header>
 
        
        {isActiveChat ? (
                <div>
                    <Chat 
                        isPartnerProfileData={isPartnerProfileData} 
                        isArchiveChatData={isArchiveChatData} 
                        isCurrentUserId={isCurrentUserId} 
                        isCurrentPartnerId={isCurrentPartnerId} 
                        isUserAllImageLink={isUserAllImageLink} 
                        isProfileData={isProfileData} 
                        isPartnerProfileVisible={isPartnerProfileVisible} 
                        isPartnerProfileVisibleClass={isPartnerProfileVisibleClass}
                    />
                </div>
            ) : (
                activeItem === 3 ? (
                    <div><EmptyArchive isAlreadyPartnerUserId={isAlreadyPartnerUserId} archivePartnerList={isArchivePartnerList}/></div>
                ) : activeItem === 4 ? (
                    <div><Options onAccountModeChange={setAccountModeChange} isProfileImageLink={isProfileImageLink}  isProfileData={isProfileData} /></div>
                ): activeItem === 5 ? (
                  <div><NotificationPage isAdminNotificationData={isAdminNotificationData} isProfileData={isProfileData} isAlreadyPartnerUserId={isAlreadyPartnerUserId} archivePartnerList={isArchivePartnerList}/></div>
              ) : (
                    <div><IdleChat selectedMode={isActiveCurrentUserMode} activeTab={activeItem}/></div>
                )
            )}





       
        

        <MatchingPartnerProfile
                isMatchingPartnerProfileData={isMatchingPartnerProfileData} 
                isMatchingPartnerProfileModalOpen={isMatchingPartnerProfileModalOpen} 
                onChatStatusChange={setChatStatusFunction}
            />
            <LoadingModal isOpen={isLoading} />
            <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />
            <FeedbackModal feedbackList={isUserFeedbackList} baseData={isUserFeedbackBaseData} isOpenFeedback={isOpenFeedback} sendFeedBack={sendFeedBack} onCloseFeedBack={onCloseFeedBack} />
  

        <footer className="p-5 absolut align-bottom text-white text-center text-sm" style={{ background: 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)', position:'fixed', bottom:'0', width:"100%"}}>
            FAQ | Contact | Impressum | AGBs
        </footer>
      </main>
    </div>
  );
};

export default MainPage;
