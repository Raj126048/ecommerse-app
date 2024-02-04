import { Link, useNavigate } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Layout from '../components/Layouts/Layout'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import watch from '../images/watch.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { config } from '../utils/axiosconfig'
import { CreateOrder } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


const Checkout = () => {

    const dispatch=useDispatch()
    
    const [total,setTotal]=useState(null)
    const [cartProduct,setCartProduct]=useState([]);
    const [shippingInfo,setShippingInfo]=useState(null)
    const[paymentInfo,setPaymentInfo]=useState({razorpayPaymentId:"",razorpayOrderId:""})
    const cartState=useSelector((state)=>state.auth.getcartProduct)
    const newBrand=useSelector((state)=>state.auth);
  const{isSuccess,isError,isLoading,orderedcartProduct}=newBrand
let shippingSchema=Yup.object({
    firstName:Yup.string().required("first name is required"),
    LastName:Yup.string().required("last name is required"),
    address:Yup.string().required("address is required"),
    state:Yup.string().required("state  is required"),
    country:Yup.string().required("country is required"),
    pincode:Yup.number().required("pincode is required"),
    city:Yup.string().required("city is required")
  })

  const navigate=useNavigate()

  useEffect(()=>{
    if(orderedcartProduct){
      toast.success("Brand added successfully!")
      navigate("/dashboard/user/orders")
    }
   
  },[orderedcartProduct])
  const formik=useFormik({
    initialValues:{
        firstName:"",
        LastName:"",
        address:"",
        state:"",
        country:"",
        pincode:"",
        city:"",
        other:""
    },
    validationSchema:shippingSchema,
    onSubmit:(values)=>{
        alert(JSON.stringify(values))
        setShippingInfo(values)
        setTimeout(()=>{  checkoutHandler()},300)
      
    }

  })

  const loadScript=(src)=>{
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
  }


   
    useEffect(()=>{
        let sum=0;
        for(let index=0;index<cartState?.length;index++){
            sum=sum+Number(cartState[index].quantity)*cartState[index].price
        }
        setTotal(sum)
        
    },[cartState])
console.log(cartState);
useEffect(()=>{
    let items=[]
                  for(let i=0;i<(cartState?.length);i++){
items.push({product:cartState[i].productId._id,quantity:cartState[i].quantity,color:cartState[i].color._id,price:cartState[i].price})
setCartProduct(items)
                  }
},[])



    const checkoutHandler=async()=>{
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert("Razorpay failed to load");
            return
        }
        const result=await axios.post("http://localhost:5000/api/user/order/checkout",{amount:total},config)
        if(!result){
            alert("Something went wrong")
            return
        }
        const {amount,id:order_id,currency}=result.data.order
        const options = {
            key: "rzp_test_2SAige96GkIaAG", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Shopholic.",
            description: "Test Transaction",
            
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                 
                };

                const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification",data);
                  setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                  })
              
                  dispatch(CreateOrder({totalPrice:total,totalPriceAfterDiscount:total,orderItems:cartProduct,paymentInfo,shippingInfo}))
                alert(result);
            },
            prefill: {
                name: "Shopholic",
                email: "Shopholic@example.com",
                contact: "999999997",
            },
            notes: {
                address: "Shopholic Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

  return (
  <Layout title='checkout'>
    <BreadCrumb title='checkout'/>
    <Container class1='checkout-wrapper py-5 home-wrapper-2'>
    <div className='row'>
                <div className='col-7'>
                    <div className='checkout-left-data'>
                        <h3 className='website-name'>Shopholic</h3>
                        <nav style={{"--bs-breadcrumb-divider":'>'}}
                        aria-label='breadcrumb'>
                           <ol className='breadcrumb'>
                            <li className='breadcrumb-item total-price'>
                                <Link to='/cart' className='text-dark'>Cart</Link>
                                </li>
                                &nbsp; /
                                <li className='breadcrumb-item total-price active' aria-current='page'>
                                    Information</li>
                                   &nbsp;/ <li className='breadcrumb-item total-price active'>Shipping
                                </li>
                                &nbsp;/
                                <li className='breadcrumb-item active total-price' aria-current='page'>
                                    Payment</li></ol> 
                        </nav>
                        <h4 className='title total'>Contact information</h4>
                        <p className='user-details total'>rjiwbjbcj@GMAIL.COM</p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form className='d-flex flex-wrap gap-25 justify-content-between' onSubmit={formik.handleSubmit}>
                            <div className='w-100'>
                                <select className='form-control form-select mb-2' defaultValue={'Select-Country'}  onChange={formik.handleChange('country')} onBlur={formik.handleBlur('country')} value={formik.values.country}>
                                    <option value='Select-Country'   disabled> Select Country</option>
                                    <option value={'India'} > India</option>
                                    <option value={'America'} > America</option>
                                </select>
                                <div className='error'>
                    {formik.touched.country && formik.errors.country}
                  </div>
                            </div>
                            <div className='d-flex flex-grow-1 mb-2'>
                                <input type='text' placeholder='first name' className='form-control'  onChange={formik.handleChange('firstName')} onBlur={formik.handleBlur('firstName')} value={formik.values.firstName} />
                                <div className='error'>
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                            </div>
                            <div className='d-flex flex-grow-1 mb-2'>
                                <input type='text' placeholder='last name' className='form-control'  onChange={formik.handleChange('LastName')} onBlur={formik.handleBlur('LastName')} value={formik.values.LastName} />
                                <div className='error'>
                    {formik.touched.LastName && formik.errors.LastName}
                  </div>
                            </div>
                            <div className='w-100 mb-2'>
                                <input type='text' placeholder='Address' className='form-control'  onChange={formik.handleChange('address')} onBlur={formik.handleBlur('address')} value={formik.values.address} />
                                <div className='error'>
                    {formik.touched.address && formik.errors.address}
                  </div>
                            </div>
                            <div className='w-100 mb-2'>
                                <input type='text' placeholder='Apartment, Suite, etc' className='form-control'  onChange={formik.handleChange('other')} onBlur={formik.handleBlur('other')} value={formik.values.other} />
                                <div className='error'>
                    {formik.touched.other && formik.errors.other}
                  </div>
                            </div>
                            <div className='d-flex flex-grow-1 mb-2'> <input type='text' placeholder='city' className='form-control'  onChange={formik.handleChange('city')} onBlur={formik.handleBlur('city')} value={formik.values.city} />   <div className='error'>
                    {formik.touched.city && formik.errors.city}
                  </div></div>
                            <div className='d-flex flex-grow-1 mb-2'>   <select className='form-control form-select' defaultValue={'Select-State'}  onChange={formik.handleChange('state')} onBlur={formik.handleBlur('state')} val={formik.values.state} >
<option value={'Select-State'} disabled>Select State</option>
<option value={'TamilNadu'}>TamilNadu</option>
</select>   <div className='error'>
                    {formik.touched.state && formik.errors.state}
                  </div></div>
                            <div className='d-flex flex-grow-1 mb-2'> <input type='text' placeholder='zip-code' className='form-control' onChange={formik.handleChange('pincode')} onBlur={formik.handleBlur('pincode')} value={formik.values.pincode}/>   <div className='error'>
                    {formik.touched.pincode && formik.errors.pincode}
                  </div></div>
                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center checkout-b'>
                                    <Link to='/cart' className='text-dark'><BiArrowBack className='mb-2'/>Return to cart</Link>
                                    <Link to='/cart' className='bnbutton'>Continue shipping</Link>
                                    <button className='bnbutton' type='submit' > Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-5'>
                     <div  className='border-bottom py-4'>
                        {
                            cartState && cartState?.map((item,index)=>{
                                return(
                                    <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                    <div className='w-75 d-flex gap-10'>
                                   <div className='w-25 position relative'>
                                    <span style={{top:'210px',right:'537px'}} className='position-absolute badge bg-secondary text-white p-2 rounded-circle'>{item?.quantity}</span>
                                            <img  width={100} height={100} src={item?.productId?.images[0]?.url} alt='product'/>
                                        </div>
                                        <div>
                                            <h5 className='total-price checkout-title overflow-hoden'>{item?.productId?.title}</h5>
                                            <p className='total-price'><ul className='colors'><li style={{backgroundColor:item?.color.title}}></li></ul></p>
                                        </div>
                                        </div>
                                        <div className='flex-grow-1 '>
                                            <h5 className='total'>
                                                $ {item?.productId?.price*item?.quantity}
                                            </h5>
                                        </div>
                                   </div>
                                )
                            })
                        }
                  
                     </div>
                     <div className='border-bottom py-4'></div>
                     <div className='d-flex justify-content-between align-items-center'>
                        <p className='total'>subtotal</p>
                        <p className='total-price'>$ {total?total:"0"}</p>
                     </div>
                     <div className='d-flex justify-content-between align-items-center'>
                        <p className='mb-0 total'>Shopping</p>
                        <p className='mb-0 total-price'>$5</p>
                     </div>
                     <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='total'>Total</h5>
                        <h5 className='total-price'>$ {total?total+5:"0"}</h5>
                     </div>
                </div>
            </div>
    </Container>

  </Layout>
  )
}

export default Checkout