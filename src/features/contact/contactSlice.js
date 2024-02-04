import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";

import contactService from "./contactService.js";
import { toast } from "react-toastify";

const initialState={
 contact:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
};

export const createQuery =createAsyncThunk(
    'contact/post',async(contactData,thunkAPI)=>{
    try{
       return await contactService.postQuery(contactData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState=createAction("Reset_all")

export const contactSlice=createSlice({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createQuery.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createQuery.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.contact=action.payload;
    if(state.isSuccess===true){
                toast.success("Contact Submitted Successfully")
    }
        })
        .addCase(createQuery.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
    if(state.isError===true){
                toast.error("Something went Wrong")}
            
        } )
      
        .addCase(resetState,()=>initialState)
    }
})


export default contactSlice.reducer