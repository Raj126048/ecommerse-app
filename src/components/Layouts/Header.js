import React, { useEffect, useState } from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";
import { BsSearch } from 'react-icons/bs';
import { useAuth } from '../../context/auth';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { array } from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import { getProduct } from '../../features/product/productSlice';


const Header = () => {
  const [paginate, setPaginate] = useState(true);
  const [auth,setAuth]=useAuth();
  const [hov,setHov]=useState(false);
  const [hov2,setHov2]=useState(false);
  const productState=useSelector((state)=>state?.product?.products)
  const [productOpt,setProductOpt]=useState()
  const navigate=useNavigate()
  const handleHover=()=>{
   
    setHov(true);
  }
  useEffect(()=>{
    let data=[]
    for(let index=0;index<productState.length;index++){
      const element=productState[index]
      data.push({id:index,prod:element?._id,name:element?.title })
    }
    setProductOpt(data)
  },[productState])
  const  dispatch=useDispatch();
  
  const cartState=useSelector((state)=>state?.auth?.getcartProduct)
  const [len,setLen]=useState(null)
  useEffect(()=>{
    let l=0;
    l=(cartState?.length)||0
    setLen(l)
  },[cartState])
  const handleHover2=()=>{
   
    setHov2(true);
  }
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  }
  return (
    <> 
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid header ">
    <Link to='/' className="navbar-brand " ><GiShoppingBag/>Shopholic</Link>
    <div className='clasic' >
      <div className='claasic'>
   <div className="input-group ">
   <Typeahead
id="pagination-example"
onPaginate={() => console.log('Results paginated')}
options={productOpt}
paginate={paginate}
minLength={2}
onChange={(selected)=>{
  console.log(selected);
  
    try{

  if(selected!==undefined){
    navigate(`/product/${selected[0]?.prod}`)
   dispatch(getProduct(selected[0]?.prod))}}
   catch(error){
    console.log("");
   }
  
}}
labelKey={"name"}
placeholder="Search for products here..."
/>
  <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs-5'/></span>
</div>
</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button></div>
    <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
        <li className="nav-item dropdown">
  <NavLink className={`nav-link dropdown-toggle ${hov2?'show':""} `} href="#" onMouseEnter={handleHover2} onMouseLeave={()=>{ setTimeout(9000,setHov2(false))}} role="button" data-bs-toggle="dropdown" aria-expanded={`${hov?'true':'false'}`}>
    Home
  </NavLink>
  <ul className={`dropdown-menu ${hov2?'show':""}`} onMouseEnter={handleHover2} onMouseLeave={()=>{setHov2(false)}}>
    <li><NavLink to='/'className="dropdown-item hom">Home Page</NavLink></li>
    <li className="nav-item">
          <NavLink to='/store'   className="dropdown-item">Our store</NavLink>
        </li>

  </ul>
</li>
        
        

       {
        !auth.user?(
          <>
           <li className="nav-item">
          <NavLink to='/register'  className="nav-link" href="#">Sign up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login'  className="nav-link" href="#">Login</NavLink>
        </li>
        </>
        ):(<>
              <li className="nav-item dropdown">
  <NavLink className={`nav-link dropdown-toggle ${hov?'show':""} `} href="#" onMouseEnter={handleHover} onMouseLeave={()=>{ setTimeout(9000,setHov(false))}} role="button" data-bs-toggle="dropdown" aria-expanded={`${hov?'true':'false'}`}>
    {auth?.user?.firstname}
  </NavLink>
  <ul className={`dropdown-menu ${hov?'show':""}`} onMouseEnter={handleHover} onMouseLeave={()=>{setHov(false)}}>
    <li><NavLink to={`/dashboard/${auth?.user?.role === 'admin' ?'admin':'user'}`} className="dropdown-item">Dashboard</NavLink></li>
    <li className="nav-item">
          <NavLink to='/login' onClick={handleLogout}  className="dropdown-item" href="#">Logut</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/dashboard/user/wishlist'   className="dropdown-item">Wish list</NavLink>
        </li>
  </ul>

</li>
<li className="nav-item">
          <NavLink to='dashboard/user/orders'  className="nav-link" href="#">Orders</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='dashboard/user/profile'  className="nav-link" href="#">Profile</NavLink>
        </li>

        
        </>)
       }
        <li className="nav-item">
          <NavLink to='/cart'  className="nav-link" href="#">Cart [{len}]</NavLink>
        </li>
       
      </ul>
   
    </div>
  </div>
</nav>

     </>
  )
}

export default Header