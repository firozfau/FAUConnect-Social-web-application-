import React from 'react';

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 999999999}} >
      <div className="text-white text-lg p-4  rounded">
      <img src={process.env.PUBLIC_URL + '/images/please_wait.gif'} alt="Loading..." />
      </div>
    </div>
  );
};

export default LoadingModal;
