import { Routes ,Route} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminLayout from "./components/Layouts/AdminLayout";

import OurStore from "./pages/OurStore.js";
import WishList from "./pages/WishList.js";
import SingleProduct from "./pages/SingleProduct.js";
import Cart from "./pages/Cart.js";
import Checkout from "./pages/Checkout.js";
import Order from "./pages/Order.js";
import Customers from "./pages/Customers.js";
import ColorList from "./pages/ColorList.js";
import CategoryList from "./pages/CategoryList.js";
import AddColorList from "./pages/AddColorList.js";
import AddCat from "./pages/AddCat.js";
import BrandList from "./pages/BrandList.js";
import Brand from "./pages/Brand.js";
import AddProduct from "./pages/AddProduct.js";
import ProductList from "./pages/user/ProductList.js";
import Coupon from "./pages/Coupon.js";
import AddCoupon from "./pages/AddCoupon.js";
import ViewOrder from "./pages/ViewOrder.js";
import ResetPassword from "./pages/ResetPassword.js";
import MyOrders from "./pages/MyOrders.js";




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='/store' element={<OurStore />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="product/:id" element={<SingleProduct/>}/>
        <Route path="/store/product/:id" element={<SingleProduct/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
      
   
        
        <Route path="user/orders" element={<MyOrders/>}/>
        <Route path="user/wishlist" element={<WishList/>}/>
        <Route path="user/profile" element={<Profile/>}/>
    </Route>

    <Route path="reset-password/:token" element={<ResetPassword/>}/>
    <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminLayout/>}>
           <Route path="db" element={<AdminDashboard/>}/>
           <Route path="orders" element={<Order/>}/>
           <Route path="orders/:id" element={<ViewOrder/>}/>
           <Route path="coupon" element={<AddCoupon/>}/>
           <Route path="coupon/:id" element={<AddCoupon/>}/>
           <Route path="coupon-list" element={<Coupon/>}/>
           <Route path="users" element={<Customers/>}/>
           <Route path="colors-list" element={<ColorList/>}/>
           <Route path="category-list" element={<CategoryList/>}/>
           <Route path="add-colors" element={<AddColorList/>}/>
           <Route path="add-colors/:id" element={<AddColorList/>}/>
           <Route path="category" element={<AddCat/>}/>
           <Route path="category/:id" element={<AddCat/>}/>
           <Route path="brand-list" element={<BrandList/>}/>
           <Route path="brand" element={<Brand/>}/>
           <Route path="brand/:id" element={<Brand/>}/>
           <Route path="create-product" element={<AddProduct/>}/>
           <Route path="create-product/:id" element={<AddProduct/>}/>
           <Route path="product-list" element={<ProductList/>}/>
        

        <Route path="create-category" element={<CreateCategory/>}/>
        <Route path="create-product" element={<CreateProduct/>}/>
        <Route path="admin/users" element={<User/>}/>
        </Route>
    </Route>
        <Route path='/register' element={<Register />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/*' element={<PageNotFound />} />

       
      </Routes>
     
    </>
  );
}

export default App;
