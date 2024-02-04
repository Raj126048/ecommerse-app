import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { createCategory, getCategory, resetState, updateCategory } from '../features/pCategory/pCategorySlice';

  let schema=Yup.object().shape({
    title:Yup.string().required("Category name is required"),
   
  })

const AddCat = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const location=useLocation();
  const Cid=location.pathname.split("/")[4];

  useEffect(()=>{
    if(Cid !== undefined){
      dispatch(getCategory(Cid));

    
    }
    else{
      dispatch(resetState())
    }
  },[Cid])
  const newCategory=useSelector((state)=>state.pcategory);
  const{isSuccess,isError,isLoading,createdCategory,updatedCategory,getedCategory}=newCategory
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success("Category added successfully!")
    }
    if(updatedCategory&&isSuccess){
      toast.success("Category updated succesfully")
      navigate("/dashboard/admin/category-list")
    }
    if(isError){
      toast.error("something went wrong!")
    }
  },[isSuccess,isError,isLoading])
  const formik=useFormik({
    initialValues:{
      title:getedCategory||"",
   
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      if(Cid!==undefined){
        const data={id: Cid, cData: values}
        dispatch(updateCategory(data))
      }
      else{
        dispatch(createCategory(values))
        formik.resetForm();
        
        setTimeout(()=>{
          dispatch(resetState())
  navigate("/dashboard/admin/category-list")
        },3000)
        
      }
    
    }

  })
  
  
  return (
    <div>
        <h3 className='mb-4'>{Cid!==undefined?"Edit":"Add"} Category </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label='Enter Category'  onChang={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} id="category"/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                <button className='btn btn-success border-0 rounded-5 my-5 w-25' type='submit'>{Cid!==undefined?"Edit":"Add"}  Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCat