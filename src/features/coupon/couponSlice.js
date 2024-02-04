import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";

import couponService from "./couponService.js";

const initialState={
 coupons:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
};


export const createCoupons =createAsyncThunk(
    'coupon/create-coupon',async(couponData,thunkAPI)=>{
    try{
       return await couponService.CreateCoupon(couponData);    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState=createAction("Reset_all")
export const getCoupon =createAsyncThunk(
    'coupon/get-coupons',async(user,thunkAPI)=>{
    try{
       return await couponService.getCoupons();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateCoupon =createAsyncThunk(
    'coupon/update-coupon',async(couponData,thunkAPI)=>{
    try{
       return await couponService.UpdateCoupon(couponData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const GetCoupon =createAsyncThunk(
    'coupon/get-coupon',async(id,thunkAPI)=>{
    try{
       return await couponService.getCoupon(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCoupon =createAsyncThunk(
    'coupon/delete-coupon',async(id,thunkAPI)=>{
    try{
       return await couponService.DeleteCoupon(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})




export const couponSlice=createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupons=action.payload;
        })
        .addCase(getCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(createCoupons.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createCoupons.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdCoupon=action.payload;
        })
        .addCase(createCoupons.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(GetCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(GetCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getedCouponn=action.payload[0].name;
            state.getedCoupone=action.payload[0].expiry;
            state.getedCoupond=action.payload[0].discount;
        })
        .addCase(GetCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCoupon=action.payload;
        })
        .addCase(updateCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCoupon=action.payload;
        })
        .addCase(deleteCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        
        
        .addCase(resetState,()=>initialState)

    }
})


export default couponSlice.reducer