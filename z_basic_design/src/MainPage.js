import React from 'react';
import { FaRegComments, FaArchive, FaCog, FaHome, FaSignOutAlt } from 'react-icons/fa'; // Make sure to install react-icons
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  const navigate = useNavigate();

 
  const navigateToSettingPage = () => {
    navigate('/setting');
  };

  const NavItem = ({ icon: Icon, label, onClick, active }) => {
    return (
      <div 
        onClick={onClick} // Adding the onClick handler here
        className={`flex items-center p-2 rounded-lg cursor-pointer ${active ? 'bg-green-700' : 'hover:bg-green-700'}`}
      >
        <Icon className="mr-4" />
        <span className={`${active ? 'font-bold' : ''}`}>{label}</span>
      </div>
    );
  };
  
  return (
    <div className="flex h-screen  text-white">
      {/* Sidebar */}
      {/* <aside className="w-1/4 bg-chat-side-nav p-5 flex flex-col justify-between"> */}
      <aside className="w-1/4 bg-chat-side-nav p-5 flex flex-col justify-between border-r border-gray-200">

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
                 <div className="w-32 flex item-center font-bold justify-center text-white ">Overview</div>

            </header>
        </div>

          <div className="w-32 font-bold text-white">Overview</div>
          {/* Main navigation */}
          <nav className="mt-4 space-y-4">
            <NavItem icon={FaRegComments} label="Current Chats" />
            <NavItem icon={FaRegComments} label="Focus Chat" active />
            <NavItem icon={FaRegComments} label="Inspiration Chat" />
            <NavItem icon={FaArchive} label="Archived Chats" />
          </nav>
        </div>

        {/* Settings and Sign Out */}
        <div className='mt-4 space-y-4'> 
          <NavItem icon={FaCog} onClick={navigateToSettingPage} label="Settings" />

          <NavItem icon={FaSignOutAlt} label="Sign Out" />
        </div>
      </aside>

      {/* Chat Panel */}
      {/* ... rest of the MainPage component */}
       {/* Chat Panel */}
        <main className="w-3/4 flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/images/pattren.png)'}}>
        
        <header className="flex items-center justify-between p-5 border-b border-gray-200" style={{ background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)' }}>
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

        {/* Profile Image to the right */}
        <div>
            <img src="/images/profile.png" alt="Profile" className="rounded-full h-16 w-16" />
        </div>
        </header>


        <div className="flex-1 p-5 overflow-auto">
          {/* Sample chat bubbles */}
          <ChatBubble text="Hey how are you?" sender="other" />
          <ChatBubble text="Fine, and you?" sender="me" />
          {/* ... additional chat bubbles */}
        </div>

        {/* <div className="p-5">
          <input type="text" placeholder="Enter a message..." className="w-2/3 p-4 rounded-full" />
        </div> */}

        {/* <div className="p-5 relative">
        <input type="text" placeholder="Enter a message..." className="w-2/3 p-4 rounded-full" />
        <img 
            src="./images/send.png" 
            alt="Logo"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6" // Adjust size and position as needed
        />
        </div> */}

        <div className="p-1 relative rounded-full bg-white m-4">
        <input 
            type="text" 
            placeholder="Enter a message..." 
            className="w-2/3 p-4 rounded-full" // Increased right padding to accommodate the logo
        />
        <img 
            src="./images/send.png" 
            alt="Send"
            className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6" // Adjust size and position as needed
        />
        </div>

        
        <footer className="p-5  text-white text-center text-sm" style={{ background: 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)' }}>
          FAQ | Contact | Impressum | AGBs
        </footer>
      </main>
      
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active }) => {
  return (
    <div className={`flex items-center p-2 rounded-lg cursor-pointer ${active ? 'bg-green-700' : 'hover:bg-green-700'}`}>
      <Icon className="mr-4" />
      <span className={`${active ? 'font-bold' : ''}`}>{label}</span>
    </div>
  );
};

// const ChatBubble = ({ text, sender }) => {
//     const isSenderMe = sender === 'me';
//     return (
//       <div className={`max-w-xs mx-2 my-1 p-3 rounded-lg ${isSenderMe ? 'bg-sender-color' : 'bg-reciever-color'} 
//                     ${isSenderMe ? 'ml-auto' : ''}`}>
//         <p className={`${isSenderMe ? 'text-gray-800' : 'text-white'}`}>{text}</p>
//         <p className={`text-right text-xs ${isSenderMe ? 'text-gray-800' : 'text-white'}`}>sent 13:34</p>
//       </div>
//     );
//   };

const ChatBubble = ({ text, sender }) => {
    const isSenderMe = sender === 'me';
    return (
      <div className={`max-w-xs mx-2 my-1 p-3 rounded-lg ring ring-white ${isSenderMe ? 'bg-sender-color' : 'bg-reciever-color'} 
                        ${isSenderMe ? 'ml-auto' : ''}`}>
            <p className={`${isSenderMe ? 'text-gray-800' : 'text-white'}`}>{text}</p>
            <p className={`text-right text-xs ${isSenderMe ? 'text-gray-800' : 'text-white'}`}>sent 13:34</p>
        </div>
    );
};


export default MainPage;
