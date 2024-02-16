<div class="inbox-body">
    
  
    <table class="table table-inbox table-hover notification_unread_email_list">
        <tbody>
          
            <?php  
            
            $notification_data=array();
            $total_unread_noitificaiton=0;
            
            if($notification_list)
            {
                $inc=1;
                foreach($notification_list as $key=>$val){
                    
                    $sub_data = (object)[
                        'id' => $val['id'],
                        'title' => $val['title'],
                        'details' => $val['details'],
                        'send_time' => $val['send_time'],
                        'attached'=>$_SESSION['attached_file_location']."/".$val['attached'],
                        'file_name'=>($val['attached'])?$val['attached']:""
                    ];
                    
                    $notification_data[$val['id']]=$sub_data;
                    
                   $total_unread_noitificaiton++; 
             ?>       
          
            <tr class="unread" id="row_<?=$val['id']?>"  notificationid="<?=$val['id']?>">
                
                <td class="view-message  dont-show"><?=$val['title']?></td>
                <td class=" inbox-small-cells" style="width:100px">
                    
                    <?php 
                    
                        if($val['attached']){
                    ?>
                    
                    <a href="<?= $_SESSION['attached_file_location']."/".$val['attached']?>" target="_blank"><i class="fa fa-paperclip"></i> </a>
                    
                    <?php } ?>
                   
                    
                </td>
                <td  style="width:150px"class=" text-right"><?=FRZ::getDifferentTimeDetails($val['send_time'])?></td>
            </tr>
                
           <?php
                 }
           
             }
             
             
             
            ?>
            
            
            

        </tbody>
    </table>
</div>


<?php  
 
$object_data = (object)$notification_data; 

$this->load->view("modal/email_modal","");

$_SESSION['total_user_unread_notification']=$total_unread_noitificaiton;
?>


<script>
total_unread_noitificaiton ='<?=$total_unread_noitificaiton?>' ;

let notification_data=<?= json_encode($object_data)?>;

 
 
    
$(document).on("click",".notification_unread_email_list tbody tr td.view-message",function(){
    
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
    
    
    
  
  
  
    
    
</script>    
