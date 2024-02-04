import React ,{useState}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { useNavigate,useLocation} from 'react-router-dom';
import{FaRegEye,FaEyeSlash} from "react-icons/fa"
import { useAuth } from '../context/auth';
import * as Yup from 'yup';
import {useFormik} from 'formik'

const Login = () => {
  let schema=Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required()
  })
  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:schema,

  })

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
const location=useLocation();
    const [show,setShow]=useState(false);
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    function hanfleShow(){
  
      setShow(!show);
   }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const res= await axios.post('/api/user/login',{email,password});
          if(res&&res.data.success){
            toast.success("login succesful");
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            setTimeout(()=>{ navigate(location.state||"/")},3000)
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
  return (
    <Layout>
<div className="register">
  <div className='login  shadow p-3 mb-5  rounded' id='um'>
    <h1 className='reg'>Login</h1>
<form onSubmit={handleSubmit}>

  <div className="mb-3" id='boxi'>
    <input type="email" name='email' className="form-control mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}  required />
    <div className='errors'>{formik.touched.email && formik.errors.email ?(
      <div>{formik.errors.email}</div>
    ):null}</div>
 
  </div>
  <div className="mb-3 nu" id='boxi'>
   
    <input type={show?"text":"password"} className="form-control mt-3" name='password' id="exampleInputPassword1"   placeholder='Enter password' value={password} onChange={(e)=>setPassword (e.target.value)}  required  />

    <label onClick={hanfleShow}>{show?<FaRegEye/>:<FaEyeSlash/>}</label>
  
  </div>
  <div  className='errors'> {formik.touched.password && formik.errors.password ?(
      <div>{formik.errors.password}</div>
    ):null}</div>
 
  <div className='mb-3'>
  <button type="button" className="btn btn-primary logbt" onClick={()=>{navigate('/forgot-password')}}>Forgot password ?</button>

  </div>
  
  <button type="submit" className="btn btn-primary ">Login</button>
</form>
</div>
</div>
</Layout>
  )
}

export default Login