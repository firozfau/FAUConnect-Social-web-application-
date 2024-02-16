class FRZ {


    constructor(name="frz") {
        this.name = name;
    }


    userphotoShowed(event)
    {
        const photoInput = event.target;
        const uploadedPhoto = document.getElementById('uploadedPhoto');

        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                uploadedPhoto.src = e.target.result;
            };

            reader.readAsDataURL(file);
    }

    }
    profileTabAction(evt, tabName) 
    {
        let i, tabContent, tabLinks,all_li_tab;
    
        // Hide all tab content
        tabContent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        }

        // Remove "active" class from all tabs
        tabLinks = document.getElementsByClassName("tab");
        for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active-tab");
        }

        // Show the selected tab content and set "active" class on the clicked tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.classList.add("active-tab");

    

    }
        
    updateCityHtml(selectedIndex) {
 
            const selectElement = document.getElementById("state");
            let selectedOption = selectElement.options[selectElement.selectedIndex];
            let dataInfo = selectedOption.getAttribute("data");
            let arrayResult = dataInfo.split(',');
        
        
            $("#city").html("<option value=''>Select</option>");
        
            arrayResult.forEach(function (city_name, index) {
                let option = document.createElement("option");
                option.value = index;
                option.text = city_name;
            
                // Check if the current index matches the desired selectedIndex
                if (index === selectedIndex) {
                option.selected = true; // Set the option as selected
                }
            
                $("#city").append(option);
            });
    
        }

    static getDateFormate(dateData) { 
    
        let d = new Date(dateData);
        d = new Date(d.getTime() - 3000000);
        let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString());
        return date_format_str;

    }
    isEmptyObj(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    getDataObjectFromProfileEdit(tab_type)
    {
        let data_object={};

        if(tab_type=="profile_information")
        {
            data_object.first_name=$("#"+tab_type).find("#first_name").val();
            data_object.last_name=$("#"+tab_type).find("#last_name").val();
            data_object.dob=$("#"+tab_type).find("#dob").val();
            data_object.gender=$("#"+tab_type).find("#gender").val();
            data_object.department=$("#"+tab_type).find("#department").val();
            data_object.current_position=$("#"+tab_type).find("#current_position").val(); 

        }
        else  if(tab_type=="contact_information")
        {
            data_object.mobile=$("#"+tab_type).find("#mobile").val();
            data_object.second_email=$("#"+tab_type).find("#second_email").val();
            data_object.office_phone=$("#"+tab_type).find("#office_phone").val(); 

        }
        else  if(tab_type=="address_information")
        {
            data_object.state=$("#"+tab_type).find("#state").val();
            data_object.city=$("#"+tab_type).find("#city").val();
            data_object.area_code=$("#"+tab_type).find("#area_code").val(); 

        }
        else if(tab_type=="user_information")
        {
            data_object.email=$("#"+tab_type).find("#email").val();
            data_object.username=$("#"+tab_type).find("#username").val();
            data_object.new_password=$("#"+tab_type).find("#new_password").val();
            data_object.confirm_password=$("#"+tab_type).find("#confirm_password").val();
            
        }
        else if(tab_type=="personal_information")
        {
            
            let language_list=[];
            let user_interest_list=[];
            let user_hobbies_list=[];

            data_object.user_objective=$("#"+tab_type).find("#user_objective").val();
            data_object.research_details=$("#"+tab_type).find("#research_details").val();
            
            
            $("#" + tab_type).find("#languages_list_box").find("input.languages:checked").each(function() {
                language_list.push( $(this).val());
            });
            $("#" + tab_type).find("#user_interest_list_box").find("input.user_interest:checked").each(function() {
                user_interest_list.push( $(this).val());
            });
            $("#" + tab_type).find("#user_hobbies_list_box").find("input.user_hobbies:checked").each(function() {
                user_hobbies_list.push( $(this).val());
            });


            data_object.user_hobbies=JSON.stringify(user_hobbies_list);
            data_object.user_interest=JSON.stringify(user_interest_list);
            data_object.user_languages=JSON.stringify(language_list);

        } 

        return data_object;
    }

    sendUserPhotoSave(form_id,input_file_id)
    {
        let userphoto=  $("#"+input_file_id).val();
        if(userphoto.length>0)
        {
            $("#"+form_id).submit();
        }

    }
    updateUserProfile(section_name)
    {

        let object_data= this.getDataObjectFromProfileEdit(section_name);

        if(this.isEmptyObj(object_data))
        {

            console.log("something wrong.....!");
        }
        else
        {

            object_data.section_name=section_name;

            const ajax_url = "/edit-profile";
            let customHeaders = {
                "Content-Type": "application/json",
            };
            
            let ajax_data=JSON.stringify(object_data); 
    
            fetch(ajax_url, {
                method: "POST",
                headers: customHeaders,
                body:ajax_data,
            })
                .then((response) => response.json())
                .then((object_data) => {
                    let data =object_data.data_save_result;
                    
                        if(data.status==true)
                        {
                            alert(data.message);
                        }
                        else{
                            alert("Failed!: Please try again");
                        }
                });
    
    

            
        } 

    

    }


}