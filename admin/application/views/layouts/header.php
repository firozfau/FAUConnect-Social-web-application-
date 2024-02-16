<!DOCTYPE html>
<html lang="en">
<head>
    <!-- basic -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- mobile metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <!-- site metas -->
    <title>FAUConnectapp</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- site icon -->
    <link rel="icon" href="<?=base_url('assets/images/logo/fevicon.svg')?>" type="image/png" />
    <!-- bootstrap css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/bootstrap.min.css')?>" />
    <!-- site css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/style.css')?>" />
    <!-- responsive css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/responsive.css')?>" />
    <!-- select bootstrap -->
    <link rel="stylesheet" href="<?=base_url('assets/css/bootstrap-select.css')?>" />
    <!-- scrollbar css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/perfect-scrollbar.css')?>" />
    <!-- custom css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/custom.css')?>" />
    <!-- calendar file css -->
    <link rel="stylesheet" href="<?=base_url('assets/css/semantic.min.css')?>" />
    

    
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>


<script src="<?=base_url('assets/js/popper.min.js')?>"></script>
<script src="<?=base_url('assets/js/bootstrap.min.js')?>"></script>
<!-- wow animation -->
<script src="<?=base_url('assets/js/animate.js')?>"></script>
<!-- select country -->
<script src="<?=base_url('assets/js/bootstrap-select.js')?>"></script>
<!-- owl carousel -->
<script src="<?=base_url('assets/js/owl.carousel.js')?>"></script> 
<!-- chart js -->
<script src="<?=base_url('assets/js/Chart.min.js')?>"></script>
<script src="<?=base_url('assets/js/Chart.bundle.min.js')?>"></script>

<!-- nice scrollbar -->
<script src="<?=base_url('assets/js/perfect-scrollbar.min.js')?>"></script>

</head>

<script>
let base_url='<?= base_url()?>';
let ajax_url='<?= base_url()?>';

let authToken ="<?=$this->config->item('api_access_token')?>";

 // Set up headers with authorization
let headers = {
    'Authorization': authToken,
    'Content-Type': 'application/json'
    // Add more headers as needed
};

let total_unread_noitificaiton="<?=API::unReadNotificationSession()?>" ;

let current_class_name='<?=$this->router->fetch_class()?>';

let current_method_name='<?=$this->router->fetch_method()?>';
 

</script>