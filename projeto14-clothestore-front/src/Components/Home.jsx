import styled from "styled-components";
import { IoSearch,IoAddSharp } from "react-icons/io5";
import camisa01 from "../assets/img/camisa01.jpg";

export default function Home(){
    
    return(
        <Container>
            <div className="search">
                < IoSearch  className="icon"/>
                <input type="text" placeholder="Search" />
            </div>
            <Products>
                <div className="product">
                    < img src={camisa01} alt="produto1" />
                    <button>
                        <IoAddSharp className="icon"/>
                    </button>
                    <p> Blusa Branca</p>
                </div>
            </Products>

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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;

    .search {
        width: 90%;
        height: 60px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        background-color: #f0e3de;
        border-radius: 10px;
        padding: 10px;

        .icon{
            color: #d35005;
            font-size:35px;
        }
        
        input{

            width: 100%;
            /* height: 60px; */
            background-color: #f0e3de;
            color: #d35005;
            text-indent: 10px;
            font-family: 'Poppins', sans-serif;
            font-size:20px;
            
            &::placeholder{
                color: #d35005;
                font-size: 20px;
            }
        }

        textarea:focus, input:focus {
            box-shadow: 0 0 0 0;
            outline: 0;
        }
        
        
    }
`
const Products = styled.div`

        width: 90%;
        height: auto;
        background-color: gray;
        margin-top: 10px;
        .product{
            width: 250px;
            height: 350px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            background-color: #ffffff;
            img{
                margin-top: 10px;
                width: 150px;
                height: 200px;
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

            
        }

`