<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class FRZ{

    public static function ci(){
        $ci =& get_instance();
        return $ci;
    }
    
 
 public static function getEmailsStatusList($id=false){
      
     $data=array(
         "reset"=>"None",
          "2"=>"Read",
          "1"=>"Unread",
          "fav"=>"Favorite", 
     );
     
     if($id){
         
         return $data[$id];
         
     }else{
         return $data;
     }
 }   
    
 public static function urlLink($sub_url=false){
     if($sub_url)
     {
         return self::ci()->config->item('base_url')."".$sub_url;
         
     }
     else{
         return self::ci()->config->item('base_url');
     }
      
     
 }
 
  public static function redirect($sub_url=false){
     if($sub_url)
     {
         redirect(self::ci()->config->item('base_url')."".$sub_url);
         
     }
     else{
         redirect(self::ci()->config->item('base_url')."dashboard");
     }
      
     
 }
 
    
  public static function adminLogin($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
           // $input_object = (object) $input_data;
            $input_object =  $input_data;

      
         $api_data=API::postRequest($input_object, self::ci()->config->item('admin_login_api'));
         
         //echo "<pre>"; print_r($input_data);print_r($api_data);exit;
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 API::setLoginSession($api_data['data']);
                 API::getUserPhotots();
                 API::getTotalUserUnreadNotification();
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
      public static function adminPasswordChange($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::postRequest($input_data, self::ci()->config->item('admin_password_change_api'));
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    public static function getGender($index=false){
        
        $data=array(
            "1"=>"Male",
            "2"=>"Female",
            "3"=>"Others"
        );
        
        if($index)
        {
            return $data[$index];
        }   
        else{
            return $data;
        }
        
        
    }
    
       public static function getDepartment($index=false){
        
        $data=array(
            "1"=>"Scientific",
            "2"=>"Non-Scientific", 
        );
        
        if($index)
        {
            return $data[$index];
        }   
        else{
            return $data;
        }
        
        
    }
    
      public static function findUsers($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::postRequest($input_data, self::ci()->config->item('admin_find_users_api'));
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    public static function getAdminList()
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::getRequest(self::ci()->config->item('admin_list_api'));
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    public static function getBlockAccountList()
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::getRequest(self::ci()->config->item('block_account_list_api'));
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    public static function getActiveAccountList()
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::getRequest(self::ci()->config->item('active_account_list_api'));
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
     

   
    public static function getAllNotification($api_input)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_input_obj=(object)$api_input;
         $api_data=API::postRequest($api_input_obj, self::ci()->config->item('get_user_all_notification_list_api')); 
         
         //echo "<pre>";print_r($api_data);exit;
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }

public static function getUserPhotos($user_photo=false){
    
            $user_photo=($user_photo)?:$_SESSION['user_photo'];
    
    
     $user_photo_link=self::ci()->config->item('user_photo_link');
    if($user_photo_link!="" or $_SESSION['user_photo_link']!="")
    {
        $user_photo_link=($user_photo_link)?$user_photo_link:$_SESSION['user_photo_link'];

        return $user_photo_link."/".$user_photo;
    }
    else{
        return false;
    }
}

public static function getUserDetails($user_id=false){
    
    $user_id=($user_id)?$user_id:$_SESSION['user_id'];
    $api_link=self::ci()->config->item('admin_base_url')."userBasicInformation/".$user_id;
    
     $api_data=API::getRequest($api_link); 
    
     
     if($api_data)
    {
        if($api_data['status']=="success")
        {
            return $api_data['data'];
        }
        else {
            return false;
        }

    }
    else {
        return false;
    }
     
}

public static function showLineErrorMessage($status,$index,$data,$title_mgs=false){
    
    if($status=="error")
    {   
            if(isset($data))
            {
                if(isset($data[$index]))
                {
                       if(array_key_exists($index, $data))
                        {
                           return '<i class="error_field">'.$data[$index].'</i>';

                        }
                        else{
                            return "";
                        }


                } 
                else{
                    return "";
                }



            }
            else{
                return "";
            }
    }
    else{
        return ($title_mgs)?"<p class='success_field'>".$data."</p>":"";
    }
    
}
    
public static function activeSideMenu($current_side_tab,$requested_side_tab){
    
    if($current_side_tab==$requested_side_tab)
    {
        return " active";
    }  
    else{
        return "";
    } 
} 
public static function activeSideSubMenu($current_side_sub_tab,$requested_side_sub_tab){
    
    if($current_side_sub_tab==$requested_side_sub_tab)
    {
        return "sub_active";
    }  
    else{
        return "";
    } 
} 
    



    public static function getUserUnreadNotificationList()
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::getRequest(self::ci()->config->item('get_user_unread_notification_list_api')); 
       //echo "<pre>";  print_r($api_data);exit;
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    public static function getDifferentTimeDetails($from_date){
        
         // Create DateTime objects for the two dates
        $fromDateTime = new DateTime($from_date);
        $toDateTime = new DateTime();

        // Calculate the difference
        $interval = $fromDateTime->diff($toDateTime);

        // Access the difference in various units
        $years = $interval->y;
        $months = $interval->m;
        $days = $interval->d;
        $hours = $interval->h;
        $minutes = $interval->i;
        $seconds = $interval->s;

        // Return the difference in an associative array
        /*return [
            'years' => $years,
            'months' => $months,
            'days' => $days,
            'hours' => $hours,
            'minutes' => $minutes,
            'seconds' => $seconds,
        ];*/
        
        if($years>=1)
        {
            return $days."-".$months."-".$years;
        }
        else if($months>=1 and $years<=0)
        {
            
            if($months>1)
            {
                
                 return $months." Months";
            }else{
                
                 return $months." Month";
            }
           
        }
         else if($days>=1 and $months<=0 and $years<=0)
        {
            
            if($days>1){
                
                 return $days." Days";
            }else{
                
                 return $days." Day";
            }
           
        }
         else if($hours>=1 and $days<=0 and $months<=0 and $years<=0)
        {
            
            if($hours>1){
                
                 return $hours." Hours";
            }else{
                
                 return $hours." Hour";
            }
           
        }
         else if($minutes>=1 and $hours>=0 and $days<=0 and $months<=0 and $years<=0)
        {
            
            if($minutes>1){
                
                 return $minutes." Minutes";
            }else{
                
                 return $minutes." Minute";
            }
           
        }
         else if($seconds>=1 and $minutes>=0 and $hours>=0 and $days<=0 and $months<=0 and $years<=0)
        {
            
            if($seconds>1){
                
                 return $seconds." Seconds";
            }else{
                
                 return $seconds." Second";
            }
           
        }
        
        
    }
    
    
    
    
    
    public static function updateNotificationStatus($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
      
        $api_input_data=(object)$input_data;
      
         $api_data=API::postRequest($api_input_data, self::ci()->config->item('update_notification_status_api')); 
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
               
                 API::unReadNotificationSession($api_data['data']['total']) ;
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
        
    public static function sendMakeAdminAPI($user_id)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
        $inline_api_url=self::ci()->config->item('make_admin_api')."?user_id=" . urlencode($user_id);
         
         $api_data=API::inLinePostRequest($inline_api_url);  
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    public static function sendDisableAdminAPI($user_id)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
        $inline_api_url=self::ci()->config->item('disable_admin_api')."?user_id=" . urlencode($user_id);
         
         $api_data=API::inLinePostRequest($inline_api_url);   
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    public static function sendActiveAccountAPI($user_id)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
        $inline_api_url=self::ci()->config->item('unblock_account_api')."?user_id=" . urlencode($user_id);
         
         $api_data=API::inLinePostRequest($inline_api_url);   
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    public static function sendBlockAccountAPI($user_id,$block_reason)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
        $inline_api_url=self::ci()->config->item('block_account_api')."?user_id=" . urlencode($user_id)."&&block_reason=" . urlencode($block_reason);
         
         $api_data=API::inLinePostRequest($inline_api_url);   
         //echo "<pre>"; echo $user_id; print_r($api_data);exit;
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    public static function sendNewPasswordAPI($user_id)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
        $inline_api_url=self::ci()->config->item('send_new_password_api')."?user_id=" . urlencode($user_id);
         
         $api_data=API::inLinePostRequest($inline_api_url);  
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    
    public static function userNotificationReplied($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
      
        $api_input_data=(object)$input_data; 
      
         $api_data=API::postRequest($api_input_data, self::ci()->config->item('user_notification_replied_api'));
         
        
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
                 API::unReadNotificationSession($api_data['data']['total']) ;
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    
    public static function sendUserNotificationByAdmin($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
      
        $api_input_data=(object)$input_data; 
      
         $api_data=API::postRequest($api_input_data, self::ci()->config->item('send_user_notificaiton_byadmin_api'));
         
        
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
 
    public static function getTotaNotificationlInfo($mail_list){
        
        $return_data= array(
                "status"=>"no-data",
                "total_record"=>0,
                "record"=>0,
                "start"=>0,
                "range"=>50,
            );
        
         if($mail_list['status']=="success")
        {   
                if($mail_list['data'])
                {
                    
                     $all_object=$mail_list['data']['data'];
          
         
                    if($all_object)
                    { 
                        
                        
                        $return_data= array(
                            "status"=>"success", 
                            "record"=>count($all_object),
                            "total_record"=>$mail_list['data']['total'],
                            "start"=>($mail_list['data']['start']==0)?"1":$mail_list['data']['start'],
                            "range"=>$mail_list['data']['range'],
                        );
                            
                       return $return_data; 
                        
                    }
                    else{
                        return $return_data;
                    }
                } 
                else
                {
                  return $return_data;  
                }
                
                
        }
        else{
            return $return_data;
        }
    }
    
    
     public static function clientActivityAPI($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
      
       $api_input_data=(object)$input_data; 
      
       $api_data=API::postRequest($api_input_data, self::ci()->config->item('client_activity_api'));
            
         
         if($api_data)
         {
             //print_r($api_input_data);
             //exit;
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
      public static function getTotalAccountInfo()
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        );
      
         $api_data=API::getRequest(self::ci()->config->item('total_client_info')); 
       //echo "<pre>";  print_r($api_data);exit;
         
         if($api_data)
         {
             if($api_data['status']=="success")
             {
              
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
    
    
     public static function userFeebackAlanysisAPI($input_data)
    { 
      $response=array(
            "status"=>"error",
            "message"=>"Something is wrong! Please try again.",
            "data"=>"false"
        ); 
       
      
       $api_input_data=(object)$input_data; 
      
       $api_data=API::postRequest($api_input_data, self::ci()->config->item('feedback_analysis_data'));
            
         
         if($api_data)
         {
             if($api_data['status']=="success")
             { 
                 
                 return $api_data;
             }
             else{
                  
                 $response['message']=$api_data['message'];
                 return $response;
             }
         }
         else{
             return $response;
         }

    }
    
  
  
      public static function isFeedbackList($id){

        $questions = array(
                    1 => "Was your last conversation helpful for you?",
                    2 => "Did you encounter any inappropriate or violent content during our recent interaction?",
                    3 => "Was your last conversation engaging, with active communication?",
                    4 => "Would you like to continue the conversation with the same partner from your last interaction?",
                    5 => "Did you encounter any technical issues during the conversation?",
                    6 => "Are you satisfied with the FAUConnect app?",
                    7 => "Would you recommend the FAUConnect app?"
                );

                if(isset($questions[$id]))
                {
                    return $questions[$id];
                }  
                else{
                    return "N/A";
                }
         

    } 
    
    
    public static function feedbackDataModify($data){

        $main_data="";
        
        
       foreach($data as $key=>$val){
           
            
                   
                   if($val['feedback'])
                   {
                       $feedback_data=(array)json_decode($val['feedback']);
                       
                       foreach($feedback_data as $index=>$obj)
                       {
                          $user_id= $val['user_id'];
                          $friend_id= $val['friend_id'];
                          $feedback_date= $val['feedback_date'];
                          $question= self::isFeedbackList($obj->id); 
                          $status=($obj->status==1)?"Yes":"No";
                          $comments= $obj->comments;
                           
                          $row="<tr><td>".$feedback_date."</td><td>".$question."</td><td>".$status."</td><td>".$comments."</td></tr>";
                           
                         $main_data.=$row;
                       }
                      
                       
                   }   
                   
           
           
       }
       
       return $main_data;

    }    
    
    
}
