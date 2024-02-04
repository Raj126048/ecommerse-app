import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import {ImBlog} from "react-icons/im"
import { AiOutlineLogout } from 'react-icons/ai';
import {RiCouponLine }from "react-icons/ri"
import { Layout, Menu, Button, theme } from 'antd';
import {IoIosNotifications} from 'react-icons/io';
import {AiOutlineDashboard,AiOutlineShoppingCart,AiOutlineUser} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaClipboard } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import profile from '../../images/profile.webp';
import {ToastContainer, toast} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/auth';
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
 const [auth,setAuth]=useAuth()

  const [collapsed, setCollapsed] = useState(false);
  const navigate=useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>

        <div className="logo">

            <h2 text-white fs-5 text-corner py-3>Shopholic</h2>
            </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key==='logout'){
              setAuth({
                ...auth,user:null,token:''
              })
              localStorage.removeItem('auth');
              toast.success("Logout Successfully");
              navigate("/login")
            }
          
            else{
navigate(key);
            }
          }}
          items={[
            {
              key: 'db',
              icon: <AiOutlineDashboard  className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'users',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catelog',
              icon: <UploadOutlined className='fs-4' />,
              label: 'Catelog',
              children:[
                {
                    key: 'create-product',
                    icon: <AiOutlineShoppingCart className='fs-4' />,
                    label: 'Add products',
                  },
                  {
                    key: 'product-list',
                    icon: <AiOutlineShoppingCart className='fs-4' />,
                    label: 'Products List',
                  },
                  {
                    key:"add-colors",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Add Color' ,

                  },
                  {
                    key:"colors-list",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Colors List' ,

                  },
                  {
                    key:"brand",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Brand' ,

                  },
                  {
                    key:"brand-list",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Brand Lists' ,

                  },
                  {
                    key:"category",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Category' ,

                  },
                  {
                    key:"category-list",
                    icon:<BiCategoryAlt className='fs-4'/>,
                    label:'Category Lists' ,

                  },
            
                ],
            },
            {
                key:"orders",
                icon:<FaClipboard className='fs-4'/>,
                label:'Orders' ,

              },
           {
key:"marketing",
icon:<FaClipboard className='fs-4'/>,
label:" Marketting",
children:[
  {
    key:"coupon",
    icon:<ImBlog className='fs-4'/>,
    label:"Add coupon"
  },
  {
    key:"coupon-list",
    icon:<RiCouponLine className='fs-4'/>,
    label:"Coupon List"
  }
]
           },

              {
                key:"logout",
                icon:<AiOutlineLogout className='fs-4'/>,
                label:'Sign Out' ,

              },
          ]}
        />
      </Sider>
      <Layout>
        <Header
        className='d-flex justify-content-between ps-2 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <div className='d-flex gap-3 align-items-center'>
              <div className='position-relative'><IoIosNotifications className='fs-4'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span></div>
              <div className="d-flex gap-3 align-items-center" role='button' id='dropdownMenuLink' data-bs-toggle='dropdown' aria-expanded='false'>
                <div>
                  <img className='profile' src={profile} alt=''/>
                </div>
                <div>
                  <h5 className='mb-0'>Rajkumar</h5>
                  < p className='mb-0'>rk4960228@gmail.com</p>
                </div>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                  <li>
                    <a className='dropdown-item ni'>Profile</a>
                  </li>
                  <li>
                    <a className='dropdown-item ni'>Settings</a>
                  </li>
                  <li>
                    <a className='dropdown-item ni'>SignOut</a>
                  </li>
                </div>
              </div>
 
        </div>
        </Header>
      
       
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={ false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'/>
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;