import {BrowserRouter,Routes, Route} from 'react-router-dom';

import Login from './Login';
import Signup from './Singnup';
import Home from './Home';
import Cart from './Cart';

import "../assets/css/reset.css";
import "../assets/css/style.css";

import InfosProduct from './InfosProduct';
import Checkout from './Checkout';

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

        </Routes>
    </BrowserRouter>
  );
}