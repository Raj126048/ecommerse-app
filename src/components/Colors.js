import React from 'react'

const Colors = (props) => {
  const {colorData,setColor}=props
  return (<>
   
    <div className='d-flex flex-wrap'>
    <ul className='colors'>
    {

    colorData && colorData?.map((item,index)=>{
      return(
        <li onClick={()=>{setColor(item?._id)}} style={{backgroundColor:item?.title}} key={index}></li>
      )
    })
   }
    
       
      
    </ul>
</div>
</>
  )
}

export default Colors