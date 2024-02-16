<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analysis extends MY_Controller {

	 
	  
	public function index()
	{
              $load_data=array(
              "status"=>"request",
              "side_tab"=>"analysis",
              "side_sub_tab"=>"analysis",  
              "message"=>"",
              "data"=>array(
                  "data"=>""
              ) , 
              "view_page"=>"data_analysis", 

            );
 
 


          $this->template->load($load_data);
	}
        
        
        
        
        
     
        public function ajaxClientActivityData()
        {
             if($this->input->is_ajax_request()) {




                  try {
                        // Retrieve data from the $_POST array
                        $from_date = $this->input->post('from_date');
                        $to_date = $this->input->post('to_date');
                        
                          //echo "<pre>"; print_r($_POST); exit;
                        $input_data=array(
                            "from_date"=>$from_date,
                            "to_date"=>$to_date,
                        );
                        
                           $api_data=FRZ::clientActivityAPI($input_data);
                           
                           $total_client_data=FRZ::getTotalAccountInfo();
                           
                           if($api_data['status']=="success")
                           {    
                               
                               $api_chart_object=array(
                                   "registraction_acitivity"=>false,
                                   "login_acitivity"=>false,
                                   "total_account_activity"=>false,
                                   "total_active_account_info"=>false,
                               );
                               
                             //  echo "<pre>"; print_r($api_data);exit;
                               
                                $api_chart_object['registraction_acitivity']= Custom::clientRegistrationActivity($api_data['data']['registration_activity'],true);
                                
                                $api_chart_object['login_acitivity']= Custom::clientLoginActivity($api_data['data']['login_activity']);
                                
                                if($total_client_data['status']=="success")
                                {
                                     $all_data_accounts= Custom::getAccountAlldataFormate($total_client_data['data']);
                                     
                                    $api_chart_object['total_active_account_info']=array(
                                        "total_user"=>$all_data_accounts['total_user'],
                                        "current_conversation_users"=>$all_data_accounts['current_conversation_users'],
                                    ); 
                                     
                                 
                                      
                                   $api_chart_object['total_account_activity']=array(
                                        "current_logged_users"=> $all_data_accounts['current_logged_users'], 
                                        "total_not_verified_user"=>$all_data_accounts['total_not_verified_user'],
                                        "total_active_user"=>$all_data_accounts['total_active_user'],
                                        "total_blocked_user"=>$all_data_accounts['total_blocked_user'],  
                                       
                                   );
                                     
                                     
                                }    
                                 
                                 
                                

                                echo json_encode($api_chart_object);

                                 // $this->output->set_content_type('application/json')->set_output(json_encode($api_data));

                           }else{
                              $errorResponse = array('status' => 'error', 'message' => 'Data not found');
                              echo json_encode($errorResponse); 
                           }  

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
        
      
        
        
        
        
    	public function userFeedback()
	{
              $load_data=array(
              "status"=>"request",
              "side_tab"=>"analysis",
              "side_sub_tab"=>"user_feedback",  
              "message"=>"",
              "data"=>array(
                  "data"=>""
              ) , 
              "view_page"=>"user_feedback", 

            );
 
 


          $this->template->load($load_data);
	}    
        
        
        
        public function ajaxUserFeedbackData()
        {
             if($this->input->is_ajax_request()) {




                  try {
                        // Retrieve data from the $_POST array
                        $from_date = $this->input->post('from_date');
                        $to_date = $this->input->post('to_date');
                        
                          //echo "<pre>"; print_r($_POST); exit;
                        $input_data=array(
                            "from_date"=>$from_date,
                            "to_date"=>$to_date,
                        );
                        
                           $api_data=FRZ::userFeebackAlanysisAPI($input_data);
                            
                           if($api_data['status']=="success")
                           {    
                              
                                if($api_data["data"])
                                {
                                   $api_data["data"]=FRZ::feedbackDataModify($api_data["data"]);
                                }
                                    
                         

                                echo json_encode($api_data);

                                 // $this->output->set_content_type('application/json')->set_output(json_encode($api_data));

                           }else{
                              $errorResponse = array('status' => 'error', 'message' => 'Data not found');
                              echo json_encode($errorResponse); 
                           }  

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
        
        
     public function backup()
    {
         
                 $this->load->library('form_validation');

          $load_data=array(
              "status"=>"request",
              "side_tab"=>"analysis",
              "side_sub_tab"=>"analysis_backup",  
              "message"=>"",
              "data"=>array(
                  "data"=>""
              ) , 
              "view_page"=>"data_backup", 

            );
 
          
                $this->form_validation->set_rules('toEmail', 'Email', 'trim|required|min_length[8]|max_length[25]');
                $this->form_validation->set_rules('subject', 'Subject', 'trim|required|max_length[200]');
                $this->form_validation->set_rules('message', 'Message', 'trim|required|max_length[500]');
                
               if(isset($_POST['ccEmail']) && strlen($_POST['ccEmail']) > 1) 
               {
                     $this->form_validation->set_rules('ccEmail', 'cc Email', 'trim|required|min_length[8]|max_length[25]');
                    
                }
                
               

            if ($this->form_validation->run()) 
            { 
            
                       $this->session->set_flashdata('success_message', "Database backup has been successfully completed. Please check your primary email for further details.");

                
            }
 


          $this->template->load($load_data);
    }  
    
    
        
}
