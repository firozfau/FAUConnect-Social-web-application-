<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Support extends MY_Controller {

	 
	  
	public function index()
	{
              $load_data=array(
              "status"=>"request",
              "side_tab"=>"support",
              "side_sub_tab"=>"support_block_account",  
              "message"=>"",
              "data"=>array(
                  "block_account_list"=>""
              ) , 
              "view_page"=>"inactive_account_list", 

            );
 

            $api_data=FRZ::getBlockAccountList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['block_account_list']=$api_data['data'];  


          $this->template->load($load_data);
	}
        
        
     
    public function ajaxActiveAccount()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $user_id = $this->input->post('user_id');  
                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendActiveAccountAPI($user_id);
                       
                       echo json_encode($api_data);
                       
                   // $this->output->set_content_type('application/json')->set_output(json_encode($api_data));
                    
                } catch (Exception $e) {
                    // Handle exceptions and send an error JSON response
                    $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
                    echo json_encode($errorResponse);
                }
         }
         else{
             
             $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
             echo json_encode($errorResponse);
         }

            
    }   
        
      
     public function activeAccountList()
    {
         $load_data=array(
              "status"=>"request",
              "side_tab"=>"support",
              "side_sub_tab"=>"support_active_account",  
              "message"=>"",
              "data"=>array(
                  "account_list"=>""
              ) , 
              "view_page"=>"active_account_list", 

            );
 

            $api_data=FRZ::getActiveAccountList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['account_list']=$api_data['data'];  


          $this->template->load($load_data);
    }  
    
    
    public function ajaxBlockAccount()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $user_id = $this->input->post('user_id'); 
                     $block_reason = $this->input->post('block_reason'); 
 
                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendBlockAccountAPI($user_id,$block_reason);
                       
                       echo json_encode($api_data);
                       
                   // $this->output->set_content_type('application/json')->set_output(json_encode($api_data));
                    
                } catch (Exception $e) {
                    // Handle exceptions and send an error JSON response
                    $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
                    echo json_encode($errorResponse);
                }
         }
         else{
             
             $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
             echo json_encode($errorResponse);
         }

            
    }

    
    
    
       public function findUser()
	{
             $load_data=array(
                  "status"=>"request",
                  "side_tab"=>"support",
                  "side_sub_tab"=>"support_find_user",  
                  "message"=>"",
                  "data"=>array(
                      "user_list"=>""
                  ) , 
                  "view_page"=>"support_find_user", 
                 
                );
            
             
              
               $this->form_validation->set_rules('search_data', 'Search keyword', 'trim|required|min_length[3]|max_length[50]'); 

               
                if ($this->form_validation->run() and $this->input->method() === 'post') 
                 {

                         $login_data=array(  
                             "search_data"=>$this->input->post("search_data"),
                             
                         ); 

                          $api_data=FRZ::findUsers($login_data);

                          $load_data['status']=$api_data['status'];
                          $load_data['message']=$api_data['message'];  
                          $load_data['data']['user_list']=$api_data['data'];  
                          
                          
                         // echo "<pre>"; print_r($load_data);exit;

                 }
             
              
                        
            
            $this->template->load($load_data);
	}
        
    

          
     public function ajaxSendNewPassword()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $user_id = $this->input->post('user_id'); 
 
                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendNewPasswordAPI($user_id);
                       
                       echo json_encode($api_data);
                       
                   // $this->output->set_content_type('application/json')->set_output(json_encode($api_data));
                    
                } catch (Exception $e) {
                    // Handle exceptions and send an error JSON response
                    $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
                    echo json_encode($errorResponse);
                }
         }
         else{
             
             $errorResponse = array('status' => 'error', 'message' => 'An error occurred');
             echo json_encode($errorResponse);
         }

            
    }  
            
        
}
