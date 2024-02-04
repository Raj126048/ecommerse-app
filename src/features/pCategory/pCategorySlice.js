import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";

const initialState={
 pCategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
};

export const getCategories =createAsyncThunk(
    'productCategory/get-categories',async(user,thunkAPI)=>{
    try{
       return await pCategoryService.getProductCategory();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const createCategory =createAsyncThunk(
    'productCategory/create-category',async(categoryData,thunkAPI)=>{
    try{
       return await pCategoryService.createCategory(categoryData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState=createAction("Reset_all")

export const getCategory =createAsyncThunk(
    'category/get-category',async(id,thunkAPI)=>{
    try{
       return await pCategoryService.getCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateCategory =createAsyncThunk(
    'category/update-category',async(catData,thunkAPI)=>{
    try{
       return await pCategoryService.UpdateCategory(catData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCategory =createAsyncThunk(
    'category/delete-category',async(id,thunkAPI)=>{
    try{
       return await pCategoryService.DeleteCategory(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const pCategorySlice=createSlice({
    name:"pCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategories=action.payload;
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(createCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdCategory=action.payload;
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getedCategory=action.payload.title;
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCategory=action.payload;
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCategory=action.payload;
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState)
    }
})


export default pCategorySlice.reducer