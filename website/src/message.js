import React from 'react';

const MessageModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 99999}} >
      <div className="text-white text-lg p-4 bg-gray-800 text-center rounded" >
       
      <div className='text-left' dangerouslySetInnerHTML={{ __html: message }} />


        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
