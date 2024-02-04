import BreadCrumb from '../components/BreadCrumb'
import Layout from '../components/Layouts/Layout'
import watch from '../images/watch.jpg'

import React, { useEffect, useState } from 'react'

import barr from '../images/gr.svg'
import barr1 from '../images/gr2.svg'
import barr2 from '../images/gr3.svg'
import barr3 from '../images/gr4.svg'
import ProductCard from '../components/ProductCard.js'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/product/productSlice.js'
import watch1 from '../images/watch-2.webp'
import ReactStars from 'react-rating-stars-component'
import {Link,  useLocation, useNavigate } from 'react-router-dom'
import addc from '../images/add-cart.svg'
import view from '../images/view.svg'
import wish from '../images/wish.svg'
import Typography from '@mui/material/Typography';
import { addToWishList } from '../features/product/productSlice'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const OurStore = () => {

    const productState=useSelector((state)=>state?.product?.products)
const [brands,setBrands] =useState([])
const [categories,setCategories] =useState([])
const [tags,setTags] =useState([])
const [colors,setColors] =useState([])

//filter
const [tagie,setTagie] =useState([])
const [brand,setBrand] =useState([])
const [categorie,setCategorie] =useState([])
const [color,setColor] =useState([])
const [minPrice,setMinPrice]=useState();
const [maxPrice,setMaxPrice]=useState();
const [sort,setSort]=useState()
const navigate=useNavigate()
const anchor="bottom"
const [value, setValue] = React.useState(0);
useEffect(()=>{
    let newBrand=[]
    let category=[]
    let tag=[]
    let newcolor=[]
    for (let index = 0; index < productState.length; index++) {
        const element = productState[index];
        newBrand.push(element.brand)
        category.push(element.category)
        tag.push(element.tags)
        newcolor.push(element.color)
        
    }
    setBrands(newBrand)
    setTags(tag)
    setColors(newcolor)
    setCategories(category)
},[productState])
    const [grid,setGrid]=useState(4);
  
const dispatch=useDispatch()
useEffect(()=>{
    getAllProducts();
},[sort,tagie,brand,categorie,minPrice,maxPrice]);
const getAllProducts=()=>{
    dispatch(getProducts({sort,tagie,brand,categorie,minPrice,maxPrice}))
}

const handleChange = (event, newValue) => {
  setValue(newValue);
};

    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, display:"flex"}}
          role="presentation"
          
          onKeyDown={toggleDrawer(anchor, false)}
        >
    <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Categories" {...a11yProps(0)} />
        <Tab label="Tags" {...a11yProps(1)} />
        <Tab label="Brands" {...a11yProps(2)} />
        <Tab label="Price" {...a11yProps(3)} />
        <Tab label="Sort" {...a11yProps(4)} />
      
      </Tabs>
      <TabPanel value={value} index={0}>
      <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Show by Category
                        </h3>
                        <div>
                            <ul className='ps-0'>
                                {
                                    categories&&[... new Set(categories)].map((item,index)=>{
                                        return(
<li key={index} onClick={()=>{setCategorie(item)
toggleDrawer(anchor, false)}}>{item}</li>
                                        )
                                    })
                                }
                               
                            </ul>
                        </div>
                    </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Product Tags 
                        </h3>
                        <div>
                            <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                            {
                                    tags&&[... new Set(tags)].map((item,index)=>{
                                        return(
                                            <span  key={index} onClick={()=>{setTagie(item)}} className=' text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 mb-3 mx-1'>{item}</span>

                                        )
                                    })
                                }
                               
                                
                            </div>
                        </div>
                    </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Product Brands 
                        </h3>
                        <div>
                            <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                            {
                                    brands&&[... new Set(brands)].map((item,index)=>{
                                        return(
                                            <span  key={index} onClick={()=>{setBrand(item)}} className=' text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 mb-3 mx-1'>{item}</span>

                                        )
                                    })
                                }
                               
                                
                            </div>
                        </div>
                    </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      
                          <div className='d-flex align-items-center gap-10'>
                          
                          <div className="form-floating mb-3">
  <input type="number" className="form-control" style={{height:"15px"}} onChange={(e)=>{setMinPrice(e.target.value)}} id="floatingInput" />
  <label htmlFor="floatingInput">From</label>
</div>


<div className="form-floating mb-3">
  <input type="number" class="form-control" style={{height:"15px"}} onChange={(e)=>{setMaxPrice(e.target.value)}} id="floatingInput" />
  <label htmlFor="floatingInput">From</label>
</div>
                          </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div className='d-flex align-items-center gap-10'>
                     <div>       <p className='mb-0d-block' style={{'width':'100px'}}>Sort by</p></div>
                            <select className='form-control form-select' onChange={(e)=>setSort(e.target.value)}>
                          
                                <option value='title'>Alphabetical, from A to Z</option>
                                <option value='-title'>Alphabetical, Z to A</option>
                                <option value='price'>Price ,low to high</option>
                                <option value='-price'> Price, high to low</option>
                                <option value='createdAt'>Date, old to new</option>
                                <option value='-createdAt'>Date, new to old</option>
                            </select>
                        </div>
      </TabPanel>
   
        </Box>
      );   
      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
      } 

  return (
    <Layout title='our store'>
    <BreadCrumb title='our store'/>
    <div className='store-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-3'>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Show by Category
                        </h3>
                        <div>
                            <ul className='ps-0'>
                                {
                                    categories&&[... new Set(categories)].map((item,index)=>{
                                        return(
<li key={index} onClick={()=>{setCategorie(item)}}>{item}</li>
                                        )
                                    })
                                }
                               
                            </ul>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Filter by
                        </h3>
                        <div>
                            <h5 className='sub-title'>Availability</h5>
                          <div>

                          <div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='in-stock' id='1'/>
                                <label className='form-check-label' >In stock[1]</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='out-stock' id='2' defaultChecked/>
                                <label className='form-check-label'>out of stock[0]</label>
                            </div>
                          </div>
                          <h5 className='sub-title'>Price</h5>
                          <div className='d-flex align-items-center gap-10'>
                          <div className="form-floating mb-3">
  <input type="number" className="form-control" style={{height:"15px"}} onChange={(e)=>{setMinPrice(e.target.value)}} id="floatingInput" />
  <label htmlFor="floatingInput">From</label>
</div>


<div className="form-floating mb-3">
  <input type="number" class="form-control" style={{height:"15px"}} onChange={(e)=>{setMaxPrice(e.target.value)}} id="floatingInput" />
  <label htmlFor="floatingInput">From</label>
</div>
                          </div>
                          
                          <h5 className='sub-title'> colors</h5>
<div className='d-flex flex-wrap'>
    <ul className='colors'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
<h5 className='sub-title'> Size</h5>
<div>
<div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='in-stock' id='color-1'/>
                                <label className='form-check-label' htmlFor='color-1' >S[1]</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' value='in-stock' id='color-2'/>
                                <label className='form-check-label' htmlFor='color-2' >M[2]</label>
                            </div>
</div>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Product Tags 
                        </h3>
                        <div>
                            <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                            {
                                    tags&&[... new Set(tags)].map((item,index)=>{
                                        return(
                                            <span  key={index} onClick={()=>{setTagie(item)}} className=' text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 mb-3 mx-1'>{item}</span>

                                        )
                                    })
                                }
                               
                                
                            </div>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                            Product Brands 
                        </h3>
                        <div>
                            <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                            {
                                    brands&&[... new Set(brands)].map((item,index)=>{
                                        return(
                                            <span  key={index} onClick={()=>{setBrand(item)}} className=' text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 mb-3 mx-1'>{item}</span>

                                        )
                                    })
                                }
                               
                                
                            </div>
                        </div>
                    </div>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>
                           Random Products
                        </h3>
                        <div className='random-products mb-3 d-flex'>
                            <div className='w-50'>
                                <img className='img-fluid' src={watch} alt='watch'/>
                            </div>
                            <div className='w-50'>
                              <h5>  Kids headphones built 10 pack multicolored for students</h5>
                              <ReactStars count={5} size={24} value={4} edit={false} activeColor='#ffd700'/>
                             <b>$300</b>
                            </div>
                        </div>
                        <div className='random-products d-flex'>
                            <div className='w-50'>
                                <img className='img-fluid' src={watch} alt='watch'/>
                            </div>
                            <div className='w-50'>
                              <h5>  Kids headphones built 10 pack multicolored for students</h5>
                              <ReactStars count={5} size={24} value={4} edit={false} activeColor='#ffd700'/>
                             <b>$300</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-9'>
                    <div className='filter-sort-grid mb-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center gap-10'>
                            <p className='mb-0d-block' style={{'width':'100px'}}>Sort by</p>
                            <select className='form-control form-select' onChange={(e)=>setSort(e.target.value)}>
                          
                                <option value='title'>Alphabetical, from A to Z</option>
                                <option value='-title'>Alphabetical, Z to A</option>
                                <option value='price'>Price ,low to high</option>
                                <option value='-price'> Price, high to low</option>
                                <option value='createdAt'>Date, old to new</option>
                                <option value='-createdAt'>Date, new to old</option>
                            </select>
                        </div>
                        <div>
                            <div className=' alignment d-flex align-items-center gap-10'>
                                <p className='totalproducts mb-0'>{productState?.length} products</p>
                                <div className='d-flex gap-10 align-items-center grid'>
                                <img className='d-block img-fluid' alt='grid' src={barr3} onClick={()=>{setGrid(3)}}/>
                                <img className='d-block img-fluid' alt='grid' src={barr2}  onClick={()=>{setGrid(4)}}/>
                                    <img className='d-block img-fluid' alt='grid' src={barr1}  onClick={()=>{setGrid(6)}}/>
                                
                                    <img className='d-block img-fluid' alt='grid' src={barr}  onClick={()=>{setGrid(12)}}/>
                                </div>
                            </div>
                            <div className='filter'>
                                
                                <div>
      {
     
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><h6>Filters</h6></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
}
    </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div className='products-list pb-5'>
                        <div className='d-flex gap-15  flex-wrap' >

                        {
          productState && productState?.map((item,index)=>{
            console.log(item.tags)
           {
              
       
            return(
             
                <div key={index} className={`gr-${grid?grid:"3"} pr-3 mx-1 mb-1`}>
                
              <div className='product-card position-relative'>
                  <div className='wishlist-icon position-absolute'>
                      <button className='border-0 bg-transparent' onClick={(e)=>{addToWishList(item?._id)
                        toast.success("product added to wishlist")}}>
                      <img src={wish} alt='wishlist'/></button>
                      
                  </div>
                  <Link to={'product/'+item?._id}>
                  <div className='product-image'>
                      <img className='im img-fluid ' src={item?.images[0].url} alt='product img'/>
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
                      <Link to={'product/'+item?._id}>
                          <button className='border-0 bg-transparent'>
                          <img src={view} onClick={()=>{navigate(`product/${item?._id}`)}} alt='addcart'/>
                          </button>
                          </Link>
                     
                      </div>
                  </div>
              </div>
            
          </div>
            )}
          })
        }
                        
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default OurStore