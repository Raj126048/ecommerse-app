import React, { useEffect } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors, resetState } from '../features/colors/colorSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrder, getOrders, getUserOrders } from '../features/auth/authSlice';
import Layout from '../components/Layouts/Layout';
import BreadCrumb from '../components/BreadCrumb';
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
  {
    title: 'Status',
    dataIndex: 'status',
  },
  
  
];

const MyOrders = () => {

    const dispatch=useDispatch();
    useEffect(()=>{
      
          dispatch(getUserOrders());
    
       
      },[])
  
 

  const orderState=useSelector((state)=>state.auth?.getedOrderedProducts?.orders);

  const data1 = [];
  let k=0;
for (let i = 0; i < orderState?.length; i++) {
  for (let index = 0; index < orderState[i]?.orderItems?.length; index++) {
  
    
console.log( orderState[i].orderItems[index]?.product?.title );
  data1.push({
    key: k,
    name: orderState[i].orderItems[index]?.product?.title ,
    brand: orderState[i].orderItems[index]?.product?.brand ,
    count:orderState[i].orderItems[index]?.quantity,
    color:orderState[i].orderItems[index]?.color?.title,
    amount:orderState[i].orderItems[index]?.product.price,
  status:orderState[i]?.orderStatus
    
  }); k++}}
  console.log(data1)
  return (
    <Layout title={'orders'}>
   <BreadCrumb title='my-orders'/>
    <div>
    <h3 className='mb-4'>Orders</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
    </div>
    </Layout>
  )
}

export default MyOrders
