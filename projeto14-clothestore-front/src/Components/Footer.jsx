import styled from "styled-components"
import { AiFillHome } from "react-icons/ai";
import { IoCartSharp, IoPersonSharp, IoHeartSharp } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";

export default function Footer(props){

    const navigate = useNavigate();
    return(
        <Contrainer>
            
            < AiFillHome className="icon" onClick={() => navigate("/home")}/>
            < IoHeartSharp className="icon" onClick={() => navigate("/favorites")}/>
            <IoCartSharp className="icon" onClick={() => navigate("/cart")}/>
            <IoPersonSharp className="icon" onClick={() => navigate("/person")}/>

        </Contrainer>
    )

}

const Contrainer = styled.div`
    
    display: flex;
    align-items: center;
    /* padding: 0 10px ; */
    justify-content: space-around;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 0px;
    position: fixed;
    bottom: 0;
    left: 0;

    .icon{
        font-size: 30px;
    }
    .icon:first-of-type{
        color: #ff6e2f;
    }
    
`