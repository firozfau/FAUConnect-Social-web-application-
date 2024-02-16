import React, { useState, useEffect } from 'react';
const EmptyArchive = (isAlreadyPartnerData,archivePartnerList) => {

const [isArchivePartnerList, setArchivePartnerList] = useState(false);
const [isAlreadyPartnerUserId, setAlreadyPartnerUserId] = useState(false);






useEffect(() => {
     
   
    setAlreadyPartnerUserId(isAlreadyPartnerData.isAlreadyPartnerUserId);
   

    if(isAlreadyPartnerData){


        if (isAlreadyPartnerData.archivePartnerList !== undefined && isAlreadyPartnerData.archivePartnerList !== null && isAlreadyPartnerData.archivePartnerList !== "") {
            

            if (isAlreadyPartnerData.archivePartnerList && isAlreadyPartnerData.archivePartnerList.length > 0) {
                setArchivePartnerList(isAlreadyPartnerData.archivePartnerList);
            }
            
            
 

        }
        

    }
  

    
      }, [isAlreadyPartnerData,archivePartnerList]);
    

  return (
      <div className="items-center justify-center mt-0">
          
          {isArchivePartnerList==false && (
          <div className="bg-gradient-to-t from-custom-green shadow-lg text-white flex items-center justify-center w-full h-16"></div>
          )}


          <div className="bg-custom-green flex text-white flex items-center justify-center w-full">
              
              


          {isArchivePartnerList ? (
            


            <div class="container mx-auto px-0">
                        <table class="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: '#045E45' }}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Partner-Id</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Account Mode</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Full Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Gender</th>
                                
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>



                            <tbody class="bg-white divide-y divide-gray-200">
                                


                            {Array.isArray(isArchivePartnerList) && isArchivePartnerList.map(item => (
                                    <tr key={item.friend_id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.friend_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.account_mode === 1 ? 'Inspiration' : 'Focus'} </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.first_name} {item.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black">{item.gender === 1 ? 'Male' : (item.gender === 2 ? 'Female' : 'Divers')}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-black">
                                            {isAlreadyPartnerUserId === item.friend_id ? (
                                                <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-bold">Active</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs font-bold">Not-Active</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}



                                
                            </tbody>
                        </table>
                    </div>
                    





            ) : (
                <h2 className="text-2xl font-bold mb-2">Currently, there are no archived chats</h2>
            )}






          </div>
          <div className="bg-gradient-to-b from-custom-green text-white flex items-center justify-center w-full h-16"></div>
      </div>)
}

export default EmptyArchive;
