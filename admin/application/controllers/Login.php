<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	 
    public function __construct(){
        parent::__construct(); 
        
        if(isset($_SESSION['login_session_id']))
        {
            FRZ::redirect();
        } 
    }
	  
    public function index()
    {

         $load_data=array(
              "status"=>"request",
              "message"=>"",
              "view_page"=>"login" , 
              "data"=>""  
            );

             $this->form_validation->set_rules('email', 'Email', 'trim|required|min_length[10]|max_length[50]|valid_email');
             $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[5]|max_length[50]');

           if ($this->form_validation->run() and $this->input->method() === 'post') 
            {

                    $login_data=array(
                        "email"=>$this->input->post("email"),
                        "password"=>$this->input->post("password"),
                    ); 

                     $api_data=FRZ::adminLogin($login_data);
                     
                    // echo "<pre>";print_r($api_data);exit;
                     
                     
                     
                     if($api_data['status']=="success")
                     {
                         FRZ::redirect();
                     }
                     else{
                         $load_data['status']=$api_data['status'];
                         $load_data['message']=$api_data['message'];
                         $load_data['data']=$login_data;

                     }



            }



            $this->load->view($load_data['view_page'],$load_data);
    }
    
}
