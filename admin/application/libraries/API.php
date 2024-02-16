<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class API{

    public static function ci(){
        $ci =& get_instance();
        return $ci;
    }
    
  public static function postRequest($input_data,$api_link)
    {
            $curl = curl_init(); 
            
            curl_setopt($curl, CURLOPT_TIMEOUT, 30);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($input_data));
            curl_setopt($curl, CURLOPT_URL, $api_link);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: '.self::ci()->config->item('api_access_token'), // Add this line
            ));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $response = curl_exec($curl);
            curl_close($curl);

            $result = json_decode($response, true);

            if (!empty($result)) 
            {
                return $result;
                
            } else {
                return false;
            }

    }

    public static function inLinePostRequest($api_link)  
    {


        $curl = curl_init();

        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([])); // Empty input_data
        curl_setopt($curl, CURLOPT_URL, $api_link);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Authorization: ' . self::ci()->config->item('api_access_token'),
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec($curl);
        curl_close($curl);

        $result = json_decode($response, true);

        if (!empty($result)) {
            return $result;
        } else {
            return false;
        }
    }

 public static function getRequest($api_link) {

       $curl = curl_init();

        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_URL, $api_link);
        curl_setopt($curl, CURLOPT_HTTPGET, 1); // Use GET method
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Authorization: ' . self::ci()->config->item('api_access_token'), // Add this line
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec($curl);
        curl_close($curl);

        $result = json_decode($response, true);

        if (!empty($result)) {
            return $result;
        } else {
            return false;
        }



    }

       public static function unReadNotificationSession($total_unread_data=false){
           
           if($total_unread_data)
           {
                $_SESSION['total_user_unread_notification']=$total_unread_data;
                
                return $total_unread_data;
                   
           }
           else{
               
               
                        
                   if (isset($_SESSION['total_user_unread_notification'])) 
                    {
                        // Key is set, you can access its value
                        $unreadNotifications = $_SESSION['total_user_unread_notification'];
                        return $unreadNotifications;
                    } else {
                        $_SESSION['total_user_unread_notification']=0;
                        
                        return 0;
                    }

           }
           
          

       }
  
    
   public static function setLoginSession($data){
       
       $the_session = array( 
           "login_session_id"=>$data['login_session_id'],
           "user_id"=>$data['user_id'],
           "first_name"=>$data['login_data']["first_name"],
           "last_name"=>$data['login_data']["last_name"],
           "gender"=>$data['login_data']["gender"],
           "email"=>$data['login_data']["email"],
           "user_photo"=>$data['login_data']["user_photo"], 
           "created_at"=>$data['login_data']["created_at"],
           "user_photo_link"=>"",   
           "total_user_unread_notification"=>"",
           "attached_file_location"=>"",
       );
       self::ci() -> session -> set_userdata($the_session);
       
       return true;
       
   }
   
   public static function destroyLoginSession(){
       
       $the_session = array( 
           "login_session_id"=>"",
           "user_id"=>"",
           "first_name"=>"",
           "last_name"=>"",
           "gender"=>"",
           "email"=>"",
           "user_photo"=>"", 
           "user_photo_link"=>"", 
           "total_user_unread_notification"=>"",
           "attached_file_location"=>"",
           "created_at"=>"",
       ); 
       self::ci() ->session->unset_userdata($the_session);
       self::ci() ->session->sess_destroy();

        self::ci() -> session -> set_userdata(array("login_session_id"=>""));
       return true;
       
   }
    
   public static function adminLogout(){
       
     // self::destroyLoginSession();
       
       if(isset($_SESSION['login_session_id']))
        {
           $input_data=array(
               "login_session_id"=>$_SESSION['login_session_id']
           );
           
            $api_data=API::postRequest($input_data, self::ci()->config->item('admin_login_out_api'));
            
        // echo "<pre>"; print_r($api_data);exit;
            
            if($api_data)
            {
                if($api_data['status']=="success")
                {
                    self::destroyLoginSession();
                    
                    return true;

                }
                else {
                    return false;
                }
                
            }
            else {
                return false;
            }
           
        } 
        else{
            redirect("");
        }
   }
    
   
   
   public static function getUserPhotots(){
       
     
       
       if(isset($_SESSION['login_session_id']))
        {
            $user_photo_link=self::ci()->config->item('user_photo_link');
            if($user_photo_link!="" or $_SESSION['user_photo_link']!="")
            {
             
                return ($user_photo_link)?$user_photo_link:$_SESSION['user_photo_link'];
            }
            else
            {   
           
                $user_photo_link=self::ci()->config->item('admin_base_url')."userPhoto";

                $api_data=API::getRequest($user_photo_link);

                if($api_data)
                {
                    if($api_data['status']=="success")
                    {
                        $user_photo_link=$api_data['user_photo_link'];

                        $_SESSION['user_photo_link']=$user_photo_link;
                        self::ci()->config->item('user_photo_link',$user_photo_link);
                        return $user_photo_link;
                    }
                    else {
                        return false;
                    }

                }
                else {
                    return false;
                }
            }   
           
        } 
        else{
            redirect("");
        }
   }
    
   
   public static function getTotalUserUnreadNotification(){
       
     
       
       if(isset($_SESSION['login_session_id']))
        {

                $get_total_user_unread_notification_api=self::ci()->config->item('get_total_user_unread_notification_api');

                $api_data=API::getRequest($get_total_user_unread_notification_api);

                if($api_data)
                {
                    if($api_data['status']=="success")
                    {
                       
                        
                        $data=$api_data['data'];
                        $decoded_data = json_decode($data);
                        API::unReadNotificationSession($decoded_data->data->total) ;
                         
                         $_SESSION['attached_file_location']=$api_data['attached_file_location'];
                    }

                }
              
           
        } 
        else{
            redirect("");
        }
   }
    
}
