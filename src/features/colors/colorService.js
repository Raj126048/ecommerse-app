import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";


const getColors =async()=>{
    const res=await axios.get(`${base_url}/color/`);
    console.log(res);
    return res.data;
};

const CreateColor =async(color)=>{
    const res=await axios.post(`${base_url}/color/`,color,config);
    console.log(res);
    return res.data;
};
const UpdateColor =async(Color)=>{
    const res=await axios.put(`${base_url}/color/${Color.id}`,{title:Color.colorData.title},config);
    console.log(res);
    return res.data;
};

const getColor =async(id)=>{
    const res=await axios.get(`${base_url}/color/${id}`,config);
    console.log(res);
    return res.data;
};


const DeleteColor =async(id)=>{
    const res=await axios.delete(`${base_url}/color/${id}`,config);
    console.log(res);
    return res.data;
};
const colorService={
    getColors,
    CreateColor,
    getColor,
    UpdateColor,
    DeleteColor
}
export default colorService;