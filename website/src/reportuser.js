import React, { useState,useEffect } from 'react';
import LoadingModal from './modal';
import MessageModal from './message';
import config from './config';
const ReportUser = ({partnerProfile,allImageLink,reportModalStatus}) => {
    
    const [isPartnerUserID, setPartnerUserID] = useState('');
    const [isUserID, setUserID] = useState('');

    const [isDetailsReport, setDetailsReport] = useState('');
    const [isTitleReport, setTitleReport] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isMessageOpen, setMessageOpen] = useState(false);
  
  
    const closeMessageModal = () => {
      setMessageOpen(false);
      setMessage('');
      };

    const cancelReport = (event) => {
        reportModalStatus(false);
    };



    const actionTitleText = (event) => {
        const data = event.target.value;
        setTitleReport(data);
    };

    const actionDetailsText = (event) => {
 
        const data = event.target.value;
        setDetailsReport(data);
         
    };


    const validationReport = (event) => {
 
       

        let val_isTitleReport= (typeof isTitleReport === 'string')?isTitleReport.replace(/\s/g, ''):'';
        let val_isDetailsReport= (typeof isDetailsReport === 'string')?isDetailsReport.replace(/\s/g, ''):'';
      
        if(val_isTitleReport.length<5)
        {
           
            alert("Please mention the title of the report.[Minimum 5 characters]");
            return false;
        }
        else if(val_isDetailsReport.length<5)
        {
          
            alert("Please write in details.");
            return false;
        }
        else{
            return true;
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


    const submitReport = (event) => {

        

        if(validationReport()){

            setLoading(true); 

            let notificationApi= config.userNotificationAPI+"?user_id="+isUserID+"&title="+isTitleReport+"&details="+isDetailsReport+"";
 
            fetch(notificationApi, {
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
                         
                            setDetailsReport('');
                            setTitleReport('')
                            
                        } 
            
                        setMessage(data.message);
                        setMessageOpen(true);
                    
            
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

        
        setPartnerUserID(partnerProfile.friend_id); 
        setUserID(partnerProfile.user_id); 



    }, [partnerProfile,allImageLink,reportModalStatus]);        

    return (
        <div className='ml-20 w-full mt-20'>
            <div className=" bg-chat-side-nav text-white shadow-lg p-4 ml-4 mr-4 mt-4 border-2 border-solid border-black border-opacity-20 flex rounded-[80px_15px_15px_15px]">
                <img src={allImageLink+partnerProfile.user_photo} alt="Profile" className="rounded-full h-36 w-36" />
                <div className='ml-8'>
                    <h2 className="text-2xl font-bold mb-2">{partnerProfile.first_name} {partnerProfile.last_name} ?</h2>
                    
                        <input onChange={actionTitleText} placeholder='Please mention the title of the report.' type='text' className='reportTitle' value={isTitleReport}></input>
                        <textarea onChange={actionDetailsText} placeholder='Write in details ' className='reportTextarea'
                            value={isDetailsReport}
                        />
                    
                    <div className="w-fit mb-2 flex -ml-5">
                        <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-16 pl-10 pr-10 rounded-full focus:outline-none" onClick={submitReport}>Send Report & Leave Chat</button>
                        <button type="button" className="ml-6 bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-16 w-32 rounded-full focus:outline-none" onClick={cancelReport}>Cancel</button>
                    </div>
                </div>
            </div>

            <LoadingModal isOpen={isLoading} />
            <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />
        </div>

        


    )
}

export default ReportUser;