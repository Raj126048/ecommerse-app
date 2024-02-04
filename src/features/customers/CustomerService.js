import axios from "axios"

import { base_url } from "../../utils/base_url"


const getUsers =async(userdata)=>{
    const res=await axios.get(`${base_url}/user/all-users`,userdata);
    console.log(res);
    return res.data;
};

const CustomerService={
    getUsers,
}
export default CustomerService;