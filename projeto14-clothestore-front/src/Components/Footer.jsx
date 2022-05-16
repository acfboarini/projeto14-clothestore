import styled from "styled-components"
import { AiFillHome } from "react-icons/ai";
import { IoCartSharp, IoPersonSharp, IoHeartSharp } from "react-icons/io5";
import {Link} from "react-router-dom";

export default function Footer(){
    return(
        <Contrainer>
            <Link to="/home">
                < AiFillHome className="icon"/>
            </Link>
            
            <Link to="/favorites">
                < IoHeartSharp className="icon"/>
            </Link>
            
            <Link to="/cart">
                <IoCartSharp className="icon"/>
            </Link>
            
            <Link to="/account">
                <IoPersonSharp className="icon"/>
            </Link>
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