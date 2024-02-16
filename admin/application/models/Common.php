<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    
    public function getPostAction($input_data,$api_link)
    {
            $curl = curl_init(); 
            
            curl_setopt($curl, CURLOPT_TIMEOUT, 30);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($input_data));
            curl_setopt($curl, CURLOPT_URL, $api_link);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: '.$this->config->item('api_access_token'), // Add this line
            ));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $response = curl_exec($curl);
            curl_close($curl);

            $result = json_decode($response, true);

            if (!empty($result)) 
            {
                return $result;
                
            } else {
                return false;
            }

    }
    
    private function apiDataProcess($data)
    {
        if($data)
        {
            return $data;
        }    
        else{
            return array(
                "status"=>"failed",
                "data"=>"false"
            );
        }
        
    }

        public function getAdminLoginData($login_data)
    {
         $input_data = array(
            "email" => $login_data['email'],
            "password" => $login_data['password']
        );
         
        $api_link= $this->config->item('api_admin_login_url');
        $api_result= $this->getPostAction($input_data,$api_link);
        
        return $this->apiProcessData($api_result);
        
    }
    
    
}
