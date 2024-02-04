import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import productService from "./productService.js";
import { toast } from "react-toastify";

const initialState={
 products:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
};

export const getProducts =createAsyncThunk(
    'product/get-products',async(data,thunkAPI)=>{
    try{
       return await productService.getProducts(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishList =createAsyncThunk(
    'product/wishlist',async(prodId,thunkAPI)=>{
    try{
       return await productService.AddToWishList(prodId);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const createProducts =createAsyncThunk(
    'product/create-products',async(productData,thunkAPI)=>{
    try{
       return await productService.CreateProduct(productData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getProduct =createAsyncThunk(
    'product/get-product',async(id,thunkAPI)=>{
    try{
       return await productService.getProduct(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateProduct =createAsyncThunk(
    'product/update-product',async(catData,thunkAPI)=>{
    try{
       return await productService.UpdateProduct(catData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const RateProduct =createAsyncThunk(
    'product/rate-product',async(Data,thunkAPI)=>{
    try{
       return await productService.rateProduct(Data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteProduct = createAsyncThunk(
    'product/delete-product',async(id,thunkAPI)=>{
    try{
       return await productService.DeleteProduct(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState=createAction("Reset_all")




export const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products=action.payload;
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        } )
        .addCase(createProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdproducts=action.payload;
        })
        .addCase(createProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleProduct=action.payload
            state.getedProduct=action.payload.title;
            state.getedDescription=action.payload.description;
            state.getedBrand=action.payload.brand;
            state.getedColor=action.payload.color
            state.getedTag=action.payload.tags;
            state.getedPrice=action.payload.price;
            state.getedid=action.payload._id
            state.getedCategory=action.payload.category;
            state.getedQuantity=action.payload.quantity;
            state.getedImage=action.payload.images[0].url;
            state.getedImages=action.payload.images;
            state.getedRating=action.payload.totalrating.toString()
          
          
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
         
        })
        .addCase(updateProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedProduct=action.payload;
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedProduct=action.payload;
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addToWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishList=action.payload;
            state.message="product added to wishlist"
        })
        .addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(RateProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(RateProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.rating=action.payload;
            if(state.isSuccess){
                toast.success("Rating added succesfully")
            }
            state.message="product added to wishlist"
        })
        .addCase(RateProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState)
    }
})


export default productSlice.reducer