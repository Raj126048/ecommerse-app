import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
          <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
             <meta charSet='utf-8'/>
             <meta name='description' content={description}/>
             <meta name='keywords' content={keywords}/>
             <meta name='author' content={author}/>
     
            </Helmet>
        <Header/>
            <main style={{minHeight: "100vh" }}>
            {children}
            <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={ false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'/>
            </main>
        
        <Footer/>
      </div>
  )
}

Layout.defaultProps={
    title:"ShopPanunga->shop now",
    description:"mern-stack-project",
    keywords:"mern,react,node,mongodb",
    author:'JD'
}
export default Layout