import styled from "styled-components";
import { IoAddSharp,IoArrowBackSharp,IoArrowBackOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import camiseta from "../assets/img/france.png";

export default function InfosProduct(){
    const [like, setLike] = useState(false);
    const navigate = useNavigate()
    return(
        <Container>
            
            <div className="imageProduct">
                <div className="menu">
                < IoArrowBackSharp  className="icon" onClick={() => navigate('/home')}/>
                { !like && < IoHeartOutline  className="icon"  onClick={() => setLike(true)}/>}
                { like && < IoHeartSharp className="iconSelected"  onClick={() => setLike(false)}/>}
            </div>
                
                <img src={camiseta} alt="camiseta" />
            </div>
            
            <div className="infos"> 
                <div className="title">
                    <h1>Camisa France</h1>
                    
                </div>
                <div className="size">
                    <p>Size</p>
                    <select>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                    </select>
                </div>
                <div className="price">
                    <p>R$ 199,00</p>
                </div>

                <button>Add to Cart</button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    *{
        box-sizing: border-box;
        border: none;
    }

    background-color: #f5f5f5;
    width: 100%;
    height: 100%;

    .menu{
        padding: 0 5%;
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        justify-content: space-between;

        .icon{
            font-size: 30px;
        }

        .iconSelected{
            font-size: 30px;
            color: #ff6e2f;
        }
    }

    .imageProduct{
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        z-index: 1;
        background-color: #f5f5f5;
        border-radius: 0 0 0 0px;
        box-shadow: 0px 0px 10px #e47f54;
        align-items: center;
        width: 100%;
        height: 50vh;
    }
    

    img{
        margin-top: 10px;
        max-width: 350px;
        max-height: 400px;
    }

    .infos{
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        bottom: 0;
        left: 0;
        background-color: #f0e3de;
        color: #d35005;
        height: 50vh;

        .title{
        
            width: 90%;
            justify-content: space-between;
            display: flex;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;

            h1{
                color: #000000;
                font-size: 35px;
            }

            

        }

        .size{
            display: flex;
            width: 90%;

            p{
                font-size: 20px;
                font-weight: 400;
                color: #000000;
                font-family: 'Poppins', sans-serif;
                margin-right: 10px;
            }
        }
        
        .price{
            display: flex;
            width: 100%;
            padding: 0 5%;
            margin-top: 20px;
            justify-content: end;
            p{
                font-size: 30px;
                text-align: end;
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
            bottom: 5%;
            left: 5%;
            font-family: 'Poppins', sans-serif;

            color: #ffffff;
            font-size: 30px;
            font-weight:400;
        }
    }
`