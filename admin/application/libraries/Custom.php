<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Custom{

    public static function ci(){
        $ci =& get_instance();
        return $ci;
    }
    
  
    
   public static function clientRegistrationActivity($registrion_acitivity_data,$ischart=false){
       
            $data=array(
              "account-mode"=>array(
                  "inspiration"=>0,
                  "focus"=>0,  
              ),   
              "gender"=>array(
                  "male"=>0,
                 "female"=>0,
                 "others"=>0 
              ),
             "department"=>array(
                  "scientific"=>0,
                  "non-scientific"=>0, 
              ),
             "profession"=>array(
                  "professor"=>0,
                  "others"=>0, 
              ), 
                
            );
       
            //echo "<pre>"; print_r($registrion_acitivity_data);exit;
            
            foreach($registrion_acitivity_data as $key=>$obj){
                
                if($obj['account_mode']==1)
                {
                    $data['account-mode']['inspiration']+=1;
                }
                else{
                    $data['account-mode']['focus']+=1;
                }
                
                
                if($obj['gender']==1)
                {
                    $data['gender']['male']+=1;
                }
                else{
                    $data['gender']['female']+=1;
                }
                
                
                if($obj['department']==1)
                {
                    $data['department']['scientific']+=1;
                }
                else{
                    $data['department']['non-scientific']+=1;
                }
                
                 if($obj['profession']==1)
                {
                    $data['profession']['professor']+=1;
                }
                else{
                    $data['profession']['others']+=1;
                }
                
                
                
            }
             
            
            if($ischart)
            {
            
                
                 $male_obj=(object)$male=array(
                     "name"=>"Male",
                     "y"=>$data['gender']['male'],
                    "drilldown"=>"Gender" 
                 );
                 
                 $female_obj=(object)$female=array(
                     "name"=>"Female",
                     "y"=>$data['gender']['female'],
                     "drilldown"=>"Gender" 
                 );
                 
                 
                  $scientific_obj=(object)$scientific=array(
                     "name"=>"Scientific",
                     "y"=>$data['department']['scientific'],
                     "drilldown"=>"department"  
                 );
                  
                   $non_scientific_obj=(object)$non_scientific=array(
                     "name"=>"Non-scientific",
                     "y"=>$data['department']['non-scientific'],
                     "drilldown"=>"department"     
                 );
                 
                  
                  $profession_obj=(object)$profession=array(
                     "name"=>"Professor",
                     "y"=>$data['profession']['professor'],
                     "drilldown"=>"profession"   
                 ); 
                  
                  $profession_others_obj=(object)$profession_others=array(
                     "name"=>"Others-profession",
                     "y"=>$data['profession']['others'],
                     "drilldown"=>"profession"     
                      
                 ); 
                       
                
                $chart_data=[$male_obj,$female_obj,$scientific_obj,$non_scientific_obj];
                
                return $chart_data;
                
                
            }else{
               return $data; 
            }
            
              
   } 
   
   
      public static function clientLoginActivity($login_activity_data)
      {
          $total_users_object=array(
              "name"=>"Total users",
              "data"=>array(),
          );
          
          $total_time_speend_object=array(
              "name"=>"Total time Speend",
              "data"=>array(),
          );
           
          
           foreach($login_activity_data as $key=>$obj){
               
               foreach($obj as $index=>$val){
                   
                 
                  $custome_info= Custom::getLoginAcitiveSubCustom($val);
                  
                 
                   
                   $user_obj_cahrt=$user_obj=array(Custom::datComaformate($index),$custome_info['total_users']);
                   $time_obj_cahrt=$time_obj=array(Custom::datComaformate($index),$custome_info['total_minutes']);
                        
                 
                   array_push($total_users_object['data'],$user_obj_cahrt);
                   array_push($total_time_speend_object['data'],$time_obj_cahrt);
                          
                   
               }
               
           }
           
           
           return array(
               "user_data"=>$total_users_object,
               "time_data"=>$total_time_speend_object,
           );
          
      }

public static function datComaformate($param) {
    $timestamp = strtotime($param);
    $convertedDate = date("Y,m,d", $timestamp);

    return $convertedDate; 
}

public static function getLoginAcitiveSubCustom($data){
    
    $total_users=0;
    $total_minutes=0;
    $current_data="";
    
    foreach($data as $key=>$obj)
    {
        
            $total_users+=1;
            $total_minutes+=$obj['total_minutes'];
            $current_data=$obj['total_minutes'];
    }
    
    return array(
        "total_users"=>$total_users,
        "total_minutes"=>$total_minutes,
        "current_data"=>$current_data,
    );
    
}      
    


public static function getAccountAllDataFormate($data)
{
     $not_verified_account=0;
     $active_account=0;
     $block_account=0;
     
     $total_account=0;
    
    
      foreach($data['total_users'] as $key=>$val){
          
          $total_account+=$val['total'];
          
          if($val['account_status']==0)
          {
              $not_verified_account+=$val['total'];
          }    
          else if($val['account_status']==1)
          {
              $active_account+=$val['total'];
          }
          else if($val['account_status']==2)
          {
              $block_account+=$val['total'];
          }
      }
      
      $current_logged_users=(array) json_decode($data['current_logged_users']); 
     $total_current_logged_client=(array)$current_logged_users['data'];
     $current_active_logged= $total_current_logged_client['total_active_client'];
     
     
     $total_conversation_users=(array)json_decode($data['total_conversation_users']);
     $total_conversation_users_object=(array)$total_conversation_users['data'];
     $current_conversation_users= $total_conversation_users_object['total'];
      
      
      return array(
        "current_logged_users"=> $current_active_logged,
        "current_conversation_users"=> $current_conversation_users, 
        "total_user"=>$total_account,
        "total_not_verified_user"=>$not_verified_account,
        "total_active_user"=>$active_account,
        "total_blocked_user"=>$block_account,   
      );
      
}


}
