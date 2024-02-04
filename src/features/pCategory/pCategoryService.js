import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getProductCategory =async()=>{
    const res=await axios.get(`${base_url}/category/`);
    console.log(res);
    return res.data;
};
const createCategory =async(category)=>{
    const res=await axios.post(`${base_url}/category/`,category,config);
    console.log(res);
    return res.data;
};


const getCategory =async(id)=>{
    const res=await axios.get(`${base_url}/category/${id}`,config);
    console.log(res);
    return res.data;
};
const UpdateCategory =async(cat)=>{
    const res=await axios.put(`${base_url}/category/${cat.id}`,{title:cat.cData.title},config);
    console.log(res);
    return res.data;
};

const DeleteCategory =async(id)=>{
    const res=await axios.delete(`${base_url}/category/${id}`,config);
    console.log(res);
    return res.data;
};
const pCategoryService={
    getProductCategory,
    createCategory,
    getCategory,
    DeleteCategory,
    UpdateCategory
}
export default pCategoryService;