import config from './config';
export const getUserInformationDetails = (userData) => {
    let user_id = userData.user_id; 
    let api_link = config.userAdvanceInformationAPI;
    const user_details_api_url = `${api_link}/${user_id}`;

    return fetch(user_details_api_url, {
        method: 'GET',  // Change this to GET
        headers: {
            'Authorization': config.apiAccessToken,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {

 

        if (data.status === "success") 
        {
            let db_data = data.data;
            let profile_data = db_data.profile_data;
            let friend_list = db_data.friend_list; 
            let archive_chat_data = db_data.archive_chat_data;
            let matching_partner = db_data.matching_partner;
            let matching_status_data = db_data.matching_status_data;

            let user_image_url = db_data.user_image_url;
            let user_profile_data= JSON.parse(profile_data).data;

            if (matching_status_data.status === "success") {
                matching_status_data = matching_status_data.data; 
            }
            let admin_notification =db_data.admin_notification;
            let feedback_list =db_data.feedback_list;
            let feedback_pending_data =(db_data.feedback_pending_data)?JSON.parse(db_data.feedback_pending_data).data:"";
 
            

            let ajax_data = {
                "profile_data":user_profile_data ,
                "friend_list": (friend_list.data && friend_list.data !== "") ? friend_list.data : false,
                "archive_chat_data": (archive_chat_data !== "") ? archive_chat_data : false,
                "matching_partner": matching_partner,
                "matching_status_data": matching_status_data,
                "admin_notification":admin_notification,
                "feedback_list":feedback_list,
                "feedback_pending_data":feedback_pending_data,
                "user_image_url":user_image_url,
                "logged_user_image_url":user_image_url+user_profile_data.user_photo
                
            };

            return ajax_data;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Returning a rejected promise in case of an error
        return Promise.reject(error);
    });
};
