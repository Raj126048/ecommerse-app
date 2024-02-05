import { CreateSlice,createAction,createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const userDefaultState={
    _id:null,
    firstname:null,
    lastname:null,
    email:null,
    mobile:null,
    token:null
};


const initialState={
    user:userDefaultState,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
    
};



export const login =createAsyncThunk(
    'auth/admin-login',async(user,thunkAPI)=>{
    try{
       return await authService.login(user)
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

   
export const getOrders =createAsyncThunk(
    'order/get-orders',async(user,thunkAPI)=>{
    try{
       return await authService.getOrders();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

   
export const getUserCart =createAsyncThunk(
    'user/cart-get',async(thunkAPI)=>{
    try{
       return await authService.getCart();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

   
export const getOrder =createAsyncThunk(
    'order/get-order',async(id,thunkAPI)=>{
    try{
       return await authService.getOrder(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserProductWishList=createAsyncThunk("user/wishlist",async(thunkAPI)=>{
    try{
        return await authService.getUserWishList();
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})

export const addProdToCart=createAsyncThunk("user/cart-add",async(cartdata,thunkAPI)=>{
    try{
        return await authService.addToCart(cartdata);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCartProduct=createAsyncThunk("user/cart-delete",async(cartdata,thunkAPI)=>{
    try{
        return await authService.removeProductCart(cartdata);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const updateCartProduct=createAsyncThunk("user/cart-update",async(cartdata,thunkAPI)=>{
    try{
        
        return await authService.updateProductCart(cartdata);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const CreateOrder=createAsyncThunk("user/cart/create-order",async(orderData,thunkAPI)=>{
    try{
        
        return await authService.createOrder(orderData);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const getUserOrders=createAsyncThunk("user/order/get",async(orderData,thunkAPI)=>{
    try{
        
        return await authService.GetUserOrders(orderData);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const getMonthlyData=createAsyncThunk("user/monthlyorder/get",async(thunkAPI)=>{
    try{
        
        return await authService.getMonthlyOrders();
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const getYearlyData=createAsyncThunk("user/yearlyorder/get",async(thunkAPI)=>{
    try{
        
        return await authService.getYearlyStats();
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const updateOrders=createAsyncThunk("user/order/update",async(data,thunkAPI)=>{
    try{
        
        return await authService.updateOrder(data);
    }
    catch(error){
return thunkAPI.rejectWithValue(error)
    }
})
export const resetState=createAction("Reset_all")


export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getOrders.pending,((state)=>{
            state.isLoading=true;
        }))
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.orders=action.payload
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getOrder.pending,((state)=>{
            state.isLoading=true;
        }))
        .addCase(getOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.getedorder=action.payload
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getUserProductWishList.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(getUserProductWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist=action.payload

        })
        .addCase(getUserProductWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addProdToCart.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(addProdToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct=action.payload
            if(state.isSuccess){
                toast.success("Producted added to cart")
              }

        })
        .addCase(addProdToCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError){
                toast.error("something went wrong!")
              }
        })
        .addCase(getUserCart.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getcartProduct=action.payload
           

        })
        .addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
           
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedcartProduct=action.payload
            if(state.isSuccess===true){
                toast.success("Product removed from cart")
            }
           

        })
        .addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Something went Wrong")
            }
           
        })
        .addCase(updateCartProduct.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(updateCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedcartProduct=action.payload
            if(state.isSuccess===true){
                toast.success("Product updated from cart")
            }
           

        })
        .addCase(updateCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Something went Wrong")
            }
           
        })
        .addCase(CreateOrder.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(CreateOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orderedcartProduct=action.payload
         
           

        })
        .addCase(CreateOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Something went Wrong")
            }
           
        })
        .addCase(getUserOrders.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(getUserOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getedOrderedProducts=action.payload

           

        })
        .addCase(getUserOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
       
           
        })
        .addCase(getMonthlyData.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(getMonthlyData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getedMonthlyData=action.payload

           

        })
        .addCase(getMonthlyData.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
       
           
        })
        .addCase(getYearlyData.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(getYearlyData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.getedYearlyData=action.payload

           

        })
        .addCase(getYearlyData.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
       
           
        })
        .addCase(updateOrders.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(updateOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedOrder=action.payload

           

        })
        .addCase(updateOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
       
           
        })
        .addCase(resetState,()=>initialState)
    },
})







export default authSlice.reducer;