    <!-- The Modal -->
    <div class="modal fade" id="replay_email_modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Email details</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="replay_email_modal_body">
                    
                    <textarea id="replay_email_modal_body_message"></textarea>
                   
                    
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" sender_id="" notification_id="" id="notification_send_confirm" >Send Message</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    
                </div>
            </div>
        </div>
        </div>
        <!-- end model popup -->        
        
        
        
<style>
 
#replay_email_modal_body_message{ width: 100%; height: 200px;}
 
</style>        




<script>

  
 
 $(document).on("click", "#notification_send_confirm", function() {
    let notification_id = $(this).attr("notification_id");
    let sender_id = $(this).attr("sender_id");
    let message=$("#replay_email_modal_body_message").val();
  
  if(notification_id !="" && notification_id>0)
  {
        userNotificationReplied(notification_id,sender_id,message);
  }
});

 function userNotificationReplied(notification_id,sender_id,message)
 {
     
      $.ajax({
        url: ajax_url + "notification/ajaxUserNotificationReplied",
        type: 'POST',
        dataType: 'json',
        data: { notification_id: notification_id, sender_id: sender_id,message:message },
        beforeSend: function(xhr) {
             
            showModal();
        },
        success: function(response) {
          
            //console.log(response);
            closeModal();

            if (response.status === "success")
            
           {
                            closeModal("replay_email_modal");
                            
                            $("#replay_email_modal_body_message").val("");
                            
                            setTotalNotificaiton(response.data.total);

                           $("#row_"+notification_id).removeClass("unread");
                           $("#row_"+notification_id).attr("notification_status","Replied");
                          
                          $("#row_"+notification_id).find("#action_button_"+notification_id).find(".btn-danger").addClass("btn-secondary");
                          $("#row_"+notification_id).find("#action_button_"+notification_id).find(".btn-secondary").removeClass("btn-danger");

                            setTimeout(function() {
                                closeModal();
                                $("#success_modal_body").html("<p class='text-success'>Successfully sent a reply message to user notification.</p>");
                                showModal("successModal");
                                
                            }, 1000);
                            
                            
            } 
            else 
            {
                
                
                setTimeout(function() {
                    closeModal();
                    
                    
                     $("#error_modal_body").html("<p class='text-danger'>"+response.message+"</p>");
                     showModal("errorModal");
                    
                }, 1000);
              
                
                
                
            }
        },
        error: function(xhr, status, error) {
            // This function will be called if the request encounters an error
            console.log(error);
        }
    });
     
 }
</script>        