// config.js
let fau_domain="http://127.0.0.1:8000/";
let frz_domain="https://www.frzf7.com:8000/";

let connected_domain=frz_domain;


const api = {
    domain_name:"https://mad-fauconnect.aibe.uni-erlangen.de",
    apiAccessToken: 'Bearer Frzf7KnaKMac$EloGenoFire9CUP2mXpilo',
    userRegistrationUrl: connected_domain+'api/userRegistration',
    userLoginUrl: connected_domain+'api/userLogin',
    profileUpdateGPL: connected_domain+'api/profileUpdateGPL',
    profileUpdateInterestList: connected_domain+'api/profileUpdateInterestList',
    profileUpdateSearchingList: connected_domain+'api/profileUpdateSearchingList',
    saveUserPhoto: connected_domain+'api/userPhoto',
    userLogout:connected_domain+'api/logout',
    emailVerificationAPI:connected_domain+'api/userAccountVerification',
    userAdvanceInformationAPI:connected_domain+'api/userAdvanceInformation',
    sendMessageAPI:connected_domain+'api/sendMessage',
    getArchiveMessageAPI:connected_domain+'api/getArchiveMessage',
    setAccountModeAPI:connected_domain+'api/setAccountMode',
    userPasswordChangedAPI:connected_domain+'api/userPasswordChanged',
    userNotificationAPI:connected_domain+'api/userNotification',
    getUserNotificationAPI:connected_domain+'api/userNotification',
    updateNotificationStatusApi:connected_domain+'api/updateNotificationStatus',
    sendFeedbackApi:connected_domain+'api/sendFeedback',
  };
  
  export default api;
