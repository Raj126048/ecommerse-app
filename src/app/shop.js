import {configureStore} from '@reduxjs/toolkit'
import customerReducer from '../features/customers/CustomerSlice.js'
import authReducer from "../features/auth/authSlice.js"
import productReducer from '../features/product/productSlice.js'
import brandReducer from '../features/brand/brandSlice.js'
import categoryReducer from '../features/pCategory/pCategorySlice.js'
import colorReducer from '../features/colors/colorSlice.js'
import uploadReducer from '../features/upload/uploadSlice.js'
import couponReducer from '../features/coupon/couponSlice.js'
import contactReducer from '../features/contact/contactSlice.js'
export const store=configureStore({
    reducer:{auth:authReducer,customer:customerReducer,product:productReducer,brand:brandReducer,pcategory:categoryReducer,color:colorReducer,upload:uploadReducer,coupon:couponReducer,contact:contactReducer},
})