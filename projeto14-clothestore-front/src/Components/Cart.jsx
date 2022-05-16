import styled from "styled-components";
import Produto from "./Produto";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
    const config = {
        headers: {Authorization: `Bearer 1b28fe8e-a51e-4b1d-965a-378c3fa06227`}
    }

    const[reload, setReload] = useState(true);
    const [products, setProducts] = useState([]);

    if (reload) {
        const promise = axios.get("http://localhost:5000/cart", config);
        promise.then(response => {
            console.log(response.data);
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
            <Header>
                <button>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
                <button>
                    <ion-icon name="log-out-outline"></ion-icon>
                </button>
            </Header>
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
                    <button>prosseguir para checkout</button>:
                    <></>
                }
            </Main>
        </>
    );
}

const Header = styled.header`
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Main = styled.main`
    width: 100%;
    padding: 10px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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