import React, { useEffect, useState } from 'react'
import {  Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../features/product/productSlice';
import { Link } from 'react-router-dom';
import CustomModel from '../../components/CustomModel';


const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length
  },
  {
    title: 'Color',
    dataIndex: 'color',
    sorter: (a, b) => a.color.length - b.color.length
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
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
dispatch(getProducts())
  },[])
  const productState=useSelector((state)=>state.product.products)
  const data1 = [];
for (let i = 0; i < productState.length; i++) {
  data1.push({
    key: i+1,
    title:productState[i].title ,
    brand: productState[i].brand,
    price: `$  ${productState[i].price}`,
    category:productState[i].category,
    color:productState[i].color.map((i)=>{
      return i.split(" ").join(" , ")
    }),
    action:<>
              <Link to={`/dashboard/admin/create-product/${productState[i]._id}`} className='fs-3'>
                <BiEdit/>
                  </Link>
                  <button onClick={()=>{
                  showModal(productState[i]._id)
                }} className='ms-3 fs-3 bg-transparent border-0 color-danger' >
                  <AiFillDelete/>
                  </button>
            </>

  });}
  const deleteB=(e)=>{
    dispatch(deleteProduct(e))
  setOpen(false)
  setTimeout(()=>{ dispatch(getProducts())},200)
   
  
  
  }
  return (
    <div>
    <h3 className='mb-4'>Product List</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    <CustomModel open={open} performAction={()=>{deleteB(Bid)}} hideModal={hideModal}  title="Are you sure you want to delete this Product" />
    </div>
    </div>
  )
}

export default ProductList