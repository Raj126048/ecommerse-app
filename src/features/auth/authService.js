import axios from "axios"

import { base_url } from "../../utils/base_url"

import { config } from "../../utils/axiosconfig";
const login =async(userdata)=>{   

    const res=await axios.post(`${base_url}user/login`,userdata);
    console.log(res);
};
const getOrders =async()=>{
    const res=await axios.get(`${base_url}/user/getallorders`,config);
    console.log(res);
    return res.data;
};
const getOrder=async(id)=>{
    const res=await axios.get(`${base_url}/user/getaOrder/${id}`,config);
    console.log(res);
    return res.data;
};
const updateOrder=async(data)=>{
    console.log(data.status+"hii")
    const res=await axios.put(`${base_url}/user/updateOrder/${data.id}`,{status:data.status},config);
    console.log(res);
    return res.data;
};


const getUserWishList=async()=>{
    const res=await axios.get(`${base_url}/user/wishlist`,config);
        console.log("hii");
      return res.data

  }

  const addToCart=async(data)=>{
    const res=await axios.post(`${base_url}/user/cart/`,data,config);
    console.log(res);
    return res.data;
};


const getCart=async()=>{
    const res=await axios.get(`${base_url}/user/cart`,config);
    console.log(res);
    return res.data;
};



const removeProductCart =async(id)=>{
    console.log(id);
    const res=await axios.delete(`${base_url}/user/delete-product-cart/${id}`,config);
    console.log(res);
    return res.data;
};

const updateProductCart =async(detail)=>{
    console.log(detail)
 
    const res=await axios.put(`${base_url}/user/update-product-cart/${detail.id}/${detail.newQuantity}`,config);
    console.log(res);
    return res.data;
};

const createOrder=async(orderDetail)=>{
    const res =await axios.post(`${base_url}/user/cart/create-order`,orderDetail,config)
    if(res.data){
        return res.data
    }
}


const GetUserOrders=async()=>{
    const res=await axios.get(`${base_url}/user/getmyorders`,config)
    if(res.data){
        return res.data
    }
}

const getMonthlyOrders=async()=>{
    const res=await axios.get(`${base_url}/user/getMonthWiseOrderIncome`,config)
    if(res.data){
        return res.data
    }
}
const getYearlyStats=async()=>{
    const res=await axios.get(`${base_url}/user/getYearlyTotalOrders`,config)
    if(res.data){
        return res.data
    }
}
const authService={
    login,  
    getOrders,
    getOrder,
    getUserWishList,
    addToCart,
    getCart,
    removeProductCart,
    updateProductCart,
GetUserOrders,
getMonthlyOrders,
getYearlyStats,updateOrder,
createOrder

}
export default authService;