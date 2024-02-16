<div class="extra_inner_box">
    <div class="row">     

        <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
                <div class="heading1 margin_0">
                    <h2>All active account list </h2>
                </div>
            </div>
            <div class="table_section padding_infor_info">
                <div class="table-responsive-sm">
                    <table class="table table-bordered">
                    
                         <thead>
                        <tr>
                            <th>#</th>
                            
                            <th>First-name</th>
                            <th>Last-name</th>
                            <th>Department</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>User-name</th>
                            <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                         <?php 
            
                            if(is_array($data['account_list'])){
                            $inc=1;

                            foreach($data['account_list'] as $key=>$val)
                            {    

                        ?>

                          <tr id="active_account_<?=$val['id']?>">
                              <td><?=$inc++?></td>
                              <td><?=$val['first_name']?>  </td>
                              <td><?=$val['last_name']?> </td> 
                              <td><?= FRZ::getDepartment($val['department'])?></td>
                              <td><?= FRZ::getGender($val['gender'])?></td>
                              <td><?=$val['email']?></td>
                              <td><?=$val['user_name']?></td>
                              <td>
                                  
                               <button type="button" class="btn btn-sm btn-primary active_account_"  onclick="confirmationBlockAccount('<?=$val['id']?>')">Block-account</button>

                              </td>
                          </tr>


                            <?php }} ?> 
                    </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
        </div>


    </div>
    </div>


 


<script>
       
 function confirmationBlockAccount(user_id){
     
     $("#reasonModal_send_confirm").attr("reason_user_id","");
     $("#reasonModal_send_confirm").attr("reason_user_id",user_id);
     
      showModal("reasonModal");
 }      
$(document).on("click","#reasonModal_send_confirm",function(){
    
     let user_id = $("#reasonModal_send_confirm").attr("reason_user_id");
     if(user_id)
     {
         let reasonModal_body_message=$("#reasonModal_body_message").val();
         if(reasonModal_body_message)
         {
             closeModal("reasonModal");
              blockAccount(user_id,reasonModal_body_message);
             
         }   
         else{
             alert("Please write somethings");
         }
        
     }
     else{
         alert("Something is wrong !");
     }
    
});


        
function blockAccount(user_id,block_reason)
{
 
    
  let requestData = { user_id:user_id  };    
    
    
    
     $.ajax({
        url: ajax_url + "Support/ajaxBlockAccount",
        type: 'POST',
        dataType: 'json',
        data: { user_id: user_id,block_reason:block_reason},
        beforeSend: function(xhr) {
             
            showModal();
        },
    success: function (response) {
        
         
        
        if(response.status=="success")
        {
            $("#active_account_"+user_id).remove();
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