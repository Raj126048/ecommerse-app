
import Layout from '../components/Layouts/Layout'

import {AiOutlineHome,AiOutlineMail} from 'react-icons/ai'
import {BiPhoneCall,BiInfoCircle} from 'react-icons/bi'

import * as Yup from "yup"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'

import { createQuery } from '../features/contact/contactSlice'
const Contact = () => {
    
  
        
        const dispatch=useDispatch();
 
        let schema=Yup.object().shape({
          name:Yup.string().required("name is required"),
          email:Yup.string().nullable().email().required("email  is required"),
          contact:Yup.number().required("contact  is required"),
          comment:Yup.string().nullable().required("comment is required"),
         
        })
      
      
       
        const formik=useFormik({
          enableReinitialize:true,
          initialValues:{
            name: "",
            email:"",
            contact:"",
            comment:""
         
          },
          validationSchema:schema,
          onSubmit:(values)=>{
            
            
            dispatch(createQuery({name:values.name,email:values.email,mobile:values.contact,comment:values.comment}))
            
           
           
           
           
            
          }
      
        })
        
    
  return ( 
    <Layout title={"Contact"} > 
 <div className='contact-wrapper py-5 home-wrapper-2'>
    <div className='container-xxl'>
        <div className='row'>
            <div className='col-12'>
            <iframe id='iframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4349.163332584084!2d77.0096379070998!3d10.656863166705591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba839d117dea505%3A0xb3fd96d9c8642659!2sPollachi%2C%20Tamil%20Nadu%20642001!5e0!3m2!1sen!2sin!4v1704299380506!5m2!1sen!2sin" width="600" height="450" className='w-100 border-0' allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='col-12 mt-5'>
                <div className='contact-inner-wrapper d-flex justify-content-between'>
                    <div>
                        <h3 className='contact-title'>
                            Contact 
                        </h3>
                        <div>
                            <form action='' className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                                <div>
                                    <input type='text' className='form-control' placeholder='Name' name='name ' onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name") }value={formik.values.name}/>
                                    <div className='error'>
                    {formik.touched.name && formik.errors.name}
                  </div>
                                </div>

                                <div>
                                <input type='email' className='form-control' placeholder='Email' onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email") }value={formik.values.email}/>
                                <div className='error'>
                    {formik.touched.email && formik.errors.email}
                  </div>
                                </div>
                                <div>
                                <input type='tel' className='form-control' placeholder='Mobile' onChange={formik.handleChange("contact")} onBlur={formik.handleBlur("contact") }value={formik.values.contact}/>
                                <div className='error'>
                    {formik.touched.contact && formik.errors.contact}
                  </div>
                                </div>
                                <div>
                                    <textarea
                                   
                                    className='w-100 form-control'
                                    cols='30'
                                    rows='4'
                                    placeholder='Comments'
                                    onChange={formik.handleChange("comment")} onBlur={formik.handleBlur("comment") }value={formik.values.comment}>

                                    </textarea>
                                    <div className='error'>
                    {formik.touched.comment && formik.errors.comment}
                  </div>
                                </div>
                                <div>
                                    <button className='bnbutton border-0'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h3 className='contact-title mb-4'>
                            Get in touch with us
                        </h3>
                        <div>
                            <ul className='ps-0'>
                                <li className='mb-3 d-flex gap-15 align-items-center mt-3'>
                                    <AiOutlineHome/>
                                    <address className='mx-3 mt-3'>
                                        no.11,Bioscope Street,Pollachi</address></li>
                                <li className='mb-3 d-flex gap-15 align-items-center'><BiPhoneCall/><a className='mx-3' href='tel:+91 6382112945'>+91 9788112063</a></li>
                                <li className='mb-3 d-flex gap-15 align-items-center'><AiOutlineMail/><a className='mx-3' href='mailto:rk4960228@gmail.com'>rk4960228@gmail.com</a></li>
                                <li className='mb-3 d-flex gap-15 align-items-center'><BiInfoCircle/><p className='mb-0 mx-3'>Monday - Friday 10Am - 8Pm</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
    </Layout>
  )
}

export default Contact