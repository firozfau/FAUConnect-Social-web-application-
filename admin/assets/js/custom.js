
let ps = new PerfectScrollbar('#sidebar'); 
let current_notification_attached_file_name="";

$(document).ready(function () {
  /*-- sidebar js --*/
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
  
  //console.log(total_unread_noitificaiton,"---->",current_class_name);
  
    
   // setTotalNotificaiton(total_unread_noitificaiton);
    
  //  updateTopbarTotalNotifiation();
});



function showModal(modal_id=false){
    if(modal_id==false){
         
         $("#loaderModal").modal("show");
    }else{
         $("#"+modal_id).modal("show");
    }
   
}

function closeModal(modal_id=false){
    if(modal_id==false){
         $("#loaderModal").modal("hide");
    }else{
         $("#"+modal_id).modal("hide");
    }
   
}

function setTotalNotificaiton(total_notification){
     localStorage.setItem('total_user_unread_notification', total_notification);
}

function getTotalNotificaiton(){
    
    // Replace 'total_user_unread_notification' with your specific key
const key = 'total_user_unread_notification';

// Check if the key exists in localStorage
if (localStorage.getItem(key) !== null) {
  // Key exists, do something
  const value = localStorage.getItem(key);
  
  return value;
 
} else {
  return false;
}

    
}
 
function updateTopbarTotalNotifiation(){
    let total_notification=getTotalNotificaiton();
    if(total_notification)
    {
         $("#total_unread_notification_top").html(total_notification);
    }    
    
}


$(document).on("click","#notification_attached_file",function(){
     
  
if(current_notification_attached_file_name)
{   
    downloadFile(current_notification_attached_file_name); 
   }
});


function downloadFile(file_name) {
    fetch(ajax_url + "notification/downloadFile?file_name=" + encodeURIComponent(file_name))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = file_name;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error('Error downloading file:', error));
}


 