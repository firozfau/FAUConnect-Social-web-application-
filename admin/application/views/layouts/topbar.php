<nav class="navbar navbar-expand-lg navbar-light">
        <div class="full">
        <button type="button" id="sidebarCollapse" class="sidebar_toggle"><i class="fa fa-bars"></i></button>
        <div class="logo_section">
            <a href="index.html"><img class="img-responsive" src="<?=base_url('assets/images/logo/logo.svg')?>" alt="#" /></a>
        </div>
        <div class="right_topbar">
            <div class="icon_info">
                <ul>
                    
                    <li><a href="<?= FRZ::urlLink('notification/unread')?>">
                            <i class="fa fa-envelope-o"></i>
                            <?='<span id="total_unread_notification_top" class="badge">'.API::unReadNotificationSession().'</span>'; ?>
                        </a></li>
                </ul>
                <ul class="user_profile_dd">
                    <li>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <img class="img-responsive rounded-circle" src="<?=FRZ::getUserPhotos()?>" alt="#" />
                        <span class="name_user"><?=$_SESSION['last_name']?></span></a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="<?= FRZ::urlLink('profile')?>">My Profile</a>
                        <a class="dropdown-item" href="<?= FRZ::urlLink('logout')?>"><span>Log Out</span> <i class="fa fa-sign-out"></i></a>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </nav>
