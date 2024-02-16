<div class="col-md-12">
<div class="extra_inner_box">

                           
 
 <h2 class="mb-4">Find User</h2>

  <!-- Search and Table Section -->
  <div class="mt-5">
      
    <form action="" method="post">   
          <?php 
            
            if($status=="request")
            {
                 echo form_error('search_data', '<i class="error_field">', '</i>'); 
            } 
            else if($status=="error"){
                echo  '<i class="error_field">'.$message.'</i>';
            }
         
          
          ?>  
    <div class="input-group mb-3">
       
            <input type="text" class="form-control" placeholder="Enter username or email or name" name="search_data" minlength="3" maxlength="50" id="search_input">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="searchButton">Search</button>
          </div>
            
          
       
    </div>
     
       </form> 
 
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th> 
          <th scope="col">Department</th> 
          <th scope="col">Email</th>
          <th scope="col">Username</th> 
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody id="userData">
        <?php 
            
            if(is_array($data['user_list'])){
            
            foreach($data['user_list'] as $key=>$val)
            {    
        
        ?>
          
          <tr>
              <td><?=$val['first_name']?> <?=$val['last_name']?> </td>
             
              <td><?= FRZ::getDepartment($val['department'])?></td>
              <td><?=$val['email']?></td>
              <td><?=$val['user_name']?></td>
              <td id="sendNewPassword<?=$val['id']?>">
                  <?php 
                  
                    if($val['account_type']==2)
                    {  
                  ?>
                  <button type="button" class="btn btn-sm btn-danger sendNewPassword"  onclick="sendNewPassword('<?=$val['id']?>')">Send new password</button>

                    <?php }else{
                        echo "----";
                    } ?>
              </td>
          </tr>
        
        
            <?php }} ?> 
          
      </tbody>
    </table>
  </div>
 
 
 
 </div> 
 
 
 
 
 
 
 </div>


<script>
let apiEndpoint="<?=$this->config->item('send_new_password_api')?>";


</script>


<script>
       
        
function sendNewPassword(user_id)
{
    
  let requestData = { user_id:user_id  };    
    
    
     $.ajax({
        url: ajax_url + "Support/ajaxSendNewPassword",
        type: 'POST',
        dataType: 'json',
        data: { user_id: user_id},
        beforeSend: function(xhr) {
             
            showModal();
        },
    success: function (response) {
        
       

        // console.log(response.status);
        
        if(response.status=="success")
        {
            $("#sendNewPassword"+user_id).html("<b style='color:green'>successfully send</b>");
        }
        else{
            $("#error_modal_body").html(response.message);
        }
        
        
        closeModal();
    },
    error: function (xhr, status, error) {
        // Handle failure
        closeModal();
        console.log('Error:', xhr.responseText);
    }
});
    
}




    </script>