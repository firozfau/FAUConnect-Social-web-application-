<?php 
 $total_data= FRZ::getTotaNotificationlInfo($mail_list);
 
         
?>

<div class="inbox-body">
    <div class="mail-option">
        <div class="chk-all">
            <div class="btn-group">
            <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown"  href="#" class="btn mini all" aria-expanded="false" id="current_selected_email_type"> All <i class="fa fa-angle-down "></i></a>
            <ul class="dropdown-menu">
                <?php 
                        $email_status_list=FRZ::getEmailsStatusList();
                    foreach($email_status_list as $key=>$val)
                    {
                      echo '<li class="'.$val.' email_type_list">'.$val.'</li>';
                        
                    }
                ?> 
            </ul>
            </div>
        </div>  
        
        <div class="btn-group reloadEmailList">
            <a  href="<?= FRZ::urlLink('notification/all')?>" class="btn mini tooltips">
            <i class=" fa fa-refresh"></i>
            </a> 
        </div>
        <ul class="unstyled inbox-pagination">
            <li><span><?=$total_data['start']?>-<?=$total_data['record']?> of <?=$total_data['total_record']?></span></li>
            <li>
           <a class="np-btn" data-original-title="Refresh" data-placement="top" href="#"><i class="fa fa-angle-left  pagination-left"></i></a>
            </li>
            <li>
            <a class="np-btn" data-original-title="Refresh" data-placement="top" href="#"><i class="fa fa-angle-right pagination-right"></i></a>
            
            </li>
        </ul>
    </div>
    
    <?php 
    
    //echo "<pre>";    print_r($mail_list);
    
     $notification_data=array();
     $total_noitificaiton=0;
     $total_unread_noitificaiton=0;

    
     
    if($mail_list['status']=="success")
    {   
           
        
       if($mail_list['data'])
       {   
    ?>
    
    <table class="table table-inbox table-hover notification_replay_email_list">
        
        <tbody>
            
         <?php 
            $all_object=$mail_list['data']['data'];
          
         
            if($all_object)
            {   
                    
                
            foreach($all_object as $key=>$val){
                
                
            
                $sub_data = (object)[
                        'id' => $val['id'],
                        'title' => $val['title'],
                        'details' => $val['details'],
                        'send_time' => $val['send_time'],
                        'notification_status' => $val['notification_status'],
                        'attached'=>$_SESSION['attached_file_location']."/".$val['attached'],
                        'file_name'=>($val['attached'])?$val['attached']:""
                    ];
                
                $notification_data[$val['id']]=$sub_data;
                
                if($val['status']=="1"){
                    $total_unread_noitificaiton=$total_unread_noitificaiton+1; 
                }
                
                $total_noitificaiton++;
                
                
              
                $notification_status=($val['status']=="1")?"unread":"";
            
         ?>   
          
            <tr is_favorite="<?=$val['is_favorite']?>" class="<?=$notification_status?>" notification_status="<?=$val['notification_status']?>" id="row_<?=$val['id']?>"  notificationid="<?=$val['id']?>">
           
             <td class="inbox-small-cells">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck<?=$val['id']?>">
                    <label class="custom-control-label" for="customCheck<?=$val['id']?>"></label>
                </div>
            </td>
            
            <td class="inbox-small-cells favorite_notification" id="favorite_notification_<?=$val['id']?>" onclick="favoriteNotification('<?=$val['id']?>','<?=$val['is_favorite']?>')">
                <?php 
                    
                 if($val['is_favorite']==1){
                     
                 ?>
                <i class="fa fa-star favorite"></i>
                
                <?php }else{?>

                    <i class="fa fa-star"></i>
                <?php }?>
            </td>
            
            
            <td class="view-message  dont-show"><?=$val['title']?></td>
             <td class=" inbox-small-cells" style="width:100px">
                    
                    <?php 
                    
                        if($val['attached']){
                    ?>
                    
                    <a href="<?= $_SESSION['attached_file_location']."/".$val['attached']?>" target="_blank"><i class="fa fa-paperclip"></i> </a>
                    
                    <?php } ?>
                   
                    
             </td>
             <td  style="width:150px"class=" text-right"><?=FRZ::getDifferentTimeDetails($val['send_time'])?></td>
                
             <td class=" text-right" id="action_button_<?=$val['id']?>">
                 <?php 
                    if($val['status']==3)
                    {
                 ?>
                 <button onclick="replayNotification('<?=$val['id']?>','<?=$val['sender_id']?>')" class="btn btn-secondary">Replied</button>
                 
                <?php }else{ ?>
                  <button onclick="replayNotification('<?=$val['id']?>','<?=$val['sender_id']?>')" class="btn btn-danger">Replay</button>
                

                <?php } ?>
             </td>
            </tr> 

            <?php } 
            
            //$total_unread_noitificaiton
                }else{ ?>
            
            <tr>
                <td colspan="6"> No-message</td>
            </tr>
                
            <?php }?>    
        </tbody>
    </table>
    <?php }}?>
</div>


<?php  
$object_data = (object)$notification_data; 
$this->load->view("modal/replay_email_modal","");

$this->load->view("modal/email_modal","");

$_SESSION['total_user_unread_notification']=$total_unread_noitificaiton;
?>


<style>
    
.email_type_list:hover{ cursor: pointer !important; color: red !important;}
.hideRow{ display: none !important}
</style>
<script>
 $(document).ready(function (){
 total_unread_noitificaiton='<?=$total_unread_noitificaiton?>' ;    
 });
 
 
 let total_noitificaiton ='<?=$total_noitificaiton?>' ;
 

let notification_data=<?= json_encode($object_data)?>;

 



 
    
$(document).on("click",".notification_replay_email_list tbody tr td.view-message",function(){
    
     let notification_object =notification_data;//JSON.parse(notification_data);
    
    let notification_id = $(this).parent("tr").attr("notificationid");  
    
    let attached_link="N/A";
     
    
    if(notification_object[notification_id].file_name!="")
    {
        
        
        if(notification_object[notification_id].file_name.length>1)
        {   
            current_notification_attached_file_name=notification_object[notification_id].file_name;
            attached_link="<a href='#' id='notification_attached_file'>Download File</a>"; 
            
            
             //attached_link="<a href='"+notification_object[notification_id].attached+"' download='"+notification_object[notification_id].file_name+"'>Download File</a>"; 
        }
    }

    
    $("#email_modal").find(".email_modal_body_title_text").html(notification_object[notification_id].title);
    $("#email_modal").find(".email_modal_body_details").html(notification_object[notification_id].details);
    $("#email_modal").find(".email_modal_body_attached_link").html(attached_link);
    
    $("#email_modal").find(".email_modal_body_information .sender_time").html(notification_object[notification_id].send_time); 
    
    $("#email_modal").find(".notification_read_confirm").attr("id",notification_id);
    
     showModal("email_modal");
    
})  ;  
    
    
    

function replayNotification(notification_id,sender_id)
{
    
    $("#notification_send_confirm").attr("sender_id",sender_id);
    $("#notification_send_confirm").attr("notification_id",notification_id);
    
     showModal("replay_email_modal");
}


function favoriteNotification(notification_id,is_favaroute){
    
    if(is_favaroute==1){
        return false;
    }else{
        $("#favorite_notification_"+notification_id).find(".fa-star").addClass("favorite");
        $("#row_"+notification_id).attr("is_favorite",1);
        
        updateFavoriteNotifcaitonStatus(notification_id,5);
    }
    
}




 function updateFavoriteNotifcaitonStatus(notification_id,status_code)
 {
     
      $.ajax({
        url: ajax_url + "notification/ajaxUpdateNotification",
        type: 'POST',
        dataType: 'json',
        data: { notification_id: notification_id, status: status_code },
        beforeSend: function(xhr) {
             
            showModal();
        },
        success: function(response) {
          
            //console.log(response);
            closeModal();

            if (response.status === "success")
            
           { 
                         

                    setTimeout(function() {
                        closeModal();

                    }, 1000);
                            
                            
            } 
            else 
            {
                
                
                setTimeout(function() {
                    closeModal();
                }, 1000);
                alert(response.message);
                
                
                
            }
        },
        error: function(xhr, status, error) {
            // This function will be called if the request encounters an error
            console.log(error);
        }
    });
     
 }
    
      
    
$(document).on("click",".email_type_list",function(){
    
    myString=$(this).text();
    myString = myString.replace(/\s/g, '');
    if(myString=="None")
    {
        $("#current_selected_email_type").html('All <i class="fa fa-angle-down "></i>');
    }   
    else{
          $("#current_selected_email_type").html(myString+ ' <i class="fa fa-angle-down "></i>');
    }

shortNotificaitonRow(myString);
    
}) ;

function shortNotificaitonRow(shortType){
 

    if(shortType=="None")
    {
         
        $(".notification_replay_email_list").find("tr").removeClass("hideRow");
    } 
    else if(shortType=="Read")
    {
        $(".notification_replay_email_list").find("tr").each(function(){
            
           if($(this).attr("notification_status")=="Read"){
               $(this).removeClass("hideRow");
           }
           else{
               $(this).addClass("hideRow");
           }
           
        });
    } 
     else if(shortType=="Unread")
    {
        $(".notification_replay_email_list").find("tr").each(function(){
            
           if($(this).attr("notification_status")=="Unread"){
               $(this).removeClass("hideRow");
           }
           else{
              $(this).addClass("hideRow");
           }
           
        });
    }
     else if(shortType=="Favorite")
    {
        $(".notification_replay_email_list").find("tr").each(function(){
            
           if($(this).attr("is_favorite")=="1"){
               $(this).removeClass("hideRow");
           }
           else{
              $(this).addClass("hideRow");
           }
           
        });
    }
}
</script>    

