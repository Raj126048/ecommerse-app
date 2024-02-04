import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "dotenv";

const AddToWishList=async(prodId)=>{
    const ihd=(prodId.id);
    const res=await axios.put(`${base_url}/product/wishlist`,{id:ihd},config);
    console.log(res);
    return res.data;
};

const getProducts =async(data)=>{
    console.log(data);
    const res=await axios.get(`${base_url}/product?${(data?.brand?.length!==0&&data?.brand!==undefined)?`brand=${data?.brand}&&`:""}${(data?.categorie?.length!==0&&data?.categorie!==undefined)?`category=${data?.categorie}&&`:""}${(data?.tagie?.length!==0&& data?.tagie!==undefined)?`tags=${data?.tagie}&&`:""}${(data?.minPrice)?`price[gte]=${data?.minPrice}&&`:""}${(data?.maxPrice)?`price[lte]=${data?.maxPrice}&&`:""}${(data?.sort)?`sort=${data?.sort}&&`:""}`);
    console.log(res);
    return res.data;
};
const CreateProduct =async(product)=>{
    const res=await axios.post(`${base_url}/product/`,product,config);
    console.log(res);
    return res.data;
};
const getProduct =async(id)=>{
    
    const res=await axios.get(`${base_url}/product/${id}`,config);
    console.log(res);
    return res.data;
};
const UpdateProduct =async(cat)=>{
    const res=await axios.put(`${base_url}/product/${cat.id}`,{title:cat.cData.title},config);
    console.log(res);
    return res.data;
};

const rateProduct =async(data)=>{
    const res=await axios.put(`${base_url}/product/rating/`,data,config);
    console.log(res);
    return res.data;
};

const DeleteProduct =async(id)=>{
    const res=await axios.delete(`${base_url}/product/${id}`,config);
    console.log(res);
    return res.data;
};
const productService={
    getProducts,
    CreateProduct,
    getProduct,
    UpdateProduct,
    DeleteProduct,
    AddToWishList,
    rateProduct
}
export default productService;