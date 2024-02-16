    <!-- The Modal -->
    <div class="modal fade" id="email_modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Email details</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="email_modal_body">
                    
                    <div class="email_modal_body_title">
                        <b>Title:</b> <span class="email_modal_body_title_text"></span>
                    </div>
                    
                    <div class="email_modal_body_details">
                       
                    </div>
                    
                    <div class="email_modal_body_attached">
                        <span>Attached:</span> <i class="email_modal_body_attached_link"></i>
                    </div>
                    
                    
                     <div class="email_modal_body_information">
                        
                         <p><b>Message-send-time :</b> <i class="sender_time"> </i> </p> 
                    </div>
                   
                    
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary notification_read_confirm" >Confirm-Read</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    
                </div>
            </div>
        </div>
        </div>
        <!-- end model popup -->        
        
        
        
<style>
 
 .email_modal_body_title {
    width: 100%;
    float: left;
    height: auto;
    min-height: 10px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    padding-bottom: 10px;
}
.email_modal_body_details{ width: 100%; float: left; height: auto; min-height: 200px}

.email_modal_body_attached {
    width: 100%;
    float: left;
    height: 29px;
    background: aliceblue;
    border-top: 1px solid #ccc;
    text-align: left;
    line-height: 28px;
    font-weight: bold;
}
   

.email_modal_body_information{ width: 100%; float: left;height: 20px;border-top: 1px solid #ccc;}
.email_modal_body_information p {
    padding: 0px !important;
    margin: 2px !important;
}    
.email_modal_body_information p b{font-weight: bold;margin-right: 10px;} 
.email_modal_body_title b{font-weight: bold;margin-right: 10px;}

.email_modal_body_title_text{font-weight: normal}
.email_modal_body_attached_link{ padding-left: 50px;}
.email_modal_body_attached span{ font-weight: normal}
</style>        




<script>

 
 $(document).on("click", ".notification_read_confirm", function() {
    let notification_id = $(this).attr("id");
  
updateNotifcationStatus(notification_id,"2");
   
});

 function updateNotifcationStatus(notification_id,status_code)
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
                            closeModal("email_modal");
                            $("#total_unread_notification_top").html(response.data.total);
                            setTotalNotificaiton(response.data.total);

                            let notificationList = $(".notification_unread_email_list");

                            if (notificationList.length) {
                                let elementToRemove = notificationList.find("#row_" + notification_id);

                                if (elementToRemove.length) {
                                    elementToRemove.remove();
                                }
                            }

                            setTimeout(function() {
                                closeModal();
                                
                                $(".notification_replay_email_list").find("#row_"+notification_id).removeClass("unread");
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
</script>        