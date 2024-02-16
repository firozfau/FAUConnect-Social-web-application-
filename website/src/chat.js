import React, { useState,useEffect} from 'react';
import ChatBubble from './chatbubble';
import ReportUser from './reportuser.js';
import './frz.css';
import config from './config';
import { useNavigate } from 'react-router-dom';

const Chat = ({isPartnerProfileData,isArchiveChatData,isCurrentUserId,isCurrentPartnerId,isUserAllImageLink,isProfileData,isPartnerProfileVisible,isPartnerProfileVisibleClass}) => {

    const navigate = useNavigate();
    const [reportTriggered, setReportTriggered] = useState(false);
 
    const [messageInput, setMessageInput] = useState('');
    const cityCodeToName = {
        1: 'Erlangen',
        2: 'Nürnberg',
        3: 'Bamberg',
        4: 'Fürth',
        // Add more mappings as needed
      };

 
    const [messages, setMessages] = useState([
       // { text: "Hey how are you?", sender: "other",sendTime:"21.33" },
       // { text: "Fine, and you?", sender: "me",sendTime:"20.33" },
      ]);

      const handleInputChange = (event) => {
        setMessageInput(event.target.value);
      };

      const handleReport = (status) => {
        if(status=="report")
        {
            setReportTriggered(prevState => !prevState);
        }else{
 
          setReportTriggered(status);
            
        }
        
        
    };
    


  

    const extractTime24HoursBerlin = (createdAt) => {
        const date = new Date(createdAt);
        const time24Hours = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
          timeZone: 'Europe/Berlin'
        }).format(date);
      
        return time24Hours;
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          sendMessages();
        }
      };
      
      const sendMessages = () => {

        let user_message_data =messageInput;
        let current_time=extractTime24HoursBerlin(new Date());
    
        // Update the messages state to include the new message
        /*
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: user_message_data, sender: "me",sendTime:current_time },
        ]);
        */
        setMessageInput('');

        sendMessageToDatabase(user_message_data);



      };


    const sendMessageToDatabase = (user_message_data) => {
    
        
        let message_data={
            "sender_id": isCurrentUserId,
            "receiver_id": isCurrentPartnerId,
            "message": user_message_data,
            "message_type": 1
          };

          

        fetch(config.sendMessageAPI, {
            method: 'POST',
            headers: {
                'Authorization': config.apiAccessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message_data),
            })
            .then(response => response.json())
            .then(data => { 
                
               
                
                if(data.data.archived_data){
                    
                    instantArchiveLoad(data.data.archived_data);
                }

              

            })
            .catch(error => {
                // Handle errors from the API call 
                console.error('Error:', error); 
               
            });


    };


    const instantArchiveLoad = (data) => {
        
        

        const reversedIsArchiveChatData = data.slice().reverse();
        setMessages((prevMessages) => []);

        reversedIsArchiveChatData.forEach((data, index) => {
           // console.log(`Message ${index + 1}:`, data);


            const message_time = extractTime24HoursBerlin(data.created_at);
           
            let sender_mark= (data.sender_id==isCurrentUserId)?"me":"other";


                setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.message, sender: sender_mark,sendTime:message_time },
                ]);

              


             
          });

      };
    
 

      useEffect(() => {
        

       if(isProfileData.account_mode==1 || isProfileData.account_mode==2)
       {
        
        if(isArchiveChatData)
        { 
             

            instantArchiveLoad(isArchiveChatData); 
        }
        


        // Set up an interval to call instantArchiveLoad every 5 seconds
        const intervalId = setInterval(() => {
        
            getUpdatedArchivedChatData();


        }, 1000);
        //1000

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);

    }


      }, [isCurrentPartnerId,isPartnerProfileVisible,isPartnerProfileData,isArchiveChatData]);        

      

      
 
const getUpdatedArchivedChatData = () => {

    //console.log(isCurrentUserId,"======",isCurrentPartnerId);


    let data= {
        "user_id": isCurrentUserId,
        "friend_id": isCurrentPartnerId,
        "start": 0,
        "range": 100
      }

    fetch(config.getArchiveMessageAPI, {
        method: 'POST',
        headers: {
            'Authorization': config.apiAccessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {

           
                if(data.status="success"){

                    
                    
                        if (data && typeof data.data !== 'undefined') 
                        {
                            if(data.data!=""){
                                instantArchiveLoad(data.data);
                            }
                                
                         }
                    

                }
            
        })
        .catch(error => {
            // Handle errors from the API call
            console.error('Error:', error);
        });




         
 };



    return ( 

            <div className={isPartnerProfileVisible ? "flex flex-auto h-max relative" : ""}>

            {reportTriggered && isPartnerProfileVisible && (<div><ReportUser partnerProfile={isPartnerProfileData} allImageLink={isUserAllImageLink} reportModalStatus={handleReport}/></div>)}


            {!reportTriggered && (
                
                <div className={` ${isPartnerProfileVisibleClass}  flex flex-col mainChatBox`}>    
                    
                    <div className="p-5 flex-grow flex flex-col-reverse overflow-y-auto" id="messageDisplayBox" style={{ maxHeight: '60vh' }}>

                        {/*
                        <ChatBubble text="Hey how are you?" sender="other" />
                        <ChatBubble text="Fine, and you?" sender="me" />
                        */}

                        {messages.slice().reverse().map((message, index) => (
                        <ChatBubble key={index} text={message.text} sender={message.sender} sendTime={message.sendTime} />
                        ))}


                    </div>
                    <div className='flex-none mt-auto w-11/12'>
                        <div className="p-1 rounded-full bg-white mt-auto ml-4 mr-4 relative w-full absolute bottom-2 left-2">
                        
                        <input
                                id="messageinputbox"
                                type="text"
                                placeholder="Enter a message..."
                                className="w-11/12 p-4 rounded-full text-black"
                                value={messageInput}
                                onKeyDown={handleKeyPress}
                                onChange={handleInputChange}
                            />


                            <button class="" onClick={sendMessages}>
                                <img
                                    src="./images/send.png"
                                    alt="Send"
                                    className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6"  /></button>
                        </div></div>
                </div>)}
        
          
            {isPartnerProfileVisible && (
            <div className=' mb-40 absolute right-4'>
                <div className="w-[24rem] bg-chat-side-nav text-white rounded-[80px_0px_58px_0px] shadow-lg p-4 ml-4 mr-4 mt-4 border-2 border-solid border-black border-opacity-20 grid grid-cols-1 gap-4 justify-items-center relative">
                    <img src={isUserAllImageLink+isPartnerProfileData.user_photo} alt="Profile" className="rounded-full h-36 w-36" />
                    <h2 className="text-2xl font-bold mb-2">{isPartnerProfileData.first_name} {isPartnerProfileData.last_name}</h2>
                    <div className="mb-4">
                        <label className="mb-6 text-sm">Gender</label>
                        <div className="flex flex-wrap justify-start max-w-screen-lg mx-auto">

                        <button
                                key={isPartnerProfileData.gender}
                                className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap"
                            >
                                {isPartnerProfileData.gender === 1 ? 'Male' : (isPartnerProfileData.gender === 2 ? 'Female' : 'Diverse')}
                            </button>

                {/*
                        {(Array.isArray(JSON.parse(isProfileData.search_gender)) ? JSON.parse(isProfileData.search_gender) : []).map((gender, index) => (
                            <button
                                key={index}
                                className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap"
                            >
                                {gender === 1 ? 'Male' : (gender === 2 ? 'Female' : 'Diverse')}
                            </button>
                        ))}
                        */}


                
                        </div>
                    </div>
                    <div className="mb-4 w-fit ml-6">
                        <label className="mb-6 text-sm">Preferred City:</label>
                        <div className="flex flex-wrap">

                        {(Array.isArray(JSON.parse(isPartnerProfileData.city_list)) ? JSON.parse(isPartnerProfileData.city_list) : []).map((cityName, index) => (
                            <button
                                key={index}
                                className="bg-green-500 text-black text-center rounded my-2 mx-1 px-8 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap"
                            >
                                {cityCodeToName[cityName]}
                            </button>
                        ))}


                           
                        </div>
                    </div>
                </div>
                {/*   */}
                <div className='flex justify-center items-center mx-auto z-index(-1)'>
                    <button className='bg-reciever-color hover:bg-custom-darkgreen  hover:text-white w-full md:w-52 h-16 border-2 border-solid border-black border-opacity-20 shadow-[2px_8px_26px_#00000000] rounded-[0px_0px_15px_15px]' onClick={() => handleReport('report')}>Send report to admin</button>
                </div>

                
                 
            </div>
            )}
        </div>
    )
}

export default Chat;