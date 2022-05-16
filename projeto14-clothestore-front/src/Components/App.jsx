import {BrowserRouter,Routes, Route} from 'react-router-dom';
import "../assets/css/reset.css";
import Signup from './Singnup';
import Home from './Home';
import InfosProduct from './InfosProduct';
import Checkout from './Checkout';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Login/>} /> */}
            <Route path="/signup" element={<Signup/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/infosProduct" element={<InfosProduct/>} />
            <Route path="/checkout" element={<Checkout/>} />
        </Routes>
    </BrowserRouter>
  );
}


