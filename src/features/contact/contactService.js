import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "dotenv";



const postQuery =async(contactData)=>{
    const res=await axios.post(`${base_url}/enquiry/`,contactData);
    console.log(res);
    return res.data;
};

const contactService={
    postQuery,
   
}
export default contactService;