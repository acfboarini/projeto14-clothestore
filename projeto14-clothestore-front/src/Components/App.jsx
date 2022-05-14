import {BrowserRouter,Routes, Route} from 'react-router-dom';

import Signup from './Singnup';
import Home from './Home';
import "../assets/css/reset.css";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Login/>} /> */}
            <Route path="/signup" element={<Signup/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    </BrowserRouter>
  );
}

