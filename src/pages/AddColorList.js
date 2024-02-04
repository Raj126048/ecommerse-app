import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { createColor, getColor, resetState, updateColor } from '../features/colors/colorSlice';
const AddColorList = () => {
  const location=useLocation();
  const Bid=location.pathname.split("/")[4];
  const dispatch=useDispatch();
  useEffect(()=>{
    if(Bid !== undefined){
      dispatch(getColor(Bid));

 
    
    }
    else{
      dispatch(resetState())
    }
  },[Bid])
  
  const newColor=useSelector((state)=>state.color);
  let{isSuccess,isError,isLoading,createdColor,updatedColor,getedColor}=newColor

  const navigate=useNavigate();
  let schema=Yup.object().shape({
    title:Yup.string().required("color name is required"),
   
  })

  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success("color added successfully!")
      isSuccess=false;
    }
    if(updatedColor&&isSuccess){
      toast.success("Color updated succesfully")
      navigate("/dashboard/admin/colors-list")
    }
    if(isError){
      toast.error("something went wrong!")
    }
  },[isSuccess,isError,isLoading,createdColor])
  const formik=useFormik({
    initialValues:{
      title:getedColor||"",
   
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      if(Bid!==undefined){
        const data={id: Bid, colorData: values}
        dispatch(updateColor(data))
      }
      else{
        dispatch(createColor(values))
        isSuccess=false;
        formik.resetForm();
        
        setTimeout(()=>{
          dispatch(resetState())
  navigate("/dashboard/admin/colors-list")
        },3000)

      }
     
      
    }

  })
  return (
    <div>
        <h3 className='mb-4'>{Bid!==undefined?"Edit":"Add"} Color </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type='color' label='Enter Color'  onChang={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} id="color"/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-5 my-5 w-25' type='submit'>{Bid!==undefined?"Edit":"Add"} Color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColorList