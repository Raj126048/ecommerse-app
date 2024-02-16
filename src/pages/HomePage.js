import React, { useEffect } from 'react'
import Layout from '../components/Layouts/Layout'

import b2 from '../images/main-banner-1.jpg'
import c1 from '../images/catbanner-01.jpg'
import c2 from '../images/catbanner-02.jpg'
import c3 from '../images/catbanner-03.jpg'
import c4 from '../images/catbanner-04.jpg'


import cam from '../images/camera.jpg'
import tv from '../images/tv.jpg'
import watch from '../images/watch.jpg'
import laptop from '../images/laptop.jpg'

import app from '../images/headphone.jpg'
import Marquee from 'react-fast-marquee'
import b1 from '../images/brand-01.png'
import b22 from '../images/brand-02.png'
import b3 from '../images/brand-03.png'
import b4 from '../images/brand-04.png'
import b5 from '../images/brand-05.png'
import b6 from '../images/brand-06.png'
import b7 from '../images/brand-07.png'
import b8 from '../images/brand-08.png'




import SpeacialProductCard from '../components/SpeacialProductCard'
import Container from '../components/Container'
import { services } from './Admin/Utils/Data'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/product/productSlice'
import watch1 from '../images/watch-2.webp'
import ReactStars from 'react-rating-stars-component'
import {Link,  useNavigate } from 'react-router-dom'

import view from '../images/view.svg'
import wish from '../images/wish.svg'

import { addToWishList } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';
   
export const HomePage = () => {

 const navigate=useNavigate()

   const AddToWishList=(bid)=>{
       const data={id:bid}
   
dispatch(addToWishList(data))
   }
  const productState=useSelector(state=>state.product.products);
   
  const dispatch=useDispatch()
  useEffect(()=>{
      getAllProducts();
  },[]);
  const getAllProducts=()=>{
      dispatch(getProducts())
  }
 
  return (
    <Layout title={"New Offers"}> 
    <Container class1="s-wrapper">
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div className='main-banner  position-relative p-3'>
  <img src={b2} alt='banner1' className='img-fluid rounded-3'/>
  <div className='main-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
    <Link className='bnbutton'>BUY NOW</Link>
  </div>
</div></SwiperSlide>
        <SwiperSlide>    <div className='main-banner position-relative p-3'>
  <img src={c1} alt='banner1' className='img-fluid rounded-3'/>
  <div className='main-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div></SwiperSlide>
        <SwiperSlide><div className='main-banner position-relative p-3'>
  <img src={c3} alt='banner1' className='img-fluid rounded-3'/>
  <div className='main-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div></SwiperSlide>
        <SwiperSlide><div className='main-banner position-relative p-3'>
  <img src={c4} alt='banner1' className='img-fluid rounded-3'/>
  <div className='main-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div></SwiperSlide>

      </Swiper>
    </Container>
  <Container class1='home-wrapper-1  py-3'>
  <div className='row'>
      <div className='col-6'>
<div className='main-banner  position-relative p-3'>
  <img src={b2} alt='banner1' className='img-fluid rounded-3'/>
  <div className='main-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
    <Link className='bnbutton'>BUY NOW</Link>
  </div>
</div>
      </div>
      <div className='col-6'>
      <div className='d-flex flex-wrap justify-content-between gap-10 align-items-center'>
      <div className='small-banner position-relative p-3'>
  <img src={c1} alt='banner1' className='img-fluid rounded-3'/>
  <div className='small-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div>
<div className='small-banner position-relative p-3'>
  <img src={c2} alt='banner1' className='img-fluid rounded-3'/>
  <div className='small-banner-content position-absolute container-fluid'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div>
<div className='small-banner position-relative p-3'>
  <img src={c3} alt='banner1' className='img-fluid rounded-3'/>
  <div className='small-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div>
<div className='small-banner position-relative p-3'>
  <img src={c4} alt='banner1' className='img-fluid rounded-3'/>
  <div className='small-banner-content position-absolute'>
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad s13+ pro</h5>
    <p>From $999.00 0r$41.62/mo.</p>
   
  </div>
</div>

      </div>
      </div>
    </div>
  </Container>
   <Container class1='home-wrapper-2 py-5'> <div className="row">
        <div className="col-12">
          <div className='services d-flex align-items-center justify-content-between'>
        {
          services?.map((i,j)=>{
            return(
              <div className='d-flex aligb-items-center gap-15' key={j}>
                <img src={i.image} alt='services'/>
                <div>
                <h6>{i.title}</h6>
                <p className='mb-0'>{i.tagline}</p>
                </div>
              </div>
            );
          })
        }
          </div>
        </div>
      </div></Container>
  <Container class1='home-wrapper-3 py-5'>
  <div className='row'>
        <div className='col-12'>
          <div className='categories d-flex justify-content-between flex-wrap align-items-center'>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Headphones</h6>
                <p>10 items</p>
              </div>
              <img src={app} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cameras</h6>
                <p>10 items</p>
              </div>
              <img src={cam} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Smart Tv</h6>
                <p>10 items</p>
              </div>
              <img src={tv} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6> Gaming</h6>
                <p>10 items</p>
              </div>
              <img src={cam} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Headphones</h6>
                <p>10 items</p>
              </div>
              <img src={app} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cameras</h6>
                <p>10 items</p>
              </div>
              <img src={cam} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Smart Tv</h6>
                <p>10 items</p>
              </div>
              <img src={tv} alt='camera'/>
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6> Gamming</h6>
                <p>10 items</p>
              </div>
              <img src={cam} alt='camera'/>
            </div>

          </div>
        </div>
      </div>
  </Container>
  <Container class1='marquee-wrapper py-5'>
<div className='row'>
        <div className='col-12'>
          <div className='marquee-inner-wrapper card-wrapper'>
            <Marquee>
              <div className="mx-4 mb-25">
                <img src={b1} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b22} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b3} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b4} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b5} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b6} alt='brand'/>
              </div>
               <div className="mx-4 mb-25">
                <img src={b7} alt='brand'/>
              </div>
              <div className="mx-4 mb-25">
                <img src={b8} alt='brand'/>
              </div>
            </Marquee>
          </div>
        </div>
      </div>
</Container>
  <Container class1='product-wrapper py-5 home-wrapper-2'>
  <div className='row'>
        <div className='col-12'>
          <h3 className='section-heading'>
            Featured Collections
          </h3>
        </div>
        {
          productState && productState?.map((item,index)=>{
            console.log(item.tags)
             if(item.tags==='featured'){
              
       
            return(
             
              <div key={index} className={'gr-3 mb-3 pr'}>
                
              <div className='product-card position-relative'>
                  <div className='wishlist-icon position-absolute'>
                      <button className='border-0 bg-transparent' onClick={(e)=>{AddToWishList(item?._id)
                      toast.success("product added to wishlist")}}>
                      <img src={wish} alt='wishlist'/></button>
                      
                  </div>
                  <Link to={'product/'+item?._id}>
                  <div className='product-image'>
                      <img className='im img-fluid ' src={item?.images[0]?.url} alt='product img'/>
                      <img className='im img-fluid' src={watch1} alt='product img'/>
                  </div>
                  </Link>
                  <div className='product-details'>
                      <h6 className='brand'> {item?.brand}</h6>
                      <h5 className='product-title'>
                          {item?.title}
                      </h5>
                      <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor='#ffd700'/>
                      <p className={'d-none'} 
                   dangerouslySetInnerHTML={{__html:item?.description}}
                      /> 
                      <p className='price'>${item?.price}</p>
                  </div>
                  <div className='action-bar position-absolute'>
                      <div className='d-flex flex-column'>
                          <button className='border-0 bg-transparent'>
                          <img src={view} onClick={()=>{navigate(`product/${item?._id}`)}} alt='addcart'/>
                          </button>
                   
                      </div>
                  </div>
              </div>
            
          </div>
            )}
          })
        }
       
      
      
     
      </div>
  </Container>
<Container class1='famous-wrapper py-5 home-wrapper-2'>
<div className='row'>
        <div className='col-3'>
          <div className='famous-card position-relative'>
            <img src={watch} className='img-fluid' alt='watch'/>
            <div className='famous-content position-absolute'>
              <h5>Big Screen</h5>
              <h6>Smart Watch series 7</h6>
              <p>From $399 or $16.62/mo for 24 mo</p>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='famous-card position-relative'>
            <img src={laptop} className='img-fluid im2' alt='watch'/>
            <div className='famous-content position-absolute'>
              <h5>Big Screen</h5>
              <h6>Smart Watch series 7</h6>
              <p>From $399 or $16.62/mo for 24 mo</p>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='famous-card position-relative'>
            <img src={watch} className='img-fluid' alt='watch'/>
            <div className='famous-content position-absolute'>
              <h5>Big Screen</h5>
              <h6>Smart Watch series 7</h6>
              <p>From $399 or $16.62/mo for 24 mo</p>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='famous-card position-relative'>
            <img src={laptop} className='img-fluid im2' alt='watch'/>
            <div className='famous-content position-absolute'>
              <h5>Big Screen</h5>
              <h6>Smart Watch series 7</h6>
              <p>From $399 or $16.62/mo for 24 mo</p>
            </div>
          </div>
        </div>
      </div>
</Container>
<Container class1='special-wrapper py-5 home-wrapper-2'>
<div className='row'>
        <div className='col-12'>
          <h3 className='section-heading'>
            Speacial Products
          </h3>
        </div>
      </div>
      <div className='row'>
        {
          productState && productState?.map((item,index)=>{
             if(item?.tags==='speacial'){
            return(
             
              <SpeacialProductCard key={index} title={item?.title} brand={item?.brand} totalRating={item?.totalrating.toString()} price={item?.price} url={item?.images[0]?.url} sold={item?.sold} quantity={item?.quantity} id={item?._id}/>
            )}
          })
        }
       
      
      </div>
    
</Container>
 <Container class1='popular-wrapper py-5 home-wrapper-2'>
 <div className='row'>
        <div className='col-12'>
          <h3 className='section-heading'>
            Our Popular Products
          </h3>
        </div>
        {
          productState && productState?.map((item,index)=>{
             if(item?.tags==='popular'){
            return(
             
              <div key={index} className={'gr-3 mb-3 pr'}>
                
              <div className='product-card position-relative'>
                  <div className='wishlist-icon position-absolute'>
                      <button className='border-0 bg-transparent' onClick={(e)=>{AddToWishList(item?._id)
                      toast.success("product added to wishlist")}}>
                      <img src={wish} alt='wishlist'/></button>
                      
                  </div>
                  <Link to={'product/'+item?._id}>
                  <div className='product-image'>
                      <img className='im img-fluid ' src={item?.images[0]?.url} alt='product img'/>
                      <img className='im img-fluid' src={watch1} alt='product img'/>
                  </div>
                  </Link>
                  <div className='product-details'>
                      <h6 className='brand'> {item?.brand}</h6>
                      <h5 className='product-title'>
                          {item?.title}
                      </h5>
                      <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor='#ffd700'/>
                      <p className={'d-none'} 
                   dangerouslySetInnerHTML={{__html:item?.description}}
                      /> 
                      <p className='price'>${item?.price}</p>
                  </div>
                  <div className='action-bar position-absolute'>
                      <div className='d-flex flex-column'>
                        
                          <button className='border-0 bg-transparent'>
                          <img src={view} onClick={()=>{navigate(`product/${item?._id}`)}} alt='addcart'/>
                          </button>
                       
                      </div>
                  </div>
              </div>
            
          </div>
            )}
          })
        }
     
      
     
      </div>
 </Container>



    </Layout>
   
  )
}
