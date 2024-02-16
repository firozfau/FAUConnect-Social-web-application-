<link rel="stylesheet" href="<?=base_url('assets/css/analysis.css')?>" />


<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"> 

<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>



<div class="extra_inner_box">
<!-- white_shd -->
                            
    <div class="row column4 graph"> 
    <!-- tab style 2 -->
    
    <div class="col-md-12">
        <div class="analysis_search_box">
            <table>
                <tr>
                    <th>From date</th>
                    <th>To date</th>
                </tr>
                <tr>
                    <td>
                        <input type="text" class="analysis_search_input form-control" id="analysis_search_from_date" />
                    </td>
                    <td>
                        <input type="text" class="analysis_search_input form-control" id="analysis_search_to_date" />
                    </td>
                    <td>
                        <input type="button" value="Search" class="analysis_search_button btn btn-primary" id="analysis_search_button" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    
    <div class="col-md-12">
     
        
        
        
        
        <div class="analysis_inner_box white_shd">
            
            
            <div class="analysis_inner_box_header">
                
                <p>CLIENT REGISTRATION GRAPH</p>
                
            </div>
            
            
            
            
            
            <div class="analysis_inner_box_body" id="client_registraion_acitivity">
                
                
            </div>
            
            
            
            
            
            
            
            <div class="analysis_inner_box_footer">
                
                
            </div>
            
        </div>
        
        

    
        <div class="analysis_inner_box white_shd">
            
            
            <div class="analysis_inner_box_header">
                
                <p>GRAPH OF ALL USERS SHORT INFO </p>
                
            </div>
            
            
            
            
            
            <div class="analysis_inner_box_body" id="client_short_acitivity">
                
                
            </div>
            
            
            
            
            
            
            
            <div class="analysis_inner_box_footer">
                
                
            </div>
            
        </div>

        
            
        <div class="analysis_inner_box white_shd">
            
            
            <div class="analysis_inner_box_header">
                
                <p>GRAPH OF TOTAL AND ACTIVE USERS SHORT INFO </p>
                
            </div>
            
            
            
            
            
            <div class="analysis_inner_box_body" id="client_total_short_acitivity">
                
                
            </div>
            
            
            
            
            
            
            
            <div class="analysis_inner_box_footer">
                
                
            </div>
            
        </div>

         
        
           
        <div class="analysis_inner_box white_shd">
            
            
            <div class="analysis_inner_box_header">
                
                <p>GRAPH OF USER TIME SPENT ON FAUCONNECT APP </p>
                
            </div>
            
            
            
            
            
            <div class="analysis_inner_box_body" id="client_login_acitivity">
                
                
            </div>
            
            
            
            
            
            
            
            <div class="analysis_inner_box_footer">
                
                
            </div>
            
        </div>
       
         
        
        
        
        
       
        
        
        
       
        
    </div> 
    </div>
</div>


<script>
    
$(document).ready(function(){
    setTimeout(function(){
         
        if (checkdateRangeData()) {
            let from_date = $("#analysis_search_from_date").val();
            let to_date = $("#analysis_search_to_date").val();
            searchData(from_date, to_date);
        }
    }, 100);
});
  
    
$(document).on("click","#analysis_search_button",function(){
  if(checkdateRangeData)
  {   
       let from_date = $("#analysis_search_from_date").val();
      let to_date = $("#analysis_search_to_date").val();
  
      searchData(from_date,to_date);
  } 
    
});


function checkdateRangeData(){
      removeReBorder(); 
   let from_date = $("#analysis_search_from_date").val();
  let to_date = $("#analysis_search_to_date").val();
  
  if(from_date==""){
      $("#analysis_search_from_date").css("border","1px solid red"); 
      return false;
  }
  else if(to_date==""){ 
      $("#analysis_search_to_date").css("border","1px solid red");
      return false;
  }
  else{
  
  return true;
        }
    
}


 

function searchData(from_date,to_date)
{
   
    
     $.ajax({
        url: ajax_url + "Analysis/ajaxClientActivityData",
        type: 'POST',
        dataType: 'json',
        data: { from_date: from_date,to_date:to_date},
        beforeSend: function(xhr) {
             
            showModal();
        },
    success: function (response) {
         
         
         callChartClinetRegistriaonActivity(response['registraction_acitivity']);  
         client_login_acitivity(response['login_acitivity']);
          
         client_short_acitivity(response['total_account_activity']);
         client_total_login_acitivity(response['total_active_account_info']);
         
        
         setTimeout(function() 
		 {
			closeModal();

		}, 1000);
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
    $(".analysis_search_input").on("keydown", function(e) {
      if (e.key === "Backspace") {
        e.preventDefault();
      }
    });
    
     
 const currentDateFrom = getCurrentDate(30);



    $("#analysis_search_from_date").val(currentDateFrom).datepicker({
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
    
    $("#analysis_search_to_date").val(currentDateTo).datepicker({
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

  // Clone the current date to avoid modifying the original date object
  const modifiedDate = new Date(today);

  if (day_subtract) {
    modifiedDate.setDate(today.getDate() - day_subtract);
  }

  const year = modifiedDate.getFullYear();
  const month = (modifiedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = modifiedDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

 
 function removeReBorder(){
    $(".analysis_search_input").removeAttr("style");
} 
</script>

 


<script src="https://code.highcharts.com/highcharts.js"></script> 
<script src="https://code.highcharts.com/modules/drilldown.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
     

<script>
  
    
    
function callChartClinetRegistriaonActivity(chart_data){    
    
    
    
Highcharts.chart('client_registraion_acitivity', {
    chart: {
        type: 'column'
    },
    title: {
        align: 'left',
        text: null
    },
    subtitle: {
        align: 'left',
        text: null
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: null
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                //format: '{point.y:.1f}%'
            }
        }
    },
/*
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
            */
 series: [
     {
         name:"Client registraction activity",
         colorByPoint: true, 
         data:chart_data
     }
 ]
  /*   series: [
        {
            name:" ",
            colorByPoint: true, 
            data: [
                {
                    name: 'Male',
                    y: 1,
                    drilldown: 'Gender'
                },
                {
                    name: 'Female',
                    y: 2,
                    drilldown: 'Gender'
                },
                {
                    name: 'Scientific',
                    y: 0,
                    drilldown: 'Department'
                },
                {
                    name: 'Non-Scientific',
                    y: 2,
                    drilldown: 'Department'
                },
                {
                    name: 'Professor',
                    y: 3,
                    drilldown: 'profession'
                },
                {
                    name: 'Others',
                    y: 0,
                    drilldown: 'profession'
                }
            ]
        }
    ]*/
     
});    


    
    }    
    
        
    
</script>  


<script>

function getFormatedDate(data) {
    let data_object = [];

    $.each(data, function(index, value) {
        
        let dateObject = new Date(value[0]); 
        let utcTimestamp = Date.UTC(dateObject.getUTCFullYear(), dateObject.getUTCMonth(), dateObject.getUTCDate()); 
        let single_data = [utcTimestamp, value[1]];
        data_object.push(single_data);
    });

    return data_object;
}
    
function client_login_acitivity(chart_data){
 
 let user_data_object= getFormatedDate(chart_data['user_data']['data']);
 let time_data_object= getFormatedDate(chart_data['time_data']['data']);
 


Highcharts.chart('client_login_acitivity', {
    chart: {
        type: 'spline'
    },
    title: {
        text: null,
        align: 'left'
    },
    subtitle: {
        text: null,
        align: 'left'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            // don't display the year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: null
        },
        min: 0
    },
     tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                //Highcharts.dateFormat('%e. %b', this.x) + ': ' +
                (this.series.name === 'Total users' ? this.y+ ' users' : this.y+ ' minutes');
        }
    },
    plotOptions: {
        series: {
            marker: {
                symbol: 'circle',
                fillColor: '#FFFFFF',
                enabled: true,
                radius: 2.5,
                lineWidth: 1,
                lineColor: null
            }
        }
    },

    colors: ['#39F', '#FF0000'],

      series:[
          {
              name:chart_data['user_data']['name'],
              data:user_data_object
          },
          {
              name:chart_data['time_data']['name'],
              data:time_data_object
          }
      ]
     
    /*series: [
        {
            name: 'Total users',
            data: [
                [Date.UTC(1970, 9, 24), 0],
                [Date.UTC(1970, 9, 27), 12],
                [Date.UTC(1970, 9, 30), 9],
                
            ]
        },
        {
            name: 'Total time Speend',
            data: [
                [Date.UTC(1970, 10, 14), 0],
                [Date.UTC(1970, 11, 6), 35],
                [Date.UTC(1970, 11, 13), 3],
                [Date.UTC(1970, 11, 20), 33],
               
            ]
        }
    ] */
    
});





}
    
</script>  

<script>
    
//client_short_acitivity

function client_short_acitivity(chart_data){
    

    
 Highcharts.chart('client_short_acitivity', {
    chart: {
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        valueSuffix: ' person'
    },
    subtitle: {
        text:null
    },
   plotOptions: {
    series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
            enabled: true,
            distance: 20
        }, {
            enabled: true,
            distance: -40,
            format: '{point.y}',  // Display actual values instead of percentages
            style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7
            },
            filter: {
                operator: '>',
                property: 'y',
                value: 10
            }
        }]
    }
},

    series: [
        {
            name: 'Total',
            colorByPoint: true,
            data: [
                
                {
                    name: 'Active users', 
                    y: chart_data['total_active_user']
                },
                {
                    name: 'Blocked users',
                    y: chart_data['total_blocked_user']
                },
                {
                    name: 'Non-Verified users',
                    y: chart_data['total_not_verified_user']
                },
                {
                    name: 'Logged users',
                    y: chart_data['current_logder_users']
                }
            ]
        }
    ]
});   
    
    
}

    
</script>    



<script>
    
//client_short_acitivity

function client_total_login_acitivity(chart_data){
    

    
 Highcharts.chart('client_total_short_acitivity', {
    chart: {
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        valueSuffix: ' person'
    },
    subtitle: {
        text:null
    },
   plotOptions: {
    series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
            enabled: true,
            distance: 20
        }, {
            enabled: true,
            distance: -40,
            format: '{point.y}',  // Display actual values instead of percentages
            style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7
            },
            filter: {
                operator: '>',
                property: 'y',
                value: 10
            }
        }]
    }
},

    series: [
        {
            name: 'Total',
            colorByPoint: true,
            data: [
                {
                    name: 'Total users',
                    sliced: true,
                    selected: true,
                    y: chart_data['total_user']
                },
                 {
                    name: 'Actively Conversation ',
                    y: chart_data['current_conversation_users']
                }
            ]
        }
    ]
});   
    
    
}

    
</script>    
