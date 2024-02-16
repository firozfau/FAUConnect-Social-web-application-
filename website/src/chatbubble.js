const ChatBubble = ({ text, sender,sendTime }) => {
    const isSenderMe = sender === 'me';
    return (
      <div className={`max-w-xs mx-2 my-1 p-3 ${isSenderMe ? 'bg-sender-color rounded-[15px_15px_0px_15px]' : 'bg-reciever-color rounded-[15px_15px_15px_0px]'} 
                          ${isSenderMe ? 'ml-auto' : ''}`}>
        <p className={`${isSenderMe ? 'text-gray-800' : 'text-white'}`}>{text}</p>
        <p className={`text-right text-xs ${isSenderMe ? 'text-gray-800' : 'text-white'}`}>sent {sendTime}</p>
      </div>
    );
  }

export default ChatBubble;