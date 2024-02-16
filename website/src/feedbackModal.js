import React, { useState,useEffect } from 'react';

const FeedbackModal = ({feedbackList,baseData,isOpenFeedback, sendFeedBack,onCloseFeedBack }) => {


  const [isUserFeedbackList, setUserFeedbackList] = useState([]);
  const [isUserFeedbackBaseData, setUserFeedbackBaseData] = useState(false);
   

 

  const [expandedItemId, setExpandedItemId] = useState(null);
  const [commentValues, setCommentValues] = useState({});
  const [yesNoValues, setYesNoValues] = useState({});




  const toggleComments = (itemId) => {
      setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

  const handleYesNoFeedback = (itemId, feedback) => {
    setYesNoValues(prevState => ({
        ...prevState,
        [itemId]: feedback
    }));
};

  const handleTextareaChange = (itemId, value) => {
    setCommentValues(prevState => ({
        ...prevState,
        [itemId]: value
    }));
};



const getSortedComments = (data,yesNoId) => {
  
  let comment_text="";

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
        
        if(key==yesNoId)
        {
          comment_text=data[key];
          break;
        }

    }
}


return comment_text;

};

const getSortedData = (data,commentValues) => {
  
  let dataObject=[]

      for (let key in data) {
        if (data.hasOwnProperty(key)) 
        {
          // console.log(`Key: ${key}, Value: ${data[key]}`);
          let text_comments= getSortedComments(commentValues,key);
          if(text_comments)
          {
            delete commentValues[key];
          }

         //console.log(`Key: ${key}, Value: ${data[key]} , comments: ${text_comments}`);

         let sub_object= {
            "id": key,
            "status": data[key],
            "comments": text_comments
          }

          dataObject.push(sub_object);

        }
    }

    return dataObject;

};

 

  const actionFeedbackData = (event) => {

 


   //console.log(Object.keys(yesNoValues).length);
   
    if(Object.keys(yesNoValues).length>=7)
    {
        

      let object_data= getSortedData(yesNoValues,commentValues);
 
      let main_object={
        
          "user_id": isUserFeedbackBaseData.user_id,
          "friend_id": isUserFeedbackBaseData.friend_id,
          "feedbackList": object_data
        }
      
        sendFeedBack(main_object);

 

    }
    else{
      alert("Please mark all option");
    }


  };



  
  useEffect(() => {
      if(isOpenFeedback)
      {
        

        setUserFeedbackList(feedbackList);
        setUserFeedbackBaseData(baseData);
      }

  }, [feedbackList,baseData,isOpenFeedback]);

  if (!isOpenFeedback) return null;




  return (
    

    <div className="fixed z-10  feedbackModalBox inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex  items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div id="mainblock" className="  inline-block align-middle bg-white rounded-lg text-black overflow-hidden shadow-xl transform transition-all feedbackModal">
        <div className="p-6">
           <div className='feedbackHeader'>
              <div className='feedbackHeaderTitle'> Congratulations!  </div>

              <p>You have successfully engaged in a meaningful conversation with your ideal match partner.</p>
              <p>Now, it's time to share your experiences and opinions, which will be valuable for future matchmaking endeavors.</p>

             
           </div> 

           <div className='feedbackBody' id="feedbackBodyBox">
            

 
          

           <ul className="divide-y divide-gray-300">
                {isUserFeedbackList.map((item, index) => (
                    <li key={item.id} className="py-2">
                        <div className="flex justify-between items-center">
                            <div className='textleftBox'>
                                <p className="text-lg font-semi">{item.name}</p> 
                            </div>

                            <button 
                              onClick={() => handleYesNoFeedback(item.id, '1')} 
                              className={`yesNoButton bg-blue-500 text-white rounded-md hover:bg-blue-600 ${yesNoValues[item.id] === '1' ? 'yesNoButtonSelect' : ''}`}
                              >
                              Yes
                           </button>

                           <button 
                              onClick={() => handleYesNoFeedback(item.id, '2')} 
                              className={`yesNoButton bg-red-500 text-white rounded-md hover:bg-blue-600 ${yesNoValues[item.id] === '2' ? 'yesNoButtonSelect' : ''}`}
                              >
                              No
                           </button>

                        
                            <button onClick={() => toggleComments(item.id)} className="addCommentsButton bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                {expandedItemId == item.id ? 'Hide Comments' : 'Add Comments'}
                            </button>
                        </div>
                        {expandedItemId == item.id && (
                            <div className="mt-4">
                               
                                <textarea 
                                    className="textarearesize mt-2 p-2 border rounded-md" 
                                    rows="3" 
                                    placeholder="Write your comment here..."
                                    value={commentValues[item.id] || ''}
                                    onChange={(e) => handleTextareaChange(item.id, e.target.value)}
                                ></textarea>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            











           </div> 

           <div className='feedbackFooter'>
           <button className="bg-custom-green text-white   py-3  focus:outline-none w-full hover:bg-custom-darkgreen hover:text-white" 
               onClick={() => actionFeedbackData()}       >Send Feedback</button>
           </div>  

        </div>
      </div>
    </div>
  </div>
  



  );
};

export default FeedbackModal;
