import axios from "axios"

import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getCoupons =async()=>{
    const res=await axios.get(`${base_url}/coupon/`,config);
    console.log(res);
    return res.data;
};

const CreateCoupon =async(coupon)=>{
    const res=await axios.post(`${base_url}/coupon/`,coupon,config);
    console.log(res);
    return res.data;
};


const UpdateCoupon =async(Coupon)=>{
    const res=await axios.put(`${base_url}/coupon/${Coupon.id}`,{name:Coupon.couponData.name,expiry:Coupon.couponData.expiry,discount:Coupon.couponData.discount},config);
    console.log(res);
    return res.data;
};

const getCoupon =async(id)=>{
    const res=await axios.get(`${base_url}/coupon/${id}`,config);
    console.log(res);
    return res.data;
};


const DeleteCoupon =async(id)=>{
    const res=await axios.delete(`${base_url}/coupon/${id}`,config);
    console.log(res);
    return res.data;
};

const couponService={
    getCoupons,
    CreateCoupon,
    UpdateCoupon,
    getCoupon,
    DeleteCoupon
}
export default couponService;