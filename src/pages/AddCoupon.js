import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'

import {toast} from 'react-toastify';
import * as Yup from "yup"
import { useFormik } from 'formik';

import { GetCoupon, createCoupons,resetState, updateCoupon  } from '../features/coupon/couponSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
const AddCoupon = () => {
  const newCoupon=useSelector((state)=>state.coupon);
  const{isSuccess,isError,isLoading,createdCoupon,updatedCoupon,getedCouponn,getedCoupone,getedCoupond}=newCoupon
  const changeDataFormat=(date)=>{
    const newDate=new Date(date).toLocaleDateString();
    const  [month,day,year]=newDate.split("/");
    let mon="0";
    if(month.length==1){
     
      mon=mon+month;
    }
    else{
      mon=month;
    }
    return [year,mon,day].join("-");
  }
  console.log(changeDataFormat(getedCoupone));
  const dispatch=useDispatch();
  const navigate=useNavigate();
  let schema=Yup.object().shape({
    name:Yup.string().required("Coupon name is required"),
    expiry:Yup.date().required("Date is required"),
    discount:Yup.number().required("Discount percent is required"),
   
  })

  const location=useLocation();
  const Bid=location.pathname.split("/")[4];

  useEffect(()=>{
    if(Bid !== undefined){
      dispatch(GetCoupon(Bid));

 
    
    }
   
  },[Bid])


  useEffect(()=>{
    if(isSuccess && createdCoupon){
      toast.success("Coupon added successfully!")
    }
    if(updatedCoupon&&isSuccess){
      toast.success("Coupon updated succesfully")
      navigate("/dashboard/admin/coupon-list")
    }
    if(isError){
      toast.error("something went wrong!")
    }
  },[isSuccess,isError,isLoading])
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
      name:getedCouponn||"",
      expiry:changeDataFormat(getedCoupone)||"",
      discount:getedCoupond||"",
   
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      if(Bid!==undefined){
        const data={id: Bid, couponData: values}
        dispatch(updateCoupon(data))
      }
      else{
        dispatch(createCoupons(values))
        formik.resetForm();
        
        setTimeout(()=>{
          dispatch(resetState())
  
        },3000)
      }
    
      
    }

  })
  
  return (
    <div>
        <h3 className='mb-4'>{Bid!==undefined?"Edit":"Add"} Coupon </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput name='name' type='text' label='Enter Coupon name'  onChang={formik.handleChange('name')} onBlr={formik.handleBlur('name')} val={formik.values.name} id="coupon"/>
                <div className='error'>
                    {formik.touched.name && formik.errors.name}
                  </div>
                  <CustomInput name='expiry' type='date' label='Enter Coupon expiry date'  onChang={formik.handleChange('expiry')} onBlr={formik.handleBlur('expiry')} val={formik.values.expiry} id="date"/>
                <div className='error'>
                    {formik.touched.expiry && formik.errors.expiry}
                  </div>
                  <CustomInput name='discount' type='number' label='Enter Coupon discount'  onChang={formik.handleChange('discount')} onBlr={formik.handleBlur('discount')} val={formik.values.discount} id="discount"/>
                <div className='error'>
                    {formik.touched.discount && formik.errors.discount}
                  </div>
                <button className='btn btn-success border-0 rounded-5 my-5 w-25' type='submit'>{Bid!==undefined?"Edit":"Add"} Coupon</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon