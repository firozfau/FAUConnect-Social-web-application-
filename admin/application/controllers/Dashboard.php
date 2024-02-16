<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MY_Controller {

	 
	  
	public function index()
	{
             $load_data=array(
                  "status"=>"request",
                  "side_tab"=>"",
                  "side_sub_tab"=>"",  
                  "message"=>"",
                  "data"=>array() , 
                  "view_page"=>"dashboard", 
                 
                );
             
             
              $total_client_data=FRZ::getTotalAccountInfo();
           
              if($total_client_data['status']=="success")
                {
                     $load_data['data']['user_short_data']= Custom::getAccountAllDataFormate($total_client_data['data']);
                } 
                
            
            $this->template->load($load_data);
	}
}
