import React, { useEffect, useState } from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/colors/colorSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCategory } from '../features/pCategory/pCategorySlice';
import CustomModel from '../components/CustomModel';
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
    title: 'Action',
    dataIndex: 'action',
  },

];

const ColorList = () => {
  const dispatch=useDispatch();
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

  useEffect(()=>{
    dispatch(getColors());
      },[])

  
  const colorState=useSelector((state)=>state.color.colors);
  const data1 = [];
for (let i = 0; i < colorState.length; i++) {
  data1.push({
    key: i,
    name: colorState[i].title,
    action:<>
    <Link to={`/dashboard/admin/colors/${colorState[i]._id}`} className='fs-3'>
      <BiEdit/>
        </Link>
        <button onClick={()=>{
                  showModal(colorState[i]._id)
                }} className='ms-3 fs-3 bg-transparent border-0 color-danger' >
                  <AiFillDelete/>
                  </button>
  </>
  });
}
const deleteB=(e)=>{
  dispatch(deleteColor(e))
setOpen(false)
setTimeout(()=>{ dispatch(getColors())},100)
 
}
  return (
    <div>
    <h3 className='mb-4'>Colors List</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    <CustomModel open={open} performAction={()=>{deleteB(Bid)}} hideModal={hideModal}  title="Are you sure you want to delete this color" />
    </div>
    </div>
  )
}

export default ColorList