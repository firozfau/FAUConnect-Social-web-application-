<div class="col-md-12">

    <div class="extra_inner_box">
    <div class="row">     

        <div class="col-md-12">
        <div class="white_shd full margin_bottom_30">
            <div class="full graph_head">
                <div class="heading1 margin_0">
                    <h2>Admin list</h2>
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
                            <th>Email</th>
                            <th>User-name</th>
                            <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                         <?php 
            
                            if(is_array($data['admin_list'])){
                            $inc=1;

                            foreach($data['admin_list'] as $key=>$val)
                            {    

                        ?>

                          <tr id="list_admin_<?=$val['id']?>">
                              <td><?=$inc++?></td>
                              <td><?=$val['first_name']?>  </td>
                              <td><?=$val['last_name']?> </td> 
                              <td><?= FRZ::getDepartment($val['department'])?></td> 
                              <td><?=$val['email']?></td>
                              <td><?=$val['user_name']?></td>
                              <td>
                                  
                               <button type="button" class="btn btn-sm btn-primary list_admin"  onclick="disableAdmin('<?=$val['id']?>')">Remove-admin-access</button>

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

    </div>

 

<script>
       
       

        
function disableAdmin(user_id)
{
    
  let requestData = { user_id:user_id  };    
    
    
    
     $.ajax({
        url: ajax_url + "Setting/ajaxDisableAdmin",
        type: 'POST',
        dataType: 'json',
        data: { user_id: user_id},
        beforeSend: function(xhr) {
             
            showModal();
        },
    success: function (response) {
        
         
        
         if(response.status=="success")
        {
            $("#list_admin_"+user_id).remove();
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