import React, { useState,useEffect } from 'react';

const IdleChat = (requestInfo) => {
 
    const [isCurrentSelectedMode, setCurrentSelectedMode] = useState('');
 

  const selectedModeName = {
    1: 'Currently, There are no Inspiration chats',
    2: 'Currently, There are no Focus chats', 
    3: 'Currently, You are in invisible mode (Nobody found you)', 
    4: 'Currently, Your are in Vacation mode (Not allowed for a matched)', 
    // Add more mappings as needed
  };



  useEffect(() => {
        
        setCurrentSelectedMode(selectedModeName[1]);

        if((requestInfo.selectedMode==requestInfo.activeTab) || (requestInfo.selectedMode==3 || requestInfo.selectedMode==4))
        {
          setCurrentSelectedMode(selectedModeName[requestInfo.selectedMode])
        }

    


  }, [requestInfo]);        



  return (
    <div className="items-center justify-center mt-20">
    <div className="bg-gradient-to-t from-custom-green shadow-lg text-white flex items-center justify-center w-full h-16"></div>
    <div className="bg-custom-green flex text-white flex items-center justify-center w-full">
        <h2 className="text-2xl font-bold mb-2" >{isCurrentSelectedMode}</h2>
    </div>
    <div className="bg-gradient-to-b from-custom-green text-white flex items-center justify-center w-full h-16"></div>
</div>)
}

export default IdleChat;
