import React, { useState } from 'react';

const WeMet = () => {
    const [feedback, setFeedback] = useState(false);
    const [assistance, setAssistance] = useState(false);
    const [recommendation, setRecommendation] = useState(false);
    const [archive, setArchive] = useState(false);

    const handleFeedback = () => {
        setFeedback(true);
    };

    const handleAssistanceYes = () =>{
        setAssistance(true)
    };
    const handleAssistanceNo = () =>{
        setAssistance(false)
    };
    const handleRecommendationYes = () =>{
        setRecommendation(true)  
    };
    const handleRecommendationNo = () =>{
        setRecommendation(false)  
    };

    const handleArchiveYes = () =>{
        setArchive(true)  
    };
    const handleArchiveNo = () =>{
        setArchive(false)  
    };

    return (
        <div className='ml-20 w-full mt-20'>
            <div className="w-[36rem] bg-chat-side-nav text-white shadow-lg p-4 ml-4 mr-4 mt-4 border-2 border-solid border-black border-opacity-20 flex rounded-[80px_15px_15px_15px]">
                <img src="/images/profile.png" alt="Profile" className="rounded-full h-36 w-36" />
                {!feedback && (<div className='ml-8'>
                <h2 className="text-2xl font-bold mb-2">Did you meet up with Rebecca ?</h2>
                    <div className="w-fit mb-2 flex ml-5">
                        <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-32 rounded-full focus:outline-none" onClick={handleFeedback}>Yes, leave chat</button>
                        <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-24 rounded-full focus:outline-none">Cancel</button>
                    </div>
                </div>)}
                {feedback && (<div className='ml-8 mr-6'>
                <h2 className="text-2xl font-bold mb-4">Did we help you with meeting new people?</h2>
                    <div className="w-fit mb-2 flex ml-5 flex">
                    <button type="button" className={`text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${assistance ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleAssistanceYes}>No</button>
                    <button type="button" className={`ml-4 text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${!assistance ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleAssistanceNo}>Yes</button>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Would you recommend the app?</h2> 
                <div className="w-fit mb-2 flex ml-5 flex">
                    <button type="button" className={`text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${recommendation ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleRecommendationYes}>No</button>
                    <button type="button" className={`ml-4 text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${!recommendation ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleRecommendationNo}>Yes</button>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Do you want to archive the chat to continue chatting?</h2>
                <div className="w-fit mb-2 flex ml-5 flex">
                    <button type="button" className={`text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${archive ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleArchiveYes}>No</button>
                    <button type="button" className={`ml-4 text-black text-center rounded w-20 my-2 mx-1 px-4 py-2 text-sm font-medium shadow-md hover:bg-custom-darkgreen hover:text-white whitespace-nowrap ${!archive ? 'bg-green-950/[.70]  text-white active' : 'bg-reciever-color text-white'}`} onClick={handleArchiveNo}>Yes</button>
                    </div>
                <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white my-6 mx-2 h-10 w-60 rounded-full focus:outline-none" >Sent Feedback</button>
                </div>)}
            </div>
        </div>
    )
}

export default WeMet;