import Layout from '../components/Layouts/Layout'
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import watch from '../images/watch.jpg'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/auth/authSlice'

const Cart = () => {
    const dispatch=useDispatch();
    const [update,setUpdate]=useState(null)
    const [total,setTotal]=useState(null)
    const userCartState=useSelector((state)=>state.auth.getcartProduct)
    console.log(userCartState);
    useEffect(()=>{
        let sum=0;
        for(let index=0;index<userCartState?.length;index++){
            sum=sum+Number(userCartState[index].quantity)*userCartState[index].price
        }
        setTotal(sum)
        
    },[userCartState])
    useEffect(()=>{
        dispatch(getUserCart())
        
    },[])
    const deleteCartProducts=(id)=>{
     

        dispatch(deleteCartProduct(id))
        setTimeout(()=>{dispatch(getUserCart())},200)
    }
    useEffect(()=>{
        dispatch(getUserCart())
        
    },[])
    useEffect(()=>{
    if(update!==null){
        console.log(update)
        dispatch(updateCartProduct({id:update?.id,newQuantity:update?.newQuantity}))

        setTimeout(()=>{dispatch(getUserCart())},200)
    }
        
    },[update])
  
  
  return (
   <Layout title='cart'>
    <BreadCrumb title='cart'/>
    <Container class1='cart-wrapper home-wrapper-2 py-5'>
    <div className='row'>
                <div className='col-12'>
                    <div className='d-flex cart-title justify-content-between align-items-center'>
                        <h4 className='cart-col-1'>Product</h4>
                        <h4 className='cart-col-2'>Price</h4>
                        <h4 className='cart-col-3'>Quantity</h4>
                        <h4  className='cart-col-4'>Total</h4>
                    </div>
                    {
                        userCartState&&userCartState?.map((item,index)=>{
                            return(
                                <div key={index} className='cart-data py-3 d-flex justify-content-center align-items-center'>
                                <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                    <div className='w-25'>
                                        <img src={item?.productId?.images[0]?.url}  className='img-fluid'alt='product img'/>
                                    </div>
                                    <div className='w-75 mx-4'>
                                        <p>{item?.productId.title}</p>
                                        
                                        <p className='d-flex gap-3'>Color: <ul className='colors ps-0'>
                                            <li style={{backgroundColor:item?.color.title}}></li></ul></p>
                                    </div>
                                </div>
                                <div className='cart-box'>
                                <div className='cart-col-2 d-flex align-items-center'>
                                    <h5 className='price'>$ {item?.price}</h5>
                                </div>
                                <div className='cart-col-3 mx-3 d-flex align-items-center gap-15 justify-content-center'>
                                    <div><input className='form-control' type='number' min={1} max={10} value={item?.quantity} onChange={(e)=>{setUpdate({id:item?._id,newQuantity:e.target.value})}}/></div>
                                    <div>
                                        <AiFillDelete onClick={()=>{deleteCartProducts(item?._id)}} className='text-danger mx-2'/>
                                    </div>
                                </div>
                                <div className='cart-col-4 c-c-4 d-flex align-items-center justify-content-end'>
                                    <h5 className='hid-total'>Price:</h5>
                                <h5 className='price'>$ {item?.price*item?.quantity}</h5>
                                </div>
                                </div>
                            </div>
                            )
                        })
                    }
                   
                </div>
                <div className='col-12 py-2 mt-4'>
                    <div className='d-flex justify-content-between align-items-baseline'>
                    <Link to='/product' className='bnbutton'>Continue To Shopping</Link>
                    {
                        (total!==null||total!==0)&&
                            <div>
                            <h4>Sub-Total:${total}</h4>
                            <p>Taxes and shipping calculated</p>
                            <Link to='/checkout' className='bnbutton'>Checkout</Link>
    
                        </div>
                        
                    }
                  
                    </div>
                </div>
            </div>
    </Container>
  

   </Layout>
  )
}

export default Cart