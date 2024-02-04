import React from 'react'
import ReactStars from 'react-rating-stars-component'
import watch from '../images/watch.jpg'
import { Link, useNavigate } from 'react-router-dom'
const SpeacialProductCard = (props) => {
    const navigate=useNavigate()
   const {title,brand,totalRating,price,url,sold,quantity,id}=props;
  return (
    <div className='col-4 mb-3 bg-white p-3 mx-1'>
        <div className='special-product-card '>
            <div className='d-flex con justify-content-between'>
                <div>
                    <img  src={url} alt='watch' className='img-fluid d-block mx-auto ' onClick={()=>{navigate("product/"+id)}} />
                </div>
                <div className='special-product-content'>
                    <h5 className='brand'>{brand}</h5>
                    <h6 className='title'>
                       {title}
                    </h6>
                    <ReactStars
                    count={5}
                    size={24}
                    value={totalRating}
                    edit={false}
                    activeColor='#ffd700'/>
                    <p className='price'><span className='red-p'>$100</span> &nbsp; <strike>${price}</strike></p>
                    <div className='discount-till d-flex align-items-center gap-10'>
                        <p className='mb-0'>
                            <b>5</b> days
                        </p>
                        <div className='d-flex gap-10 justify-content-between align-items-center'>
                            <span className='badge days rounded-circle p-2 bg-warning  gap-15'>1</span>
                            <span className='badge days rounded-circle p-2 bg-warning  gap-15'>1</span>
                            <span className='badge days rounded-circle p-2 bg-warning  gap-15'>1</span>
                        </div>
                        
                    </div>
                    <div className='prod-count mt-3'>
                            <p>Products  :{quantity}</p>
                           
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={quantity/(quantity+sold)*100} aria-valuemin={quantity} aria-valuemax={sold+quantity}>
  <div className="progress-bar" style={{width: quantity/(quantity+sold)*100+'%'}} />


                            </div>
                        </div>
                        <Link className='bnn bnbutton'>Add to Cart</Link> 
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SpeacialProductCard