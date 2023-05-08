import React from 'react';

const FoodDisplay =({imageUrl,foods,error})=> {
	 const food=  foods.map(item=>{
	 	       return <li 
		 	       key={item.id}>
		 	       <span>
				 	 {item.name}
				 	 </span>
				 	 <span>
				 	 {item.value}
				     </span>
				 	 </li>
				 })

         if(error){
         	return(
         		 <h3 >{error}</h3>
		         		)
		         }else{
			return (
			
				<div >   
				 <div >
				 	<img src={imageUrl} style={{width:'400px',height:'520px'}} alt=""/>
				 </div>
				 {food.length> 0 &&
				 <div  >		
					 <ul >
					   <h2 >Name<span className='center3 br3 f5'>Probability</span></h2>
					{food}
					
		             </ul>
	             </div>
        }
            </div>		
		
		)
	}
}

export default FoodDisplay;
