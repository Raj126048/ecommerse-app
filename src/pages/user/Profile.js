import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'

import Container from '../../components/Container'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import { config } from '../../utils/axiosconfig'
import BreadCrumb from '../../components/BreadCrumb'
import {FiEdit} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const navigate=useNavigate()
  let schema=Yup.object().shape({
    firstname:Yup.string().required("firstname is required"),
    lastname:Yup.string().required("lastname is required"),
    email:Yup.string().email().required("email is required"),
    mobile:Yup.number().required("mobile is required"),
   
  })
  const dispatch=useDispatch()
  const [auth,setAuth]=useAuth()
  const [edit,setEdit]=useState(true)
  const formik=useFormik({
    initialValues:{
      firstname:auth?.user?.firstname||"",
      lastname:auth?.user?.lastname||"",
      email:auth?.user?.email||"",
      mobile:auth?.user?.mobile||""
    },
    validationSchema:schema,
    onSubmit:async(values)=>{

      try{
        const firstname=values.firstname
        const lastname=values.lastname
        const email=values.email
        const mobile=values.mobile
       
    
          const res= await axios.put('/api/user/edit-user',{firstname:firstname,lastname:lastname,email:email,mobile:mobile},config);
   
          if(res.data){
            toast.success("profile update succesful");
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
           setTimeout(()=>{navigate("/login")},2000) 
          
  setEdit(true)
        }
        else{
          toast.error(res.data.message)
        }
      }
      catch(error){
          console.log(error);
          toast.error('Something went Wrong')
  
      }
    }

  })
 

  return (

    <Layout title={'your profile'}>
          <BreadCrumb title="my-profile"/>
   <Container class1="cart-wrapper home-wrapper-2 py-3">
    <div className='row'>
      <div className='col-12'>
        <div className='d-flex justify-content-between align-items-center'>
        <h3 className='my-3'> Update profile</h3>
        <FiEdit onClick={()=>{setEdit(false)}}/>
        </div>
     
<form onSubmit={formik.handleSubmit}>

  <div className="form-group">
    <label htmlFor="example1">First Name</label>
    <input disabled={edit} type="text" name='firstname' className="form-control" id="example1" aria-describedby="emailHelp" placeholder="Enter first name" value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}/>
    <div className='error'>{
      formik.touched.firstname&&formik.errors.firstname
}</div>

  </div>
  <div className="form-group">
    <label htmlFor="example2">Last Name</label>
    <input disabled={edit} type="text" name='lastname' className="form-control" id="example2" aria-describedby="emailHelp" placeholder="Enter last name"  value={formik.values.lastname}  onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")} />
    <div className='error'>{
      formik.touched.lastname&&formik.errors.lastname
}</div>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input disabled={edit} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  value={formik.values.email}  onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}  />
    <div className='error'>{
      formik.touched.email&&formik.errors.email
}</div>
  </div>
  <div className="form-group">
    <label htmlFor="example3">Mobile</label>
    <input disabled={edit} type="text" name='mobile' className="form-control" id="example3" aria-describedby="emailHelp" placeholder="Enter mobile no"  value={formik.values.mobile}  onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} />
    <div className='error'>{
      formik.touched.mobile&&formik.errors.mobile
}</div>
  </div>

  <button style={{display:edit?"none":"block",width:"100px"} }  type="submit" className="btn btn-primary mx-3 my-3 ">Save</button>
</form>

      </div>

    </div>
   </Container>
    </Layout>
  )
}

export default Profile