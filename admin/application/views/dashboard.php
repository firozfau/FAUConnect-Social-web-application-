<?php 
 $total_users=0;
  $total_active_users=0;
  $total_active_conversation=0;
  $currently_logged_users=0;
  
if(isset($data['user_short_data']))
{
   // print_r($data['user_short_data']['total_user']);exit;
    
    $total_users= $data['user_short_data']['total_user'];
    $total_active_users= $data['user_short_data']['total_active_user'];
    $total_active_conversation= $data['user_short_data']['current_conversation_users'];
    $currently_logged_users= $data['user_short_data']['current_logged_users'];
}    
?>               

<div class="col-md-12">
                     <div class="full counter_section margin_bottom_30">
                           <div class="couter_icon">
                              <div> 
                              <i class="fa fa-user yellow_color"></i>
                              </div>
                           </div>
                           <div class="counter_no">
                              <div>
                              <p class="total_no"><?=$total_users?></p>
                              <p class="head_couter">Total users</p>
                              </div>
                           </div>
                     </div>
                  </div>
                  <div class="col-md-12">
                     <div class="full counter_section margin_bottom_30">
                           <div class="couter_icon">
                              <div> 
                              <i class="fa fa-clock-o blue1_color"></i>
                              </div>
                           </div>
                           <div class="counter_no">
                              <div>
                              <p class="total_no"><?=$total_active_users?></p>
                              <p class="head_couter">Total Active users</p>
                              </div>
                           </div>
                     </div>
                  </div>
                  
                  <div class="col-md-12">
                     <div class="full counter_section margin_bottom_30">
                           <div class="couter_icon">
                              <div> 
                              <i class="fa fa-comments-o red_color"></i>
                              </div>
                           </div>
                           <div class="counter_no">
                              <div>
                              <p class="total_no"><?=$total_active_conversation?></p>
                              <p class="head_couter">Total Actively conversation users</p>
                              </div>
                           </div>
                     </div>
                  </div>

                  <div class="col-md-12">
                     <div class="full counter_section margin_bottom_30">
                           <div class="couter_icon">
                              <div> 
                              <i class="fa fa-group black_color"></i>
                              </div>
                           </div>
                           <div class="counter_no">
                              <div>
                              <p class="total_no"><?=$currently_logged_users?></p>
                              <p class="head_couter">Currently Logged users</p>
                              </div>
                           </div>
                     </div>
                  </div>
