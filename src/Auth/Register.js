import React ,{useState}from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import {  toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import{FaRegEye,FaEyeSlash} from "react-icons/fa"



const Register = () => { 
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [show,setShow]=useState(false);
   
    const navigate=useNavigate();
    function hanfleShow(){
  
      setShow(!show);
   }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
          const firstname=name;
          const lastname=address;
          const mobile =phone;
            const res= await axios.post('/api/user/register',{firstname,lastname,email,password,mobile});
          if(res.data.success){
            toast.success("register succesful");
            setTimeout(()=>{navigate("/login")},3000)
            

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
  return (
<Layout>
<div className="register">
  <div className='form  shadow p-3 mb-5  rounded' id='um'>
    <h1 className='reg'>REGISTER</h1>
<form onSubmit={handleSubmit}>
<div className="mb-3" id='boxi'>
    
    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="exampleInputName" aria-describedby="emailHelp" placeholder='Enter your first name'  required />
 
  </div>
  <div className="mb-3" id='boxi'>
    
    <input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} id="examplelastInputName" aria-describedby="emailHelp" placeholder='Enter your last name'  required />
 
  </div>
  <div className="mb-3" id='boxi'>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}  required />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 nu" id='boxi'>
   
    <input type={show?"text":"password"} className="form-control" id="exampleInputPassword1"   placeholder='Enter password' value={password} onChange={(e)=>setPassword (e.target.value)}  required  />
    <label onClick={hanfleShow}>{show?<FaRegEye/>:<FaEyeSlash/>}</label>
  </div>
  <div className="mb-3" id='boxi'>
    
    <input type="text" className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder='Enter your mobile number' value={phone} onChange={(e)=>setPhone(e.target.value)}  required />

  </div>
 
 
 
  <button type="submit" className="btn btn-primary">sign-in</button>
</form>
</div>
</div>
</Layout>
  )
}

export default Register