import React, { useState } from 'react';

const LeaveChat = () => {

    return (
        <div className='ml-20 w-full mt-20'>
            <div className="w-[36rem] bg-chat-side-nav text-white shadow-lg p-4 ml-4 mr-4 mt-4 border-2 border-solid border-black border-opacity-20 flex rounded-[80px_15px_15px_15px]">
                <img src="/images/profile.png" alt="Profile" className="rounded-full h-36 w-36" />
                <div className='ml-8'>
                    <h2 className="text-2xl font-bold mb-2">Are you sure you want to leave the chat with Rebecca ?</h2>
                    <div className="w-fit mb-2 flex ml-5">
                        <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-32 rounded-full focus:outline-none">Yes, leave chat</button>
                        <button type="button" className="bg-custom-green shadow-2xl text-white hover:bg-custom-darkgreen hover:text-white mt-6 mx-2 h-10 w-24 rounded-full focus:outline-none">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveChat;