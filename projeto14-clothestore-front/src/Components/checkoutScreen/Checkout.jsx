import styled from "styled-components";
import { IoCardOutline, IoArrowBackSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";

import Footer from "./../Footer";

export default function Ckeckout(){
    const userJSON = window.localStorage.getItem("user");
    const {token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const [reload, setReload] = useState(true);
    const [like, setLike] = useState(false);
    const [total_price, setTotal_price] = useState(0);
    const navigate = useNavigate();

    if (reload) {
        const promise = axios.get("http://localhost:5000/cart/total", config);
        promise.then(response => {
            const {total} = response.data;
            console.log(total);
            setReload(false);
            setTotal_price(total);
            //getProductsById(response.data);
        })
        promise.catch(err => console.log(err));
    }

    /*function getProductsById(ids) {
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
    }*/

    return(
        <>
            <Container>
                <div className="menu">
                    < IoArrowBackSharp  className="icon" onClick={() => navigate('/home')}/>
                    { !like && < IoHeartOutline  className="icon"  onClick={() => setLike(true)}/>}
                    { like && < IoHeartSharp className="iconSelected"  onClick={() => setLike(false)}/>}
                </div>
                <h1>Checkout</h1>
                <div className="endereco">
                    <h1> Informações para envio</h1>
                </div>
        
                <div className="pagamento">
                    <h1>Pagamento</h1>
                    <div className="cartao">
                        < IoCardOutline  className="icon"/>
                        <input></input>
                    </div>
                    
                </div>

                <div className="price">
                    <p>Total:</p>
                    <p>R${total_price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button>Confirmar</button>
            </Container>
            <Footer/>
        </>
    )
}

const Container = styled.div`
    *{
        box-sizing: border-box;
        border: none;
    }

    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-bottom: 90px;
    position: relative;

    h1{
        padding: 0 5%;
        width: 100%;
        margin-top: 10px;
        font-size: 30px;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
    }

    .menu{
        padding: 0 5%;
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        /* position: absolute;
        top: 0;
        left: 0; */
        justify-content: space-between;

        .icon{
            font-size: 30px;
        }

        .iconSelected{
            font-size: 30px;
            color: #ff6e2f;
        }
    }

    
    .endereco{
        display: flex;
        margin-top: 20px;
        flex-direction: column;
        justify-content: center;
        
        background-color: #f0e3de;
        box-shadow: 0px 0px 10px #e47f54;
        color: #d35005;
        align-items: center;
        border-radius: 10px;
        width: 90%;
        margin-bottom: 20px;
        margin-left: 5%;
        height: 200px;
    }

    .pagamento{
        display: flex;
        margin-top: 10px;
        flex-direction: column;
        justify-content: center;
        background-color: #ff6e2f;
        box-shadow: 0px 0px 10px #e47f54;
        align-items: center;
        border-radius: 30px;
        color: #FFFFFF;
        width: 90%;
        margin-left: 5%;
        margin-bottom: 20px;
        height: 200px;

        .cartao{
            display: flex;
            width: 100%;
            padding: 0 5%;
            margin-top: 5px;

            input{
                width: 100%;
                background-color: #f17945;
            }

            .icon{
                color: #FFFFFF;
                font-size: 30px;
                margin-right: 5px;
            }
        }
    }

    .price{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0 5%;
            margin-bottom: 80px;
            p{
                font-size: 30px;
                font-weight: bold;
                font-weight: 400;

            }
            
    }

    button{
            margin-top: 30px;
            width: 90%;
            height: 60px;
            background-color: #ff6e2f;
            box-shadow: 0px 0px 10px #e47f54;
            position: absolute;
            bottom: 0px;
            left: 5%;
            font-family: 'Poppins', sans-serif;

            color: #ffffff;
            font-size: 30px;
            font-weight:400;
        }
`