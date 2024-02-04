import React ,{useState}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import{FaRegEye,FaEyeSlash} from "react-icons/fa"
import { useFormik } from 'formik';
import { useAuth } from '../context/auth';
import * as Yup from 'yup';
import { base_url } from '../utils/base_url';


const ForgotPassword = () => {
  const [auth,setAuth]=useAuth()
  const navigate=useNavigate()
  let schema=Yup.object().shape({
    email:Yup.string().email().required("email is required"),
    
  })
  const formik=useFormik
  ({
    initialValues:{
      email:"",
      
    },
    validationSchema:schema,
    onSubmit:async(values)=>{
      try{
        const res= await axios.post(`${base_url}/user/forgot-password-token`,{email:values.email});
      if(res.data){
        toast.success("Forget password mail sent successfully ");
  
       
       
       ;

      }
      else{
        toast.error(res.data.message)
        console.log("noo buddy")
      }
    }
    catch(error){
        console.log(error);
        toast.error('Something went Wrong')

    }
    }

  })

 

 
   

  return (
    <Layout title={"Forgot-password-Shopholic"}>
   <div className="register">
  <div className='login  shadow p-3 mb-5  rounded' id='um'>
    <h1 className='reg'>Reset Password</h1>
    <p className='text-center mt-2 mb-3' > We will send you an email to reset your password</p>
<form onSubmit={formik.handleSubmit}>

  <div className="mb-3" id='boxi'>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Enter your Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
    <div className='error'>{formik.touched.email && formik.errors.email }
   </div>
   </div>
 
 



  
  <button type="submit" className="btn btn-primary ">Reset</button>
</form>
</div>
</div>
    </Layout>
  )
}

export default ForgotPassword