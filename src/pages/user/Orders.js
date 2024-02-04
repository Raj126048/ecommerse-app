import React, { useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import Container from '../../components/Container'
import BreadCrumb from '../../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../../features/auth/authSlice'
const Orders = () => {
  const dispatch=useDispatch()
  const orderState=useSelector((state)=>state.auth?.getedOrderedProducts?.orders)

  useEffect(()=>{
    dispatch(getUserOrders())
  },[])
  return (
    <Layout title={'your Orders'}>
       
                  <BreadCrumb title="My Orders"/>
                    <Container className="cart-wrapper home-wrapper-2 py-5 bg-white">
                      <div className='row'>
                        <div className='col-12'>
                        <div className='row'>
  <div className='col-3'>
    <h5 classname="text-white">Order id</h5>
  </div>
  <div className='col-3'>
    <h5 classname="text-white">Total Amount

    </h5 >
  </div>
  <div className='col-3'>
    <h5 classname="text-white">Amount after discount</h5>
  </div>
  <div className='col-3'>
    <h5 classname="text-white">Status</h5>
  </div>

</div>

                        </div>
                        <div className='col-12 mt-3'>
        {
          orderState&& orderState?.map((item,index)=>{
            return(
              <div className='row bg-warning' key={index}>
              <div className='col-3'>
                <p classname="text-white">{item?._id}</p>
              </div>
              <div className='col-3'>
                <p classname="text-white">{item?.totalPrice}
            
                </p >
              </div>
              <div className='col-3'>
                <p classname="text-white">{item?.totalPriceAfterDiscount}</p>
              </div>
              <div className='col-3'>
                <p classname="text-white">{item?.orderStatus}</p>
              </div>
              <div className='col-12'>
                                    <div className='row   pt-3 py-3' style={{backgroundColor:"#232f3e"}}>
              <div className='col-3'>
                <h6 classname="text-white" style={{color:'white'}}>Product name</h6>
              </div>
              <div className='col-3'>
                <h6 classname="text-white" style={{color:'white'}}>Quantity
            
                </h6>
              </div>
              <div className='col-3'>
                <h6 classname="text-white" style={{color:'white'}}>Price</h6>
              </div>
              <div className='col-3'>
                <h6 classname="text-white" style={{color:'white'}}>color</h6>
              </div>
            </div>
     {
      item?.orderItems?.map((i,ind)=>{
return(
  <div className='col-12' key={ind}>
  <div className='row  py-3 ' style={{backgroundColor:"#232f3e"}}>
<div className='col-3'>
<p classname="text-white" style={{color:'white'}}>{i?.product?.title}</p>
</div>
<div className='col-3'>
<p classname="text-white" style={{color:'white'}}>{i?.quantity}

</p>
</div>
<div className='col-3'>
<p classname="text-white" style={{color:'white'}}>{i?.price}</p>
</div>
<div className='col-3'>
<ul className='colors ps-0'>
                                            <li style={{backgroundColor:i?.color.title}}></li></ul>
</div>
</div>

  </div>
)
      })
     }
                                    
                                    </div>
                                    
            </div>
            )
          })
        }
                        </div>
                      </div>


                    </Container>
                
               
    </Layout>
  )
}

export default Orders