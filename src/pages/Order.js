import React, { useEffect } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/colors/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrders, updateOrders } from '../features/auth/authSlice';
const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Order = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
dispatch(getOrders());
  },[])
  const orderState=useSelector((state)=>state.auth.orders.orders);
  
  const data1 = [];
  
for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name: orderState[i]?.user?.firstname ,
    product:<Link to={`/dashboard/admin/orders/${orderState[i]?._id}`}>View Orders</Link>,
    amount:orderState[i]?.totalPrice,
    date:new Date((orderState[i]?.createdAt)).toLocaleString() ,
    action:<>
    <select className='form-control form-select' defaultValue={orderState[i]?.orderStatus} onChange={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value)}>
    <option value={"Ordered"} disabled selected>Ordered</option>
    <option value={"Shipped"}>Shipped</option>
    <option value={"Out for delivery"}>Out for delivery</option>
    <option value={"Delivered"}>Delivered</option>
  </select>
  
  </>
  });}
  const updateOrderStatus=(a,b)=>{
dispatch(updateOrders({id:a,status:b}))
  }
  return (
    <div>
    <h3 className='mb-4'>View order</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
    </div>
  )
}

export default Order