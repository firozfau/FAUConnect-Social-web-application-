<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Setting extends MY_Controller {

	 
	  
	public function index()
	{
             $load_data=array(
                  "status"=>"request",
                  "side_tab"=>"setting",
                  "side_sub_tab"=>"setting_create_admin",  
                  "message"=>"",
                  "data"=>array(
                      "user_list"=>""
                  ) , 
                  "view_page"=>"create_admin", 
                 
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
        
      
     public function adminList()
    {
         $load_data=array(
              "status"=>"request",
              "side_tab"=>"setting",
              "side_sub_tab"=>"setting_admin_list",  
              "message"=>"",
              "data"=>array(
                  "admin_list"=>""
              ) , 
              "view_page"=>"admin_list", 

            );
 

            $api_data=FRZ::getAdminList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['admin_list']=$api_data['data'];  


        $this->template->load($load_data);
    }  
    
    public function termsCondition()
    {
         $load_data=array(
              "status"=>"request",
              "side_tab"=>"setting",
              "side_sub_tab"=>"setting_terms",  
              "message"=>"",
              "data"=>array(
                  "admin_list"=>""
              ) , 
              "view_page"=>"terms_condition", 

            );
 

            $api_data=FRZ::getAdminList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['admin_list']=$api_data['data'];  


        $this->template->load($load_data);
    }  
    
    
          
     public function ajaxMakeAdmin()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $user_id = $this->input->post('user_id'); 
 
                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendMakeAdminAPI($user_id);
                       
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
    
       public function ajaxDisableAdmin()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $user_id = $this->input->post('user_id'); 
 
                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendDisableAdminAPI($user_id);
                       
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
