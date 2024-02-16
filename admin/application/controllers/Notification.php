<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Notification extends MY_Controller {

	 
	  
	public function index()
	{
              $load_data=array(
              "status"=>"request",
              "side_tab"=>"notification",
              "side_sub_tab"=>"notification",  
              "message"=>"",
              "data"=>array(
                  "notification_list"=>""
              ) , 
              "view_page"=>"notification", 

            );
 

            $api_data=FRZ::getBlockAccountList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['notification_list']=$api_data['data'];  


          $this->template->load($load_data);
	}
        
        
        
    
     public function ajaxNotificationSendToUsers()
    {
         if($this->input->is_ajax_request()) {
             
             
              
             
              try {
                    // Retrieve data from the $_POST array
                    $title = $this->input->post('title');
                    $message = $this->input->post('message');
                    $receiver_type = $this->input->post('receiver_type');
                    $receiver_email = $this->input->post('receiver_email');
                    $admin_id =$this->session->userdata("user_id");

                     
                     $input_data=array(
                        "title"=>$title,
                        "details"=>$message, 
                        "admin_id"=>$admin_id, 
                        "receiver_type"=>$receiver_type,
                        "receiver_email"=>$receiver_email,   
                    ); 

                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::sendUserNotificationByAdmin($input_data);
                       
                       echo json_encode($api_data);
                       
                    //$this->output->set_content_type('application/json')->set_output(json_encode($api_data));
                    
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
        
      
        
        
     public function unread()
    {
         
         $load_data=array(
              "status"=>"request",
              "side_tab"=>"notification",
              "side_sub_tab"=>"unread_notification",  
              "message"=>"",
              "data"=>array(
                  "mail_list"=>""
              ) , 
              "view_page"=>"unread_notification", 

            );
 

            $api_data=FRZ::getUserUnreadNotificationList();

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['notification_list']=$api_data['data'];  


          $this->template->load($load_data);
    }    
        
    
    
    
    
          
     public function ajaxUpdateNotification()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $notification_id = $this->input->post('notification_id');
                    $status = $this->input->post('status');

                     $input_data=array(
                        "notification_id"=>$notification_id,
                        "status"=>$status,
                    ); 

                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::updateNotificationStatus($input_data);
                       
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
    
    
      
     public function all()
    {
         
         $load_data=array(
              "status"=>"request",
              "side_tab"=>"notification",
              "side_sub_tab"=>"all_notification",  
              "message"=>"",
              "data"=>array(
                  "mail_list"=>""
              ) , 
              "view_page"=>"all_notification", 

            );
 
            $api_input=array(
                 "start"=>0,
                 "range"=>200
            );

            $api_data=FRZ::getAllNotification($api_input);

            $load_data['status']=$api_data['status'];
            $load_data['message']=$api_data['message'];  
            $load_data['data']['mail_list']=$api_data;


          $this->template->load($load_data);
    }  
    
    
     public function ajaxUserNotificationReplied()
    {
         if($this->input->is_ajax_request()) {
             
             
             
             
              try {
                    // Retrieve data from the $_POST array
                    $notification_id = $this->input->post('notification_id');
                    $sender_id = $this->input->post('sender_id');
                    $message = $this->input->post('message');
                    $admin_id =$this->session->userdata("user_id");

                     
                     $input_data=array(
                        "notification_id"=>$notification_id,
                        "sender_id"=>$sender_id,
                        "admin_id"=>$admin_id,
                        "message"=>$message,  
                    ); 

                      //echo "<pre>"; print_r($_POST); exit;

                       $api_data=FRZ::userNotificationReplied($input_data);
                       
                       echo json_encode($api_data);
                       
                    //$this->output->set_content_type('application/json')->set_output(json_encode($api_data));
                    
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
    
    
  public function downloadFile()
{
    $file_name= $this->input->get('file_name');
    $file_url = $_SESSION['attached_file_location']."/".$file_name;

    // Check if the file exists
    
        // Set appropriate headers for file download
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $file_name . '"');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_url));

        // Output the content of the file
        readfile($file_url);
        exit(); // Terminate script after serving the file
    
}



    
    
    public function test(){
        
        $data= FRZ::getDiffrentTimeDetails("2023-12-18T22:05:20");
        print_r($data);
    } 
    
    
     
    
    
}
