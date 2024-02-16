 <div class="extra_inner_box">

        <form method="post" enctype="multipart/form-data" id="databackupFrom" onsubmit="return checkDataBackup();">

            <div class="form-group">
                <label for="to">To <b class="reqfrz">*</b>:</label>
                <input type="email" class="form-control inputfields" id="toEmail" minlength="8" name="toEmail" placeholder="Enter recipient's email" required="required">
                <?= form_error('toEmail'); ?> 
            </div>
            <div class="form-group">
                <label for="cc">CC:</label>
                <input type="email" class="form-control inputfields" id="ccEmail" name="ccEmail" placeholder="Enter CC email" >
                <?= form_error('ccEmail'); ?> 
            </div>
            <div class="form-group">
                <label for="subject">Subject <b class="reqfrz">*</b>:</label>
                <input type="text" class="form-control" id="subject" name="subject" minlength="5" placeholder="Enter email subject"  required="required">
                <?= form_error('subject'); ?> 
            </div>
            <div class="form-group">
                <label for="message">Message <b class="reqfrz">*</b>:</label>
                <textarea class="form-control inputfields" id="message" name="message" minlength="5" rows="5" placeholder="Enter your message"  required="required"></textarea>
                <?= form_error('message'); ?> 
            </div> 
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Send</button>
                <button type="button" class="btn btn-secondary" id="discardbutton">Discard</button>
            </div>
    </form>
</div>



<script>
let meeagesData="<?=$this->session->flashdata('success_message')?>";    
$(document).ready(function(){
    
    if(meeagesData)
    {
        $("#success_modal_body").html(meeagesData);
        showModal("successModal");  
    }    
  
    
})  ;  
    
    
//databackupFrom
$(document).on("click","#discardbutton",function(){
    $(".inputfields").val("");
 });


function checkDataBackup() {
    
    var toEmail = $("#toEmail").val();
    var ccEmail = $("#ccEmail").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    // Trim whitespace from the beginning and end of strings
 
    toEmail = toEmail.trim();
    ccEmail = ccEmail.trim();
    subject = subject.trim();
    message = message.trim();
    
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if ( toEmail.length === 0  || subject.length === 0 || message.length === 0) {
        alert("All fields are required.");
        $("#toEmail").focus();
        return false;
    }
    
    
    

    if (toEmail.length < 8 || !emailRegex.test(toEmail) ) {
        alert("Please ensure that the email entered is correct.");
        $("#toEmail").focus();
        return false;
    }
    
    if (ccEmail.length>1)
    {
        if (ccEmail.length < 8 || !emailRegex.test(ccEmail) ) {
        alert("Please ensure that the email entered is correct.");
        
            $("#ccEmail").focus();
            return false;
        }
    }
     


   if ( subject.length <5) {
        alert("Subject should minimum 5 characters.");
         $("#subject").focus();
        return false;
    }

  if ( message.length <5) {
        alert("Message should minimum 5 characters.");
        $("#message").focus();
        return false;
    }


    if ( subject.length > 200) {
        alert("Subject should not exceed 200 characters.");
        return false;
    }
    
    if ( message.length > 500) {
        alert("Message should not exceed 200 characters.");
         $("#message").focus();
        return false;
    }
    
    
showModal();

    // If all checks pass, return true to allow form submission
    return true;
}

</script>