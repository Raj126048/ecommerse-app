import React from 'react'
import watch from '../images/watch-1.webp'
import watch1 from '../images/watch-2.webp'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import addc from '../images/add-cart.svg'
import view from '../images/view.svg'
import wish from '../images/wish.svg'
import { useDispatch } from 'react-redux'
import { addToWishList } from '../features/product/productSlice'
const ProductCard = (props) => {
    const {grid,data}=props;
   const dispatch=useDispatch()
    let location=useLocation();
    const AddToWishList=(bid)=>{
        const data={id:bid}
    
dispatch(addToWishList(data))
    }
  return (
    <>
    {
        data?.map((item,index)=>{
            return(
                <div key={index} className={` ${location.pathname ==='/store' ? `gr-${grid}` : 'gr-3'}  mb-3 pr`}>
                
                <div className='product-card position-relative'>
                    <div className='wishlist-icon position-absolute'>
                        <button className='border-0 bg-transparent' onClick={(e)=>{AddToWishList(item?._id)}}>
                        <img src={wish} alt='wishlist'/></button>
                        
                    </div>
                    <Link to='product/:id'>
                    <div className='product-image'>
                        <img className='im img-fluid ' src={item?.images[0].url} alt='product img'/>
                        <img className='im img-fluid' src={watch1} alt='product img'/>
                    </div>
                    </Link>
                    <div className='product-details'>
                        <h6 className='brand'> {item?.brand}</h6>
                        <h5 className='product-title'>
                            {item?.title}
                        </h5>
                        <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor='#ffd700'/>
                        <p className={`description ${grid===12?"d-block":'d-none'}`} 
                     dangerouslySetInnerHTML={{__html:item?.description}}
                        /> 
                        <p className='price'>${item?.price}</p>
                    </div>
                    <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column'>
                            <button className='border-0 bg-transparent'>
                            <img src={addc} alt='addcart'/>
                            </button>
                            <button className='border-0 bg-transparent'>
                            <img src={view} alt='addcart'/>
                            </button>
                            <button className='border-0 bg-transparent'>
                            <img src={addc} alt='addcart'/>
                            </button>
                        </div>
                    </div>
                </div>
              
            </div>
            )
        })
    }
   
  
    </>
    
  )
}

export default ProductCard