
<div class="col-md-2"></div>
    <div class="col-md-12">
    <div class="white_shd full margin_bottom_30">
        <div class="full graph_head">
            <div class="heading1 margin_0">
                <h2>User profile</h2>
                
            </div>
        </div>
        <div class="full price_table padding_infor_info">
            <div class="row">
                <!-- user profile section --> 
                <!-- profile image -->
                <div class="col-lg-12">
                <div class="full dis_flex center_text">
                    <div class="profile_img"><img width="180" class="rounded-circle" src="<?=FRZ::getUserPhotos()?>" alt="#" /></div>
                    <div class="profile_contant">
                        <div class="contact_inner">
                            <h3><?=$_SESSION['first_name']." ".$_SESSION['last_name']?></h3> 
                            <ul class="list-unstyled">
                            <li><i class="fa fa-envelope-o"></i> : <?=$_SESSION['email']?></li>
                             <li><i class="fa fa-mobile-phone"></i> : <?=$data['user_data']['mobile']?></li>
                            </ul>
                        </div>
                        <div>
                            Objective: <?=$data['user_data']['objective']?>
                        </div>
                    </div>
                </div>
                <!-- profile contant section -->
                <div class="full inner_elements margin_top_30">
                    <div class="tab_style2">
                        <div class="tabbar">
                            
                            
                            <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                 <a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#login_information" role="tab" aria-selected="false">Login informatiion</a> 
                                <a class="nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#personal_information" role="tab" aria-selected="true">Personal Information</a>
                               
                            </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                           
                                
                            <div class="tab-pane fade show active" id="login_information" role="tabpanel" aria-labelledby="nav-profile-tab">
                                 <?= FRZ::showLineErrorMessage($status,'',$message,true)?>   
                                <div class="col-md-8">
                                    <form action="" method="post" onsubmit="return validateForm()">
                                        <div class="form-group">
                                            <label for="user_name">User-name:</label>
                                            <input type="text" value="<?=$data['user_data']['email']?>" class="form-control" id="user_name" name="user_name" required readonly="true" disabled="disabled" >
                                            
                                        </div>
                                        <div class="form-group">
                                            <label for="currentPassword">Current Password:</label>
                                            <input min="5" maxlength="50" type="password" class="form-control" id="currentPassword" name="current_password" placeholder="Enter current password" required>
                                         <?php echo form_error('current_password', '<i class="error_field">', '</i>'); ?>
                                         <?= FRZ::showLineErrorMessage($status,'current_password',$message)?>   
                                        </div>
                                        <div class="form-group">
                                            <label for="newPassword">New Password:</label>
                                            <input min="5" maxlength="50" type="text" class="form-control" id="newPassword" name="new_password" placeholder="Enter new password" required>
                                       
                                         <?php echo form_error('new_password', '<i class="error_field">', '</i>'); ?>
                                         <?= FRZ::showLineErrorMessage($status,'new_password',$message)?>   
                                        </div>
                                        <div class="form-group">
                                            <label for="confirmPassword">Confirm Password:</label>
                                            <input min="5" maxlength="50" type="password" class="form-control" id="confirmPassword" name="confirm_password" placeholder="Confirm new password" required>
                                            <small id="passwordMatch" class="form-text text-danger"></small>
                                            
                                            <?php echo form_error('confirm_password', '<i class="error_field">', '</i>'); ?>
                                            <?= FRZ::showLineErrorMessage($status,'confirm_password',$message)?>   
                                        </div>
                                        <button type="submit" class="btn btn-primary">Change Password</button>
                                  </form>
                               </div>     
                            </div>
                                
                              <div class="tab-pane fade " id="personal_information" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div class="msg_list_main">
                                    <ul class="msg_list">
                                        <li> 
                                            <span class="admin_personal_span">
                                                <b>First name:</b> <i><?=$data['user_data']['first_name']?></i>
                                            </span>
                                            <span class="admin_personal_span">
                                                <b>Last name:</b> <i><?=$data['user_data']['last_name']?></i>
                                            </span>
                                        </li>
                                         <li> 
                                            <span class="admin_personal_span">
                                                <b>Email :</b> <i><?=$data['user_data']['email']?></i>
                                            </span>
                                        </li>
                                        
                                        <li> 
                                            <span class="admin_personal_span">
                                                <b>Join-date :</b> <i><?=$data['user_data']['created_at']?></i>
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>   
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end user profile section -->
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2"></div>
    </div>
    <!-- end row -->
  <script>
        function validateForm() {
            var newPassword = document.getElementById('newPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            var passwordMatch = document.getElementById('passwordMatch');

            if (newPassword !== confirmPassword) {
                passwordMatch.textContent = 'Passwords do not match.';
                return false;
            } else {
                passwordMatch.textContent = '';
                return true;
            }
        }
    </script>