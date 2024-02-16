import React, { useState, useEffect } from 'react';
const MatchingPartnerProfile = ({ isMatchingPartnerProfileData, isMatchingPartnerProfileModalOpen,onChatStatusChange }) => {
  const [isPartnerPhoto, setPartnerPhoto] = useState("/images/profile.png");
  const [isMatchingMessage, setMatchingMessage] = useState("");
  const [isFindPartner, setFindPartner] = useState(false);
  const [isOpenMatchModal, setOpenMatchModal] = useState(false);

  const [isMatchedPartnerName, setMatchedPartnerName] = useState('N/A');

  const closePartnerMatchModal = () => {
    setOpenMatchModal(false);
    onChatStatusChange(false);
  };

  const openPartnerMatchModal = () => {
    setOpenMatchModal(true);
    
  };

  const letsChatStart = () => {
    onChatStatusChange(true);
    setOpenMatchModal(false);
  };

  useEffect(() => {
     
 

    if (isMatchingPartnerProfileData.status) 
    {

     
    

        setMatchedPartnerName(isMatchingPartnerProfileData.data.full_name);
        setFindPartner(true);

    

        setPartnerPhoto(isMatchingPartnerProfileData.data.user_photo_link);
        
    }
    else{
        setFindPartner(false); 
    }

    
    
    

    if(isMatchingPartnerProfileData.data==false || isMatchingPartnerProfileData.data==""){

      setPartnerPhoto("/images/profile.png");

    }

    setMatchingMessage(isMatchingPartnerProfileData.message);
    

    openPartnerMatchModal();

  }, [isMatchingPartnerProfileData, isMatchingPartnerProfileModalOpen]);

  return (
    <div className='ml-20 w-full mt-20' style={{ zIndex: 999}}>
      {isOpenMatchModal && isMatchingPartnerProfileModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-90'>
          <div className="w-[70rem] bg-chat-side-nav text-white shadow-lg p-4 ml-4 mr-4 mt-4 border-2 border-solid border-black border-opacity-20 flex rounded-[80px_15px_15px_15px]">
            <img src={isPartnerPhoto} alt="Profile" className="rounded-full h-36 w-36" />
          

            {isFindPartner && (
              <div className='ml-8'>
                <h3 className="text-2xl font-bold mb-2 "dangerouslySetInnerHTML={{ __html: isMatchingMessage }}></h3>

                <h4><b>Name : </b>{isMatchedPartnerName} </h4>
                <div className="w-fit mb-2 flex ml-5">
                  <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-32 rounded-full focus:outline-none" onClick={letsChatStart}> Let's chat</button>
                </div>
              </div>
            )}

            {!isFindPartner && (
              <div className='ml-8'>
                <h3 className="text-2xl font-bold mb-2 "dangerouslySetInnerHTML={{ __html: isMatchingMessage }}></h3>

                <div className="w-fit mb-2 flex ml-5">
                  <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-32 rounded-full focus:outline-none" onClick={closePartnerMatchModal} > Close </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingPartnerProfile;
