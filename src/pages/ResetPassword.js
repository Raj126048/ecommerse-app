import React ,{useState}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';
import{FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import { useAuth } from '../context/auth';
import * as Yup from 'yup';
import {useFormik} from 'formik'

const ResetPassword = () => {
    const [show,setShow]=useState(false);
    const [how,sethow]=useState(false);
 
    const navigate=useNavigate();
    function hanfleShow(){
  
      setShow(!show);
   }
   function hanflehow(){
  
    sethow(!how);
 }
    const location=useLocation()
    const token=location.pathname.split("/")[2]
  let schema=Yup.object().shape({
    
    password:Yup.string().required("password is required"),
    confirmPassword:Yup.string().required("confirm passsword is required")
  })
  const formik=useFormik({
    initialValues:{
   
      password:"",
      confirmPassword:""
    },
    validationSchema:schema,
    onSubmit:async(values)=>{
        if(values.password!==values.confirmPassword){
            toast.error("password not matching")
        }
        else{
        
        try{
            const res= await axios.put(`/api/user/reset-Password/${token}`,{password:values.password});
          if(res.data){
            toast.success("ResetPassword succesful");
            setTimeout(()=>{navigate("/login")},3000)
    
           ;

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

  }})

  
 
  return (
    <Layout>
<div className="register">
  <div className='ResetPassword  shadow p-3 mb-5  rounded' id='um'>
    <h1 className='reg'>ResetPassword</h1>
<form onSubmit={formik.handleSubmit}>


  <div className="mb-3 nu" id='boxi'>
   <div className='d-flex justify-content-between align-items-center'>
    <input type={show?"text":"password"} className="form-control mt-3" name='password' id="exampleInputPassword1"   placeholder='Enter password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}  />
    <label onClick={hanfleShow}>{show?<FaRegEye/>:<FaRegEyeSlash/>}</label>
    </div>
   
   
  </div>
  <div  className='error'> {formik.touched.password && formik.errors.password }</div>
  
  <div className="mb-3 nu" id='boxi'>
  <div className='d-flex justify-content-between align-items-center'>
    <input  type={how?"text":"password"} className="form-control mt-3" name='password' id="exampleInputPassword1"   placeholder='Enter confirm password' value={formik.values.confirmPassword} onChange={formik.handleChange("confirmPassword")} onBlur={formik.handleBlur("confirmPassword")}    />
    <label onClick={hanflehow}>{how?<FaRegEye/>:<FaRegEyeSlash/>}</label>
   </div>

  </div>
  <div  className='error'> {formik.touched.confirmPassword && formik.errors.confirmPassword }</div>
  

  
  <button type="submit" className="btn btn-primary ">Reset</button>
</form>
</div>
</div>
</Layout>
  )
}

export default ResetPassword