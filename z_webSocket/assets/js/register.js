
$(document).on("click", "#userRegistrationbutton", function () {
    

                const ajax_url = "/check-exist-user-email";
       
              
                    const data = {
                        email: $("#email").val(),
                        username: $("#username").val(),
                    };
                    const customHeaders = {
                        "Content-Type": "application/json",
                    }

                    fetch(ajax_url, {
                        method: "POST",
                        headers: customHeaders,
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status) {
                               
                                $("#userRegistraionForm").submit();

                            } else { 
                                alert("email or user name wrong! check console");
                                console.log(data);
                                
                            }
                        });

});

 
/*
$(function () {
    var form = $('#userRegistraionForm');
    

            $(form).submit(function (e) {
            
                e.preventDefault();
 

               

 

            });
 

});
    */