import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';
const Brand = () => {
  const newBrand=useSelector((state)=>state.brand);
  const{isSuccess,isError,isLoading,createdBrand,getedBrand,updatedBrand}=newBrand
  console.log(getedBrand);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  let schema=Yup.object().shape({
    title:Yup.string().required("brand name is required"),
   
  })
  const location=useLocation();
  const Bid=location.pathname.split("/")[4];

  useEffect(()=>{
    if(Bid !== undefined){
      dispatch(getBrand(Bid));

    console.log(getedBrand+"hi");
 
    
    }
    else{
      dispatch(resetState())
    }
  },[Bid])

  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success("Brand added successfully!")
    }
    if(updatedBrand&&isSuccess){
      toast.success("Brand updated succesfully")
      navigate("/dashboard/admin/brand-list")
    }
    if(isError){
      toast.error("something went wrong!")
    }
  },[isSuccess,isError,isLoading])

  console.log(getedBrand+"above");
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
      title: getedBrand||"",
   
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      if(Bid!==undefined){
        const data={id: Bid, brandData: values}
        dispatch(updateBrand(data))
      }
      else{
      dispatch(createBrand(values))
      formik.resetForm();
     
      setTimeout(()=>{
        dispatch(resetState())
navigate("/dashboard/admin/brand-list")
      },3000)}
     
     
      
    }

  })
 
  
  return (
    <div>
        <h3 className='mb-4'>{Bid!==undefined?"Edit":"Add"} Brand </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput name='title' type='text' label='Enter Brand name'  onChang={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} id="brand"/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-5 my-5 w-25' type='submit'>{Bid!==undefined?"Edit":"Add"} Brand</button>
            </form>
        </div>
    </div>
  )
}

export default Brand