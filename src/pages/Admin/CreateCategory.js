import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'

const CreateCategory = () => {

  return (
    <Layout title={"Dashboard-create-category"}>
              <div className='container-fluid p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>category</h1>
            </div>
    
    </div>
    </div>
    </Layout>
  )
}

export default CreateCategory