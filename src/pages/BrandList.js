import React, { useEffect, useState } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getbrands, resetState } from '../features/brand/brandSlice';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
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

const BrandList = () => {
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
    dispatch(resetState())
dispatch(getbrands())
  },[])
  const brandState=useSelector((state)=>state.brand.brands)
  const data1 = [];
for (let i = 0; i < brandState.length; i++) {
  data1.push({
    key: i+1,
    name:brandState[i].title ,
   
    action:<>
              <Link to={`/dashboard/admin/brand/${brandState[i]._id}`} className='fs-3 '>
                <BiEdit/>
                  </Link>
                <button onClick={()=>{
                  showModal(brandState[i]._id)
                }} className='ms-3 fs-3 bg-transparent border-0 color-danger' >
                  <AiFillDelete/>
                  </button>
            </>

  });}
const deleteB=(e)=>{
  dispatch(deleteBrand(e))
setOpen(false)
setTimeout(()=>{ dispatch(getbrands())},100)
 


}
  return (
    <div>
    <h3 className='mb-4'>Brand List</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModel open={open} performAction={()=>{deleteB(Bid)}} hideModal={hideModal}  title="Are you sure you want to delete this brand" />
    </div>
  )
}

export default BrandList