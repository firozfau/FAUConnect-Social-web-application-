<div class="sidebar_blog_1 side_bar_box">
                <div class="sidebar-header">
                    <div class="logo_section">
                    <a href="<?= FRZ::urlLink('dashboard')?>"><img class="logo_icon img-responsive" src="<?=base_url('assets/images/logo/logo_icon.svg')?>" alt="#" /></a>
                    </div>
                </div>
                <div class="sidebar_user_info">
                    <div class="icon_setting"></div>
                    <div class="user_profle_side">
                        <div class="user_img"><img class="img-responsive" src="<?=FRZ::getUserPhotos()?>" alt="#" /></div>
                    <div class="user_info">
                        <h6><?=$_SESSION['last_name']?></h6>
                        <p><span class="online_animation"></span> Online</p>
                    </div>
                    </div>
                </div>
            </div>
            <div class="sidebar_blog_2 side_bar_box">
                <h4 class=""><a  href="<?= FRZ::urlLink('dashboard')?>" class="white_color"> <i class=" fa fa-dashboard"></i> Dashboard </a></h4>
                <ul class="list-unstyled components">


                    <li class="<?= FRZ::activeSideMenu('setting',$side_tab)?>">
                        <a href="#setting" data-toggle="collapse" aria-expanded="<?= (FRZ::activeSideMenu('setting',$side_tab))?'true':'false'?>" class="dropdown-toggle">
                            <i class="fa fa-gears blue2_color"></i> 
                            <span>Setting</span>
                        </a>
                        <ul class="collapse list-unstyled <?= (FRZ::activeSideMenu('setting',$side_tab))?' show':''?>" id="setting">
                            <li class="<?= FRZ::activeSideSubMenu('setting_create_admin',$side_sub_tab)?>" ><a href="<?= FRZ::urlLink('setting')?>">> <span>Create Admin</span></a></li>
                                <li class="<?= FRZ::activeSideSubMenu('setting_admin_list',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('setting/adminList')?>">> <span>Admin List</span></a></li>
                                <li class="<?= FRZ::activeSideSubMenu('setting_terms',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('setting/termsCondition')?>">> <span>Terms and Condition</span></a></li>
                        </ul>
                    </li> 

                    <li class="<?= FRZ::activeSideMenu('support',$side_tab)?>">
                        <a href="#support" data-toggle="collapse" aria-expanded="<?= (FRZ::activeSideMenu('support',$side_tab))?'true':'false'?>" class="dropdown-toggle">
                            
                            <img class="user_support" src="<?=base_url('assets/images/icon/support.png')?>"> <span>Support</span></a>
                            
                        <ul class="collapse list-unstyled <?= (FRZ::activeSideMenu('support',$side_tab))?' show':''?>" id="support">
                             <li class="<?= FRZ::activeSideSubMenu('support_find_user',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('support/findUser')?>">> <span>Find user</span></a></li>
                            
                            <li class="<?= FRZ::activeSideSubMenu('support_active_account',$side_sub_tab)?>" ><a href="<?= FRZ::urlLink('support/activeAccountList')?>">> <span>Active Accounts</span></a></li>

                            <li class="<?= FRZ::activeSideSubMenu('support_block_account',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('support')?>">> <span>Block account list</span></a></li>
                        </ul>
                    </li>
                    
                    <li class="<?= FRZ::activeSideSubMenu('all_notification',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('notification/all')?>"><i class="fa fa-bullhorn red_color"></i> <span>All Notification </span></a></li>
                    <li class="<?= FRZ::activeSideSubMenu('notification',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('notification')?>"><i  class="fa fa-bullhorn yellow_color"></i> <span>Notification send</span></a></li>

                    <li class="<?= FRZ::activeSideSubMenu('analysis',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('analysis')?>"><i class="fa fa-bar-chart-o green_color"></i> <span>Data analysis</span></a></li>
                    <li class="<?= FRZ::activeSideSubMenu('user_feedback',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('analysis/userFeedback')?>"><i class="fa fa-comments-o" aria-hidden="true"></i> <span>User feedback</span></a></li>

                    <li class="<?= FRZ::activeSideSubMenu('analysis_backup',$side_sub_tab)?>"><a href="<?= FRZ::urlLink('analysis/backup')?>"><i class="fa fa-database orange_color"></i> <span>Data backup</span></a></li>
                    
                </ul>
            </div>