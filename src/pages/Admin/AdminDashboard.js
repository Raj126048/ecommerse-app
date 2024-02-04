import React, { useEffect, useState } from 'react'

import { useAuth } from '../../context/auth'
import { Column } from '@ant-design/plots';
import {  Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyData, getOrders, getYearlyData } from '../../features/auth/authSlice';
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
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const AdminDashboard = () => {
  const dispatch=useDispatch()
  const monthlyorder=useSelector((state)=>state.auth.getedMonthlyData)
  const orderState=useSelector((state)=>state.auth.orders.orders)
  const yearlyorder=useSelector((state)=>state.auth.getedYearlyData)
  const [dataMonthly,setDataMonthly]=useState([])
  const [dataMonthlySales,setDataMonthlySales]=useState([])
  const [orderData,setOrderData]=useState()
    const[auth]=useAuth();
    useEffect(()=>{
      dispatch(getMonthlyData())
      dispatch(getYearlyData())
      dispatch(getOrders())
    },[])


    
    useEffect(()=>{
      let data=[]
      let orderCount=[]
      let month=["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    for (let index = 0; index < monthlyorder?.length; index++) {
      const element = monthlyorder[index];
      data.push({type:month[element?._id?.month],Income:element?.amount})
 setDataMonthly(data)
 orderCount.push({type:month[element?._id?.month],sales:element?.count})
 setDataMonthly(data)
 setDataMonthlySales(orderCount)

    }
    const data1 = [];
    for (let i = 0; i <orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i]?.user?.firstname,
        product:orderState[i]?.orderItems?.length,
        price:orderState[i]?.totalPrice,
      dprice:orderState[i]?.totalPriceAfterDiscount,
        status:orderState[i]?.orderStatus  });
    
    }
    setOrderData(data1)
    },[monthlyorder,yearlyorder])

    

    const data = [
      {
        type: 'JAN',
        sales: 38,
      },
      {
        type: 'FEB',
        sales: 52,
      },
      {
        type: 'MAR',
        sales: 61,
      },
      {
        type: 'APR',
        sales: 145,
      },
      {
        type: 'MAY',
        sales: 48,
      },
      {
        type: 'JUN',
        sales: 38,
      },
      {
        type: 'JUL',
        sales: 38,
      },
      {
        type: 'AUG',
        sales: 38,
      },
      {
        type: 'SEP',
        sales: 38,
      },
      {
        type: 'OCT',
        sales: 38,
      },
      {
        type: 'NOV',
        sales: 38,
      },
      {
        type: 'DEC',
        sales: 38,
      },
    ];
    const config = {
      data:dataMonthly,
      xField: 'type',
      yField: 'Income',
      color: ({ type }) => {
     const sl='#ff5633';
  
        return sl;
      },
      label: {
        // 可手动配置 label 数据标签位置
        position: 'top',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: 'Month',
        },
        sales: {
          alias: 'Income',
        },
      },
    };
    const config2 = {
      data:dataMonthlySales,
      xField: 'type',
      yField: 'sales',
      color: ({ type }) => {
     const sl='#ff5633';
  
        return sl;
      },
      label: {
        // 可手动配置 label 数据标签位置
        position: 'top',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: 'Month',
        },
        sales: {
          alias: 'Sales',
        },
      },
    };
  
  return (
    
        <div className='maini' >
            <h3 className='mb-4'>Dashboard</h3>
            <div className='d-flex justify-content-between align-items-center gap-3'>
            <div className='d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded'>
                <div><p className='mb-0'>Total Income</p><h5>${yearlyorder&&yearlyorder[0]?.amount}</h5></div>
         
              <div className='d-flex flex-column align-items-end'>        <h6>32%</h6> <p className='mb-0'>Yearly Total Income</p> </div></div>
                <div className='d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded'>
                    <div><p className='mb-0'>Total Sales</p><h5>{yearlyorder&& yearlyorder[0]?.count}</h5></div>
                 
                    <div className='d-flex flex-column align-items-end'>     <h6>32%</h6> <p className='mb-0'>c  Yearly Total Sales</p> </div></div>
        
                </div>
         <div>
   <div className='d-flex justify-content-between gap-3'>
   <div className='mb-4 flex-grow-1 w-50'>
              <h3 className='mb-4 flex-grow-1  '>Income Statics</h3>
              <div >
         <Column {...config} />
              </div>
            </div>
            <div className='mb-4 flex-grow-1 w-50'>
              <h3 className='mb-4 flex-grow-1  '>Sales Statics</h3>
              <div >
         <Column {...config2} />
              </div>
            </div>
   </div>
            <div >
              <h3 className='mb-4'>Recent Orders</h3>
              <div>
              <Table columns={columns} dataSource={orderData} />

              </div>
            =
            </div>
         </div>
      

                
               
           
        </div>
    

   
  )
}

export default AdminDashboard