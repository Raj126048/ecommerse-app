import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getbrands =async()=>{
    const res=await axios.get(`${base_url}/brand/`);
    console.log(res);
    return res.data;
};

const CreateBrand =async(brand)=>{
    const res=await axios.post(`${base_url}/brand/`,brand,config);
    console.log(res);
    return res.data;
};

const UpdateBrand =async(brand)=>{
    const res=await axios.put(`${base_url}/brand/${brand.id}`,{title:brand.brandData.title},config);
    console.log(res);
    return res.data;
};

const getBrand =async(id)=>{
    const res=await axios.get(`${base_url}/brand/${id}`,config);
    console.log(res);
    return res.data;
};


const DeleteBrand =async(id)=>{
    const res=await axios.delete(`${base_url}/brand/${id}`,config);
    console.log(res);
    return res.data;
};

const brandService={
    getbrands,
    CreateBrand,
    getBrand,
UpdateBrand,
DeleteBrand
}
export default brandService;