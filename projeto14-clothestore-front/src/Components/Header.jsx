import styled from "styled-components"
import { IoSearch} from "react-icons/io5";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const navigate = useNavigate();

    function logout() {
        window.localStorage.clear();
        axios.delete("http://localhost:5000/logout", config);
        navigate("/");
    }

    return (
        <Contrainer>
            <div className="topo">
                <button>
                    <ion-icon name="person-circle"></ion-icon>
                </button>
                <h1>ClotheStore</h1>
                <button onClick={logout}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </button>
            </div>
            <div className="search">
                < IoSearch  className="icon"/>
                <input type="text" placeholder="Search" />
            </div>
        </Contrainer>
    )

}

const Contrainer = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .topo {
        width: 100%;
        padding: 0px 40px;
        display: flex;
        lign-items: center;
        justify-content: space-between;
    }

    h1{
        margin: 10px 0;
        font-family: 'Lobster', cursive;
        color: #e47f54;
        font-size: 50px;
        font-weight: bold;
    }

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