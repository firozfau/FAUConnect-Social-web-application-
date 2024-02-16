import React, { useState,useEffect } from 'react';

const MailModal = ({ isOpen, sendMail, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const setSubjectAction = (data) => {
    setSubject(data);
  };

  const setMessageAction = (data) => {
    setMessage(data);
  };
  
  useEffect(() => {
      if(isOpen){
        setSubject("");
        setMessage("");
      }

  }, [isOpen]);

  if (!isOpen) return null;




  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition ease-in-out duration-150" aria-label="Close" onClick={onClose}>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="mt-2">
                  <input
                    type="text"
                    id="subject"
                    className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md mb-5 text-gray-700"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubjectAction(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    id="message"
                    rows="4"
                    className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md mb-5 text-gray-700"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessageAction(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 text-white w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base leading-6 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={() => sendMail(subject, message)}
            >
              Send Mail
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailModal;
