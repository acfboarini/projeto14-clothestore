import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header"
import Footer from "./Footer";
import { useState } from "react";


export default function Home(){

    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [reload, setReload] = useState(true);
    
    if (reload) {
        const promise = axios.get("http://localhost:5000/products", config)
        promise.then(response => {
            console.log(response);
            setReload(false);
            setProducts(response.data);
        
            const futebol = response.data.filter(product => product.category === "futebol");
            const dataCategory = [...new Set(response.data.map(product => { return product.category}))];
            setCategory(dataCategory);
        })
        promise.catch(err => console.log("Erro ao buscar produtos"));
    }  
    
    return(
        <Container>
            <Header />

            {category.length > 0 ?

                category.map((category, index) => {

                    return (
                        <>
                            <h2>{category}</h2>
                            <Products>
                                {products.length === 0? 
                                    <div className="empty">Não ha produtos disponiveis</div>:
                                    products.map(product => { 
                                        if (product.category === category) {
                                            const {_id, title, price, imgURL} = product;
                                            return (
                                                <Product key={_id}>
                                                    <img src={imgURL} alt={title}/>
                                                    <button onClick={() => navigate(`/products/${_id}`)}>
                                                        <IoAddSharp className="icon"/>
                                                    </button>
                                                    <p>{title}</p>
                                                    <p>R${price}</p>
                                                </Product>
                                            )
                                        }
                                    })
                                }
                            </Products>
                            <Footer/>
                        </>
                    ) 
            }) : <> </>}
        </Container>
    );
}

const Container = styled.div`
    *{
        box-sizing: border-box;
        border-radius: 10px;
        border: none;
    }

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;



    h2{
        text-align:start;
        width: 90%;
        padding: 10px 0;
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        font-weight: bold;
        color: #060113;

        :first-of-type{
            margin-top: 150px;
        }
    }

    :last-of-type{
        margin-bottom: 70px;
    }
`
const Products = styled.div`

        *{
            box-sizing: border-box;
        }

        width: 90%;
        min-height: 370px;
        padding: 2px;
        display: flex;
        overflow: hidden;
        overflow-x: scroll;
        margin-top: 10px;

        .empty{
            width: 100%;
        }

        


`

const Product = styled.div`

    min-width: 200px;
    height: 350px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    align-items: center;
    justify-content: start;
    box-shadow: 0px 0px 10px #e47f54;
    background-color: #ffffff;
    img{
        margin-top: 10px;
        max-width: 250px;
        max-height: 200px;
    }

    button{
        margin-top: 10px;
        background-color: #d35005;
        .icon{
            color: #ffffff;
            font-size:35px;
        }

    }

    p{
        margin-top: 20px;
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
    }

    

`