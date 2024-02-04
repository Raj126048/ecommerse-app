import React, { useEffect, useState } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCategory, getCategories, getProductCategory, resetState } from '../features/pCategory/pCategorySlice';
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
    title: 'Action',
    dataIndex: 'action',
  },
];


const CategoryList = () => {
  const [Cid,setCid]=useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setCid(e)
  };
  console.log(Cid);
  const hideModal = () => {
    setOpen(false);
  };


  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(resetState())
dispatch(getCategories())
  },[])
  const pCategoryState=useSelector((state)=>state.pcategory.pCategories)
  const data1 = [];
for (let i = 0; i < pCategoryState.length; i++) { 
  data1.push({
    key: i+1,
    name:pCategoryState[i].title ,
   
    action:<>
              <Link to={`/dashboard/admin/category/${pCategoryState[i]._id}`} className='fs-3 '>
                <BiEdit/>
                  </Link>
                  <button onClick={()=>{
                  showModal(pCategoryState[i]._id)
                }} className='ms-3 fs-3 bg-transparent border-0 color-danger' >
                  <AiFillDelete/>
                  </button>
            </>

  });}
  const deleteB=(e)=>{
    dispatch(deleteCategory(e))
  setOpen(false)
  setTimeout(()=>{ dispatch(getCategories())},100)
  }
  return (
    <div>
    <h3 className='mb-4'>Category List</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    <CustomModel open={open} performAction={()=>{deleteB(Cid)}} hideModal={hideModal}  title="Are you sure you want to delete this category" />
    </div>
    </div>
  )
}

export default CategoryList