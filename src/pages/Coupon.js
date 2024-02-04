import React, { useEffect, useState } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCoupon, getCoupon } from '../features/coupon/couponSlice';
import CustomModel from '../components/CustomModel';
const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry.length - b.expiry.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },

];

const Coupon = () => {

  const [Bid,setBid]=useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setBid(e)
  };
  console.log(Bid);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
dispatch(getCoupon())
  },[])
  const couponState=useSelector((state)=>state.coupon.coupons)
  const data1 = [];
for (let i = 0; i < couponState.length; i++) {
  data1.push({
    key: i+1,
    name:couponState[i].name ,
    discount:couponState[i].discount,
    expiry:couponState[i].expiry,
   
    action:<>
              <Link to={`/dashboard/admin/coupon/${couponState[i]._id}`} className='fs-3'>
                <BiEdit/>
                  </Link>
                  <button onClick={()=>{
                  showModal(couponState[i]._id)
                }} className='ms-3 fs-3 bg-transparent border-0 color-danger' >
                  <AiFillDelete/>
                  </button>
            </>

  });}
  const deleteB=(e)=>{
    dispatch(deleteCoupon(e))
  setOpen(false)
  setTimeout(()=>{ dispatch(getCoupon())},100)
   
  
  }  

  return (
    <div>
    <h3 className='mb-4'>Coupons List</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    <CustomModel open={open} performAction={()=>{deleteB(Bid)}} hideModal={hideModal}  title="Are you sure you want to delete this Coupon" />
    </div>
    </div>
  )
}

export default Coupon