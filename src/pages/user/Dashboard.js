import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layouts/UserMenu';
const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={'Dashboard-shopholic'}>
   <div className='container-fluid p-3 m-3'>
          <div className='row'>
            <div classNam e='col-md-3'>
                <UserMenu/></div>
                <div className='col-md-9'>
                   <div className='card w-75 p-3'>
                    <h3>{auth?.user?.name}</h3>
                    <h3>{auth?.user?.email}</h3>
                    <h3>{auth?.user?.address}</h3>
                   </div>
                </div>
                </div>  
        </div>
    </Layout>
  )
}

export default Dashboard