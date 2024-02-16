<link rel="stylesheet" href="<?=base_url('assets/css/user_feedback.css')?>" />
    
 
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"> 

<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>


<div class="extra_inner_box">
<!-- white_shd -->
                            
    <div class="row column4 graph"> 
    <!-- tab style 2 -->
    <div class="col-md-12">
      
        
         
        
    <div class="col-md-12">
        <div class="user_feedback_search_box">
            <table>
                <tr>
                    <th>From date</th>
                    <th>To date</th>
                </tr>
                <tr>
                    <td>
                        <input type="text" class="user_feedback_search_input form-control" id="user_feedback_search_from_date" />
                    </td>
                    <td>
                        <input type="text" class="user_feedback_search_input form-control" id="user_feedback_search_to_date" />
                    </td>
                    <td>
                        <input type="button" value="Search" class="user_feedback_search_button btn btn-primary" id="user_feedback_search_button" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    
    <div class="col-md-12">
     
        
        
        
        
        <div class="user_feedback_box white_shd">
            
            
            <div class="user_feedback_inner_box_header">
                
                <p>ALL PARTNERS PROVIDE FEEDBACK TO EACH OTHER </p>
                
            </div>
             
            
            <div class="user_feedback_inner_box_body" >
                
                       <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Feedback Date</th>
                                    <th>Question </th>
                                    <th>Status</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody id="user_feedback_acitivity">

                            </tbody>
                       </table>
                
                
                
                
            </div>
            
            
            
             
            
        </div>
        
        
    </div> 
    </div>
</div>








<script>

    
$(document).on("click","#user_feedback_search_button",function(){
  if(checkdateRangeData)
  {   
       let from_date = $("#user_feedback_search_from_date").val();
      let to_date = $("#user_feedback_search_to_date").val();
  
      searchData(from_date,to_date)
  } 
    
});


function checkdateRangeData(){
      removeReBorder(); 
   let from_date = $("#user_feedback_search_from_date").val();
  let to_date = $("#user_feedback_search_to_date").val();
  
  if(from_date==""){
      $("#user_feedback_search_from_date").css("border","1px solid red"); 
      return false;
  }
  else if(to_date==""){ 
      $("#user_feedback_search_to_date").css("border","1px solid red");
      return false;
  }
  else{
  
  return true;
        }
    
}


 

function searchData(from_date,to_date)
{
   
    
     $.ajax({
        url: ajax_url + "Analysis/ajaxUserFeedbackData",
        type: 'POST',
        dataType: 'json',
        data: { from_date: from_date,to_date:to_date},
        beforeSend: function(xhr) {
             
            showModal();
        },
    success: function (res) {
         
         if(res.status=="success"){
             
              $("#user_feedback_acitivity").html(res.data);
             
         }
         else{
             $("#user_feedback_acitivity").html('<tr><td><p style="color:blue; text-align: center; font-size: 30px ; margin: 50px"> No user feedback </p></td></tr>');
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




<script>
  // Disable Backspace Key for Readonly Input using jQuery
  $(document).ready(function() {
    $(".user_feedback_search_input").on("keydown", function(e) {
      if (e.key === "Backspace") {
        e.preventDefault();
      }
    });
    
     
 const currentDateFrom = getCurrentDate(7);

    $("#user_feedback_search_from_date").val(currentDateFrom).datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      changeYear: true,
      yearRange: "-40:+0",
      onSelect: function(dateText) {
        // Function to be executed on date selection
        console.log("Selected from:", dateText);
        removeReBorder();
      }
    });
    
    
 const currentDateTo = getCurrentDate();    
    
    $("#user_feedback_search_to_date").val(currentDateTo).datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      changeYear: true,
      yearRange: "-40:+0",
       onSelect: function(dateText) {
        // Function to be executed on date selection
        console.log("Selected To:", dateText);
        removeReBorder();
      }
    });
    
    
    
    
  });
  
  
function getCurrentDate(day_subtract = false) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');

  let day; // Declare day outside of the if-else blocks

  if (day_subtract) {
    day = (today.getDate() - day_subtract).toString().padStart(2, '0');
  } else {
    day = today.getDate().toString().padStart(2, '0');
  }

  return `${year}-${month}-${day}`;
}
 
 function removeReBorder(){
    $(".user_feedback_search_input").removeAttr("style");
} 
</script>

 