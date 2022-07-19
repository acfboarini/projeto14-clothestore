import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './loginScreen/Login';
import Signup from './signUpScreen/Singnup';
import Home from './homeScreen/Home';
import Cart from './cartScreen/Cart';
import InfosProduct from './infosProductScreen/InfosProduct';
import Checkout from './checkoutScreen/Checkout';
import Favorites from "./favoriteScreen/Favorites";
import Account from "./accountScreen/Account";

/***** Estilos *****/
import "../assets/css/reset.css";
import "../assets/css/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products/:productId" element={<InfosProduct/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </BrowserRouter>
  );
}