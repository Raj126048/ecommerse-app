import React from 'react'
import Layout from '../components/Layouts/Layout'
import b2 from '../images/b2.jpg'
import {FaBlog} from 'react-icons/fa'

const About = () => {
  return (
   <Layout title={'About us->Ecom'}> 
    <div className="con">
    <div className="image">
        <img src={b2} alt="" style={{width:'100%'}} />
    </div>
    <div className="text"> <h1 className='ab'>ABOUT US</h1> 
    <p className='abp'> Come get to know us in our personal blog using the given link</p>
    <p><FaBlog/> :www.shoppanunga.in</p></div>
    </div>
   
   </Layout>
  )
}

export default About