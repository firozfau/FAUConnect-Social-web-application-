<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends MY_Controller {

	 
	  
	public function index()
	{
             $load_data=array(
                  "status"=>"request",
                  "side_tab"=>"",
                  "side_sub_tab"=>"",  
                  "message"=>"",
                  "data"=>array(
                      "user_data"=>false,
                      "udpate_data"=>false,
                  ) , 
                  "view_page"=>"profile", 
                 
                );
            
             
              
               $this->form_validation->set_rules('current_password', 'Current-password', 'trim|required|min_length[5]|max_length[50]');
               $this->form_validation->set_rules('new_password', 'New-password', 'trim|required|min_length[5]|max_length[50]');
               $this->form_validation->set_rules('confirm_password', 'Confirm-password', 'trim|required|min_length[5]|max_length[50]');

               
                if ($this->form_validation->run() and $this->input->method() === 'post') 
                 {

                         $login_data=array(
                             "user_id"=>$_SESSION['user_id'], 
                             "current_password"=>$this->input->post("current_password"),
                             "new_password"=>$this->input->post("new_password"),
                             "confirm_password"=>$this->input->post("confirm_password"),
                             
                         ); 

                          $api_data=FRZ::adminPasswordChange($login_data);

                          //echo "<pre>";print_r($api_data);exit;
                          if($api_data['status']=="success")
                          {
                              $load_data['status']=$api_data['status'];
                              $load_data['message']=$api_data['message'];
                              $load_data['data']['udpate_data']=$api_data['data'];
                          }
                          else{
                              $load_data['status']=$api_data['status'];
                              $load_data['message']=$api_data['message'];
                              $load_data['data']['udpate_data']="";

                          }

                         


                 }
             
             
             
               $load_data['data']['user_data']= FRZ::getUserDetails();
                        
            
            $this->template->load($load_data);
	}
}
