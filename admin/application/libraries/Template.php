<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// application/libraries/Template.php

class Template
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
    }

    public function load($data)
    {
        // Load the common header
        $this->CI->load->view('layouts/header', $data);

       
        // Load the dynamic content
        $this->CI->load->view("index", $data);

        // Load the common footer
        $this->CI->load->view('layouts/footer', $data);
    }
}
