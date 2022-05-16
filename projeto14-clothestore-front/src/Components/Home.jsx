import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import camisa01 from "../assets/img/camisa01.jpg";
import france from "../assets/img/france.png";
import Header from "./Header"
import Footer from "./Footer";


export default function Home(){

    const navigate = useNavigate()
    
    return(
        <Container>
            <Header />
            
            <h2>Blusas</h2>
            <Products>

                <Product>
                    < img src={france} alt="produto1" />
                    <button onClick={() => navigate('/infosProduct')}>
                        <IoAddSharp className="icon" />
                    </button>
                    <p> Camisa France</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>

                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
            </Products>

            <h2>Blusas</h2>
            <Products>

                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>

                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
            </Products>

            <h2>Blusas</h2>
            <Products>

                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>

                <Product>
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </Product>
            </Products>
            < Footer />
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