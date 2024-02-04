import React, { useEffect } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors, resetState } from '../features/colors/colorSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrder, getOrders } from '../features/auth/authSlice';
const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Product name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  
  
];

const ViewOrder = () => {
    const location=useLocation();
    const Uid=location.pathname.split("/")[4];
    const dispatch=useDispatch();
    useEffect(()=>{
        if(Uid !== undefined){
          dispatch(getOrder(Uid));
    
       
     
        
        }
        else{
          dispatch(resetState())
        }
      },[Uid])
  
 

  const orderState=useSelector((state)=>state.auth?.getedorder?.orders);
  console.log(orderState);
  const data1 = [];
  
for (let i = 0; i < orderState?.orderItems?.length; i++) {
  data1.push({
    key: i,
    name: orderState.orderItems[i]?.product.title ,
    brand: orderState.orderItems[i]?.product.brand ,
    count:orderState.orderItems[i]?.quantity,
    color:orderState.orderItems[i]?.color?.title,
    amount:orderState.orderItems[i]?.product.price,
   
    
  });}
  return (
    <div>
    <h3 className='mb-4'>Orders</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
    </div>
  )
}

export default ViewOrder