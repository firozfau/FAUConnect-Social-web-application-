<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class MY_Controller extends CI_Controller{
	
	function __construct(){
		parent::__construct(); 
                
                  
                define('MY_TIME_START', microtime(true));
                
                if(!isset($_SESSION['login_session_id']))
                {
                    redirect("");
                }    

        
        }

}
