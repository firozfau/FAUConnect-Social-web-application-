    <!-- The Modal -->
    <div class="modal fade" id="loaderModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                 
                <!-- Modal body -->
                <div class="modal-body">
                  
                    <img src="<?= base_url('assets/images/animation_image/loader.gif')?>" style="width: 100%"/>
                </div>
                <!-- Modal footer -->
                
            </div>
        </div>
        </div>
        <!-- end model popup -->
        
        
    <!-- The Modal -->
    <div class="modal fade" id="errorModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Error Information</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="error_modal_body">
                    
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
        </div>
        <!-- end model popup -->        
        
        
              
        
        
      <div class="modal fade" id="successModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Success Information</h4>
                    <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body text-success" id="success_modal_body">
                    <!-- Update the content for success -->
                    <p>Congratulations! Your operation was successful.</p>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
  
        
        
              
    <!-- The Modal -->
    <div class="modal fade" id="reasonModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Briefly explain why you did this</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body" id="reasonModal_body">
                     <textarea id="reasonModal_body_message" style="width:100%; height:100px"></textarea>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                     <button type="button" class="btn btn-primary"  reason_user_id="" id="reasonModal_send_confirm" >Confirm and Submit</button>
                </div>
            </div>
        </div>
        </div>
        <!-- end model popup -->  