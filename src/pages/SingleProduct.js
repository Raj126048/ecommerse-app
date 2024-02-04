
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/Layout'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard'
import ReactStars from 'react-rating-stars-component'
import ReactImageZoom from 'react-image-zoom'
import watch from '../images/watch.jpg'
import Colors from '../components/Colors'
import { AiOutlineHeart } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RateProduct, getProduct, getProducts } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { addProdToCart, getUserCart } from '../features/auth/authSlice'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Container from '../components/Container'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




const SingleProduct = () => {
    const [alreadyAdded,setAlreadyAdded]=useState(false);
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const getProd=location.pathname.split("/")[(location.pathname.split("/").length)-1]
    console.log(getProd+"id")
    const newProduct=useSelector((state)=>state.product);
    const [popular,setPopular]=useState()
    const productState=useSelector(state=>state.product.singleProduct);
    const productsState=useSelector(state=>state.product.products);
 
      

useEffect(()=>{
    getAllProducts();
},[]);
const getAllProducts=()=>{
    dispatch(getProducts())
}
  useEffect(()=>{
    for (let index = 0; index < productsState.length; index++) {
        let data=[]
        const element = productsState[index];
        if(element.tags==="popular"){
data.push(element)
        }
        setPopular(data)
    }
    


  },[productState]) 
    if(newProduct===null){
        newProduct=[]
    }
    const uploadCart=()=>{
if(color===null){
    toast.error("please choose color")
    return false
}
else{
    dispatch(addProdToCart({productId:getedid,quantity,color,price:getedPrice}))
    dispatch(getUserCart()) 
    navigate("/cart")
}
    }
    const{isSuccess,isError,isLoading,createdproducts,getedid,updatedProduct,getedProduct,getedDescription,getedBrand,getedPrice,getedColor,getedTags,getedQuantity,getedImages,getedImage,getedCategory,getedRating}=newProduct
useEffect(()=>{
    dispatch(getProduct(getProd))
    dispatch(getUserCart())
},[])
    const copytoClipboard=(text)=>{
        console.log('text:',text);
        var textField=document.createElement('textarea');
        textField.innerText=text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy')
        textField.remove();
    }
  const cartState=useSelector((state)=>state.auth.getcartProduct)
  console.log(cartState)
    const [color,setColor]=useState(null);
    const [quantity,setQuantity]=useState(1);
    const url=getedImage||" "
    const props ={width:400,height:600,zoomWidth:600,img:url}
    const[orderedProduct,setOrderedProduct]=useState(true);

    useEffect(()=>{
        for(let index=0;index < (cartState?.length||0);index++){
            if(getProd===cartState[index]?.productId?._id){
                setAlreadyAdded(true)
            }
        }
    },[])

    const [star,setStar]=useState(null);
    const [comment,setComment]=useState(null);
    const addRating=(e)=>{
        e.preventDefault()
        if(star===null){
            toast.error("please add star rating")
            return false
        }else if(comment===null){
            toast.error("please write a review of the product")
            return false
        }else{
            dispatch(RateProduct({star:star,comment:comment,prodId:getedid}))
            setTimeout(()=>{ dispatch(getProduct(getProd))},300)

        }
    }
  return (

    <Layout title={productState?.title} >
        <BreadCrumb title={productState?.title}/>
        <div className='main-product-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl bg-white'>
                <div className='row'>
                    <div className='col-6 left-image'>
                        <div className='main-product-image'>
                            <div >
                                <ReactImageZoom {...props}/>
                            </div>
                        </div>
                     
                        <div className='other-product-images d-flex flex-wrap gap-15'>
                            {
                                getedImages?.map((item,index)=>{
                                    return(
                                        <div key={index}><img src={item?.url} className='img-fluid' alt='product'/></div>
                                    )
                                })
                            }


                        </div>

                    </div>
                    <div className='col-6'>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>
                                   {getedProduct}
                                </h3>
                            </div>
                            <div className='single-product-image'>
                            
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
          >    {
            getedImages?.map((item,index)=>{
                return(
            <SwiperSlide key={index}>
            <div className='swiper-product-image'>
        
            <div ><img src={item?.url} className='img-fluid' alt='product'/></div>    
                            </div>
            </SwiperSlide>
            
             )
         })
     }
    
          </Swiper>
      
                            </div>
                           
                            <div className='border-bottom py-3'>
                                <p className='price'>$ 100</p>
                                <div className='d-flex align-items-center gap-10'>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={getedRating}
                                    edit={false}
                                    activeColor='#ffd700'
                                    />
                                    <p className='mb-0 t-review'>(3 reviews)</p>
                                </div>
                                <a href='#review' className='review-btn'> write a review</a>
                            </div>
                            <div className='border-bottom py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type:</h3><p className='product-data'>watch</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand:</h3><p className='product-data'>{getedBrand}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category:</h3><p className='product-data'>{getedCategory}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags:</h3><p className='product-data'>{getedTags}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability:{getedQuantity}</h3>
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary '></span>
                                    </div>
                                    </div>
                                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size:</h3>
                                    <div className='d-flex flex-wrap gap-15 mt-3'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary  mx-2'>S</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary mx-2'>M</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary mx-2'>XL</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary mx-2'>XXL</span>
                                    </div>
                                    </div>
                                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    {
                                            alreadyAdded===false&&<>   
                                              <h3 className='product-heading mb-3'>Color:</h3>
                                    <Colors setColor={setColor} colorData={getedColor}/>
                                        </>
                                        }
                                  
                                    </div>
                                    <div className='d-flex  gap-10 flex-row mt-2 mb-3'>
                                        {
                                            alreadyAdded===false&&<>    <h3 className='product-heading'>Quantity:</h3>
                                            <div className=''>
                                                <input
                                                type='number'
                                                min={1}
                                                max={10}
                                                className='form-control'
                                                style={{width:"70px"}}
                                                onChange={(e)=>{setQuantity(e.target.value)}}
                                                value={quantity}/>
                                            </div ></>
                                        }
                                </div>
                                    <div className='d-flex single-b  align-items-center gap-30 mx-5'>
                                        <div>
                                    <button className='bnbutton border-0 mx-5' data-bs-toggle="model" data-bs-target="#staticBackdrop" type='button' onClick={()=>{alreadyAdded?navigate("/cart"):uploadCart()}}>{alreadyAdded?"Go to Cart":"Add to Cart"}</button></div>
                                    <div>
                                    <button className=' bnbutton bbn border-0' type='submit'>Buy it Now</button></div>
                                    </div>
                                    
                                    
                                    <div className='d-flex align-items-center gap-15'>
                                        <div>
                                            <a href='' ><AiOutlineHeart className='fs-5 me-3'/>copy product link</a>
                                        </div>

                                    </div>
                                    <div className='d-flex gap-10 flex-column  my-3'>
                                    <h3 className='product-heading'>shipping & Returns:</h3><p className='product-data'>Magnifier: Can be zoomed in/out by click, double click, tap, double tap, or long touch. Click/touch and drag to move around the image while zoomed in. Alternate ..</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'>copy product link:</h3>
                                    <a href='javascript:void(0)'onClick={()=>{copytoClipboard(window.location.href)}}>link</a>
                                    </div>
                                    
                         
                            </div>

                        </div>
                    </div>
                </div>
            </div>
      
        <div className='description-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl  p-4'>
                <div className='row'>
                    <div className='col-12'>
                    <h3 >Description</h3>
                        <div className='bg-white p-4'>
                        
                        <p className='description' dangerouslySetInnerHTML={{__html:getedDescription}}/>
                        
                        </div>
                    

                    </div>
                
                </div>
            </div>
        </div>
        <section id='review' className='reviews-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <h3>Reviews</h3>
                        <div className='review-inner-wrapper'>
                        <div className='review-head d-flex justify-content-between align-items-center'>
                            <div>
                                <h4 className='mb-2'>Customer reviews</h4>
                                <div className='d-flex gap-10 align-items-center'>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    value={4}
                                    edit={false}
                                    activeColor='#ffd700'
                                    />
                                    <p className='mb-0'>Based on 2 reviews</p>
                                </div>
                            </div>
                           {
                            orderedProduct&&(
                                <div>
                                <a className='text-dark text-decoration-underline'>Write a review</a>
                            </div>
                            )
                           }
                        </div>
                        <div className='review-form py-4'>
                            <h4>Write a review</h4>
                        <form onSubmit={(e)=>{addRating(e)} 
                       } className='d-flex flex-column gap-15'>
                            <div>
                            <ReactStars
                                    count={5}
                                    size={24}
                                    value={0}
                                    onChange={(e)=>{setStar(e)}}
                                    edit={true}
                                    activeColor='#ffd700'
                                    />
                            </div>
                           
                                <div>
                                    <textarea
                                    name=''
                                    id=''
                                    className='w-100 form-control'
                                    cols='30'
                                    rows='4'
                                    onChange={(e)=>{setComment(e.target.value)}}
                                    placeholder='Comments'>

                                    </textarea>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button className='bnbutton border-0'>Submit review</button>
                                </div>
                            </form>
                        </div>
                        <div className='reviews mt-4'>
                          {
                            productState&&productState?.ratings?.map((item,index)=>{
                                return(
                                    <div className='review'>
                                    <div key={index}  className='d-flex gap-10 align-items-center'>
                                      <h6  className='mb-0'>{item?.postedby?.firstname+" "+item?.postedby?.lastname}</h6>
                                    <ReactStars
                                              count={5}
                                              size={24}
                                              value={item?.star}
                                              edit={false}
                                              activeColor='#ffd700'
                                              />
                                    </div>
                                              <p className='mt-3'>{item?.comment}</p>
                                      </div>
                                )
                            })
                          }
                        </div>
                        </div>
                    </div>
                   
                </div>
            </div>
       
        </section>
        <section className='popular-wrapper py-5 home-wrapper-2'>
    <div className='container-xxl'>
      <div className='row'>
        <div className='col-12'>
          <h3 className='section-heading'>
            Our Popular Products
          </h3>
        </div>
        <ProductCard data={popular}/>
       
      
     
      </div>
    </div>
   </section>
   </div>
    </Layout>
  )
}

export default SingleProduct