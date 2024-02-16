import React, { useState, useEffect } from 'react';

import LoadingModal from './modal';
import MailModal from './mailModal';
import config from './config';
import MessageModal from './message';


const NotificationPage = (requestInfo) => {

 
const [isAlreadyPartnerUserId, setAlreadyPartnerUserId] = useState(false);
const [currentUserData, setCurrentUserData] = useState(false);
const [isAdminNotificationData, setAdminNotificationData] = useState([]);

const [isLoading, setLoading] = useState(false);
const [isOpenMailModal, setOpenMailModal] = useState(false);
const [message, setMessage] = useState('');
const [isMessageOpen, setMessageOpen] = useState(false);


const closeMessageModal = () => {
  setMessageOpen(false);
  setMessage('');
  };




const openMailModal = (status) => { 

    setOpenMailModal(status);
}


  const closeMailModal = () => {
    setOpenMailModal(false);
  };


  const validationReport = (subject,message) => {
 
       

    let val_subject= (typeof subject === 'string')?subject.replace(/\s/g, ''):'';
    let val_message= (typeof message === 'string')?message.replace(/\s/g, ''):'';
  
    if(val_subject.length<5)
    {
       
        alert("Please mention the subject of the message.[Minimum 5 characters]");
        return false;
    }
    else if(val_message.length<5)
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


  const sendMail = (subject,message) => {
    
    if(validationReport(subject,message))
    {

        let isUserID = currentUserData.user_id;

            setLoading(true); 

            let notificationApi= config.userNotificationAPI+"?user_id="+isUserID+"&title="+subject+"&details="+message+"";
 
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
                            setOpenMailModal(false);

                            setMessage("Your message has been successfully sent to the administrator");
                            
                        }else{
                            setMessage(data.message);
                        } 
            
                        
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



  

  const viewDetails = (notification_id,status, notification_details) => { 


    showErrorMessage(notification_details);
    
    if(status==1)
    {
        

        let notification_data={
            "notification_id": notification_id,
            "status": 2
          };

        fetch(config.updateNotificationStatusApi, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(notification_data),
            })
            .then(response => response.json())
            .then(data => { 
                
                console.log(data.status);
            
    
            })
            .catch(error => {
                
                console.error('Error:', error); 
            
            });





    }

   
}



useEffect(() => {
     
   
    setAlreadyPartnerUserId(requestInfo.isAlreadyPartnerUserId); 
    setCurrentUserData(requestInfo.isProfileData);

 //details

    if(requestInfo)
    {


        if (requestInfo.isAdminNotificationData !== undefined && requestInfo.isAdminNotificationData !== null && requestInfo.isAdminNotificationData !== "") {
            

            if (requestInfo.isAdminNotificationData && requestInfo.isAdminNotificationData.length > 0) {
                setAdminNotificationData(requestInfo.isAdminNotificationData);
            }
            
            
 

        }
        

    }
  

    
      }, [requestInfo]);
    





  return (
      <div className="items-center justify-center mt-0">
          
          {isAdminNotificationData==false && (
          <div className="bg-gradient-to-t from-custom-green shadow-lg text-white flex items-center justify-center w-full h-16"></div>
          )}


          <div className="bg-custom-green flex text-white flex items-center justify-center w-full">
              
              


          {isAdminNotificationData ? (
            

          
            <div class="container mx-auto px-0">
           <button type="button" className={'bg-green-500 text-black text-center rounded my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap bg-green-950/[.70]  text-white active'} onClick={() => openMailModal(true)}>Send mail to admin</button>
         
                      
              
                        <table class="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: '#045E45' }}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Notification-Id</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Notification Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Send Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>



                            <tbody class="bg-white divide-y divide-gray-200">
                                


                            {Array.isArray(isAdminNotificationData) && isAdminNotificationData.map(item => (
                                    <tr key={item.friend_id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.title} </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.send_time}</td>
                                         
                                        <td className="px-6 py-4 whitespace-nowrap text-black">
                                            {item.status ==1? (
                                                <span className="bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs font-bold">Unread</span>
                                            ) : (
                                                <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-bold">Read</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-black">
                                        <button onClick={() => viewDetails(item.id,item.status, item.details )} class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">View Details</button>


                                        </td>
                                    </tr>
                                ))}



                                
                            </tbody>
                        </table>
                    </div>
                    





            ) : (
                <h2 className="text-2xl font-bold mb-2">Currently, there are no Notification</h2>
            )}






          </div>
          <div className="bg-gradient-to-b from-custom-green text-white flex items-center justify-center w-full h-16"></div>


          <LoadingModal isOpen={isLoading} />
         <MailModal isOpen={isOpenMailModal} sendMail={sendMail} onClose={closeMailModal} />
         <MessageModal isOpen={isMessageOpen} message={message} onClose={closeMessageModal} />

      </div>)
}

export default NotificationPage;
