import React, { useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import cross from '../images/cross.svg';
import watch from '../images/watch.jpg';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishList } from '../features/auth/authSlice';
import { addToWishList } from '../features/product/productSlice';
import { Link, useNavigate } from 'react-router-dom';


const WishList = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
useEffect(()=>{
    getWishlist();
},[]);
const getWishlist=()=>{
    dispatch(getUserProductWishList())
}
const wishlistState=useSelector(state=>state.auth?.wishlist)
const remove=(idd)=>{
    const data={
        id:idd,data:idd
    }
dispatch(addToWishList(data));
setTimeout(()=>{
    dispatch(getUserProductWishList());
},100)
}
console.log(wishlistState);
  return (
   
   <Layout title={'WishList-Shopholic'}>
   <BreadCrumb title='WishList'/>
   <div className='wishlist-wrapper home-wrapper-3 py-5'>
    <div className='containner-xxl'>
        <div className='row'>
            {
                
                wishlistState?.wishlist?.length=== 0 && <div className='text-center fs-3'>No data</div>
            }
            {
                wishlistState?.wishlist?.map((item,index)=>{
                    return(
                        <div className='col-3' key={index}>
                        <div className='wishlist-card position-relative mx-3'>
                            <img src= {cross} alt='cross ' onClick={()=>{remove(item?._id)}} className='position-absolute cross img-fluid'/>
                            <div className='wishlist-card-image'>  
                            <Link to={'/product/'+item?._id}>
                                <img src={item?.images[0].url?item?.images[0].url:watch}   alt='watch' className='img-fluid d-block mx-auto' width={160}/>
                             </Link>
                            </div>
                            <div className='py-3 px-3'>
                              <h5 className='title'>
                                   {item?.title}
                                </h5>
                                <h6 className='price'>${item?.price}</h6>
                              </div>
                        </div>
                    </div>

                    )
                })
            }
          
       
        </div>
    </div>
   </div>
   </Layout>
 
  )
}

export default WishList