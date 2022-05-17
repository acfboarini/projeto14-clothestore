import styled from "styled-components";
import Produto from "./Produto";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import {useNavigate} from "react-router-dom";

import Footer from "./Footer";

export default function Cart() {

    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const[reload, setReload] = useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    if (reload) {
        const promise = axios.get("http://localhost:5000/cart", config);
        promise.then(response => {
            setReload(false);
            getProductsById(response.data);
        })
        promise.catch(err => console.log("Erro ao buscar produtos"));
    }

    function getProductsById(ids) {
        let listaProduto = [];
        ids.forEach(async id => {
            try {
                const {data} = await axios.get(`http://localhost:5000/products/${id}`, config);
                listaProduto = [...listaProduto, data];
                setProducts(listaProduto);
            } catch(err) {
                console.log(err);
            }
        })
    }

    return (
        <>
            <Header/>
            <Main>
                <h2>Cart</h2>
                <ul>       
                    {products.length !== 0?
                    products.map(product => {
                        const {_id, title, price, imgURL, description} = product;
                        return <Produto
                            key={_id} id={_id} title={title} price={price}
                            imgURL={imgURL} description={description}
                        />
                    }): 
                    <div className="empty">Seu carrinho esta vazio</div>}
                </ul>
                {products.length !==0?
                    <button onClick={() => navigate("/checkout")}>prosseguir para checkout</button>
                    :
                    <></>
                }
            </Main>
            <Footer/>
        </>
    );
}

const Main = styled.main`
    width: 100%;
    padding: 10px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 110px;

    h2 {
        width: 100%;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /*overflow: scroll;*/
    }
    
    > button {
        width: 326px;
        height: 46px;
        font-size: 20px;
        font-weight: 400;
        font-family: 'Poppins', sans-serif;
        background-color: #ff6e2f;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 14px;
    }
`