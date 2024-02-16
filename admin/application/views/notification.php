<div class="extra_inner_box">

     <div class="extra_inner_box">
         <span class="notificaiton_send_result">
             
         </span>  
     <form>
        <div class="form-group">
            <label for="to">To : <b class="reqfrz">*</b></label> 
           <select class="form-control" id="notifcation_receiver_code">
                <option value="1">All users</option>
                <option value="2">Specific user</option>
                <option value="3">All Admin</option>
            </select>

        </div> 
         <div class="form-group specific_user_email specifDivHide" id="specific_user_email_box" >
            <label for="to">Specific user(Email) : <b class="reqfrz">*</b></label>
            <input type="email" class="form-control" id="specific_user_email" placeholder="Enter recipient's email">
        </div>

        <div class="form-group">
            <label for="subject">Title  : <b class="reqfrz">*</b></label>
            <input type="text" class="form-control" id="title" placeholder="Enter notifcation title">
        </div>
        <div class="form-group">
            <label for="message">Message  : <b class="reqfrz">*</b></label>
            <textarea class="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
        </div>
        
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="sendUserNotificationByAdmin">Send</button>
            <button type="button" class="btn btn-secondary" id="restAllfileds">Discard</button>
        </div>
    </form>
</div>
    
</div>

<style>
.specifDivHide{ display:none !important}    
.notificaiton_send_result p.error{ color: red}
.notificaiton_send_result p.success{ color: green}
</style>

<script>

$(document).on("click","#sendUserNotificationByAdmin",function(){
    sendNotification();
});

function sendNotification(){
    if(validationData()){
        
        let title= $("#title").val();
        let message= $("#message").val();
        let receiver_type= $("#notifcation_receiver_code").val(); 
        let receiver_email= $("#specific_user_email").val();

        ajaxNotificationSendToUsers(title,message,receiver_type,receiver_email);
        
        
    }else{
        $(".notificaiton_send_result").html("<p class='error'>All field are required!</p>");
    }
}




 function ajaxNotificationSendToUsers(title,message,receiver_type,receiver_email)
 {
     
      $.ajax({
        url: ajax_url + "notification/ajaxNotificationSendToUsers",
        type: 'POST',
        dataType: 'json',
        data: { title: title, message: message,receiver_type:receiver_type,receiver_email:receiver_email },
        beforeSend: function(xhr) {
             
            showModal();
        },
        success: function(response) {
          
            //console.log(response);
            closeModal();

            if (response.status === "success")
            
           { 

                    setTimeout(function() {
                         $(".notificaiton_send_result").html("<p class='success'> Your notification was successfully submitted.</p>"); 
                        closeModal();
                         resetFileds();

                    }, 1000);
                            
                            
            } 
            else 
            {
                
                
                setTimeout(function() {
                   
                    $(".notificaiton_send_result").html("<p class='error'>"+response.message+"</p>"); 
                    closeModal();
                   
                    
                }, 1000);
              
                
                
                
            }
        },
        error: function(xhr, status, error) {
            // This function will be called if the request encounters an error
            console.log(error);
        }
    });
     
 }

   
function resetFileds(){
    $("#title").val("");
    $("#message").val("");
    $("#notifcation_receiver_code").val("1");
    $("#specific_user_email_box").addClass("specifDivHide");
    $("#specific_user_email").val("");
}

function validationData(){
   
   
     let title = $("#title").val();
     let message = $("#message").val();
          
        let notifcation_receiver_code = $("#notifcation_receiver_code").val();
        if(notifcation_receiver_code==1 || notifcation_receiver_code==2 || notifcation_receiver_code==3)
        {
            
            
            
            if(title!="" && message!="" )
            {
                    if(notifcation_receiver_code==2)
                    {
                         let specific_user_email=$("#specific_user_email").val();
                         
                         if(specific_user_email!="")
                         {
                             return true;
                         }
                         else{
                             return false ;
                         }
                    }
                    else{
                          $("#specific_user_email").val("");
                        return true;
                    }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
        
 
    
}

 
$(document).on("click","#restAllfileds",function(){
    resetFileds();
});
$(document).on("change","#notifcation_receiver_code",function(){
   
     
    let notifcation_receiver_code = $(this).val();
    
    
    
    if(notifcation_receiver_code==2){
             

        $("#specific_user_email_box").removeClass("specifDivHide");
    }else{
        $("#specific_user_email_box").addClass("specifDivHide");
        $("#specific_user_email").val("");
    }
    
    
})  ;  

</script>