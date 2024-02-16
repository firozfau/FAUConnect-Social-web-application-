const socket = io();
scrollToBottom();
socket.on('clients-total',(data)=>{
    //console.log("connected users:",data);
    document.getElementById('total_active_users').innerHTML=data;
});


socket.on('chat-message',(data)=>{
        addMessageToUI(false,data);
});



const myInput = document.getElementById('messengerText'); 

myInput.addEventListener('focus',(e)=>{

    socket.emit('typing',{
        user_id:user_id,
        last_name:last_name,
        friend_user_id:friend_user_id,
        message:`${last_name} is typing ......`,
    })

});

myInput.addEventListener('keypress',(e)=>{

    socket.emit('typing',{
        user_id:user_id,
        last_name:last_name,
        friend_user_id:friend_user_id,
        message:`${last_name} is typing ......`,
    })

});

myInput.addEventListener('blur',(e)=>{

    socket.emit('typing',{
        user_id:user_id,
        last_name:last_name,
        friend_user_id:friend_user_id,
        message:"",
    })
});
socket.on('typing',(data)=>{


    if(data.friend_user_id==user_id)
    {
        if(data.message)
        {
            $("#blank_super_message").find("#blank_super_message_span").html(data.message);
        }
        else
        {
            $("#blank_super_message").find("#blank_super_message_span").html("");
        } 
    }
});




myInput.addEventListener('keyup', function(event) {
    
    if (event.key === 'Enter') {
    
        if(myInput.value!="")
        {
            if(myInput.value.trim().length>0)
            {

                const data_message=1; // like text

                const object_data = {
                    message_type: data_message,  
                    message: myInput.value,
                    friend_user_id:friend_user_id,
                    user_id:user_id,
                    last_name:last_name
                };
            
                socket.emit('message',object_data);
                addMessageToUI(true,object_data);
                myInput.value="";
            
                scrollToBottom();
                $("#blank_super_message").find("#blank_super_message_span").html("");
            }
        }
        
    }
});

const myButton = document.getElementById('thumbButton'); 
myButton.addEventListener('click', function() {
    const data_message=2; // like button
    const object_data = {
        message_type: data_message,  
        message: data_message,
        friend_user_id:friend_user_id,
        user_id:user_id,
        last_name:last_name
    };

    socket.emit('message',object_data);
    addMessageToUI(true,object_data);

    scrollToBottom();
});  



function scrollToBottom()
{
   const conversation_main_box=  document.getElementById('conversation_main_box');
   conversation_main_box.scrollTo(0,conversation_main_box.scrollHeight);

}




function addMessageToUI(isOwnMessage,objData){

    let message_data=false;
    
            if(isOwnMessage)
            {

                if(objData.message_type==1)
                {
                    message_data='<div class="messages messages--sent"> <div class="message">'+objData.message+'</div></div>';

                }
                else
                {
                    message_data='<div class="messages messages--sent"><div class="message message--thumb thumb" style="width: 23px; height: 23px;"></div></div>';
                    
                }
                    
            }
            else
            {
                

                if(objData.friend_user_id==user_id)
                {
                    if(objData.message_type==1)
                    {
                        message_data='<div class="messages messages--received"> <div class="message">'+objData.message+'</div></div>';
                    }
                    else
                    {
                        message_data='<div class="messages messages--received"><div class="message message--thumb thumb" style="width: 23px; height: 23px;"></div></div>';
                    }
                }   

            }

            if(message_data)
            {
                $("#conversation_list").append(message_data);
            }
    

}