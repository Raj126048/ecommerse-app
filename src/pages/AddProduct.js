import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {InboxOutlined} from '@ant-design/icons'
import {message,Upload} from 'antd'
import * as Yup from 'yup';
import {useFormik} from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import {getbrands} from "../features/brand/brandSlice.js"
import { getCategories, getCategory } from '../features/pCategory/pCategorySlice.js';
import { getColors } from '../features/colors/colorSlice';
import {Select} from 'antd'
import Dropzone from 'react-dropzone'

import { delImg, uploadImg } from '../features/upload/uploadSlice.js';
import { createProducts, getProduct, resetState, updateProduct } from '../features/product/productSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


let schema=Yup.object().shape({
    title:Yup.string().required("title is required"),
    description:Yup.string().required("description is required"),
    price:Yup.number().required("price is required"),
    brand:Yup.string().required("Brand is required"),
    category:Yup.string().required("category is required"),
    tags:Yup.string().required("Tag is required"),
    color:Yup.array().min(1,"pick atleast one color").required('Colors are required'),
     quantity:Yup.number().required("Quantity is required"),
  })
  

const AddProduct = () => {

  const location=useLocation();
  const Bid=location.pathname.split("/")[4];

  useEffect(()=>{
    if(Bid !== undefined){
      dispatch(getProduct(Bid));

   
 
    
    }
    else{
      dispatch(resetState())
    }
  },[Bid])

   
    const dispatch=useDispatch();
    const [color,setColor]=useState();
    const [images,setImage]=useState();
    useEffect(()=>{
        dispatch(getbrands());
        dispatch(getCategories());
        dispatch(getColors());
      

    },[])
  
    const brandState=useSelector((state)=>state.brand.brands)
    const pCategoryState=useSelector((state)=>state.pcategory.pCategories)
    const colorState=useSelector((state)=>state.color.colors);
    const imgState=useSelector((state)=>state.upload.images);
    const newProduct=useSelector((state)=>state.product);
    const{isSuccess,isError,isLoading,createdproducts,updatedProduct,getedProduct,getedDescription,getedBrand,getedPrice,getedColor,getedTags,getedQuantity,getedImages,getedCategory}=newProduct
    useEffect(()=>{
      if(isSuccess && createdproducts){
        toast.success("product added successfully!")
      }
      if(updatedProduct&&isSuccess){
        toast.success("Product updated succesfully")
        navigate("/dashboard/admin/product-list")
      }
      if(isError){
        toast.error("something went wrong!")
      }
    },[isSuccess,isError,isLoading])
 const navigate =useNavigate();
  const coloropt=[];
  colorState.forEach((i)=>{
    coloropt.push({
    label:i.title,
    value: i._id,
    })
  })
  const img=[];
  imgState.forEach((i)=>{
    img.push({
      public_id:i.public_id,
    url: i.url,
    })
  })
  useEffect(()=>{
    formik.values.color=color?color:" ";
    formik.values.images=img;
  },[])
console.log(getedProduct)
    const formik=useFormik({
      enableReinitialize:true,
        initialValues:{
          title:getedProduct||"",
          description:getedDescription||"",
          price:getedPrice||"",
          brand:getedBrand||"",
          color:getedColor||"",
          category:getedCategory|"",
          tags:getedTags||"featured",
          quantity:getedQuantity||"",
          images:getedImages||""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
          if(Bid!==undefined){
            const data={id: Bid, brandData: values}
            dispatch(updateProduct(data))
          }
          else{
            dispatch(createProducts(values))
            formik.resetForm();
            setColor(null);
            setTimeout(()=>{
              dispatch(resetState())
  navigate("/dashboard/admin/product-list")
            },3000)
          }
        
          
        }
    
      })
    const [desc,setDesc]=useState();
    const handleDesc=(e)=>{
        setDesc(e);
    }

    const handleColors=(e)=>{
setColor(e);
console.log(color);
    }
  return (
    <div>
        <h3 className='mb-4'>Add Product</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput  name="name" label='Enter product name' onChang={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
               <div className='mb-4'> <ReactQuill
                theme='snow'
             
                onChange={formik.handleChange('description')}  value={formik.values.description} 
               
                />
                 <div className='error'>
                    {formik.touched.description && formik.errors.description}
                  </div></div>
                  <CustomInput  name='price' label='Enter product price' onChang={formik.handleChange('price')} onBlr={formik.handleBlur('price')}  val={formik.values.price}/>
                  <div className='error'>
                    {formik.touched.price && formik.errors.price}
                  </div>
<select className='form-control py-3 mb-3' type='text'  label='Enter product category' onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')}  value ={formik.values.category}>
    <option >Select Category</option>
    {pCategoryState.map((i,j)=>{
        return <option key={j} value={i.title}>{i.title}</option>
    })}
</select>
<div className='error'>
                    {formik.touched.category && formik.errors.category}
                  </div>
                  <select className='form-control py-3 mb-3' name='tags' type='text'  label='Enter product tags' onChange={formik.handleChange('tags')} onBlur={formik.handleBlur('tags')}  value ={formik.values.tags}>
    <option disabled>Select Tags</option>
    <option value='featured'>Featured</option>
    <option value='popular'>Popular</option>
    <option value='speacial'>Special</option>
   
</select>
<div className='error'>
                    {formik.touched.tags && formik.errors.tags}
                  </div>
<Select mode="multiple" allowClear className='w-100' placeholder='select colors' defaultValue={color}  onChange={(i)=>handleColors(i)} value={formik.values.color}  options={coloropt} />
<div className='error'>
                    {formik.touched.color && formik.errors.color}
                  </div>

<select  className='form-control py-3 mb-3' type='text' name='brand' label='Enter product brand' onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')}  value={formik.values.brand} >
    <option>Select Brand</option>
    {brandState.map((i,j)=>{
        return <option key={j} value={i.title}>{i.title}</option>
    })}
</select>
<div className='error'>
                    {formik.touched.brand && formik.errors.brand}
                  </div>
<CustomInput type='number' label='Enter product quantity'  name='quantity'  onChang={formik.handleChange('quantity')} onBlr={formik.handleBlur('quantity')}  val={formik.values.quantity}/>
<div className='bg-white border-1 p-5 text-center'>
<Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>

</div>
<div className='showimages d-flex flex-wrap gap-3'>
  {imgState.map((i,j)=>{
    return(<div className='position-relative' key={j}>
      <button type='button' className='btn-close position-absolute' style={{top:'10px',right:'10px'}} onClick={()=>{
        dispatch(delImg(i.public_id))
      }}></button>
      <img src={i.url} alt='uploads' width={200} height={200} className='m-2'/>
    </div>)
  })}
  
</div>

 <button className='btn btn-success border-0 rounded-5 my-5 w-25' type='submit'>Add Product</button>
            </form>
        </div>

    </div>
  )
}

export default AddProduct