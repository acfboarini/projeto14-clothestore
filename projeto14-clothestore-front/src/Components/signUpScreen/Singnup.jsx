import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [checkSenha, setCheckSenha] = useState('');

    const navigate = useNavigate();

    function  handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:5000/signup', {
            name,
            email,
            senha,
            checkSenha
        }).then(() => {
            navigate("/");
        }).catch(err => console.log(err.response.data));
       
    }

    return (
        <Main>
            <h1>ClotheStore</h1>
            <form onSubmit={handleSubmit}>
                
                < input type="text" placeholder="Nome" onChange={ e => setName(e.target.value)}/>
                < input type="text" placeholder="Email" onChange={ e => setEmail(e.target.value)}/>
                < input type="password" placeholder="Senha" onChange={ e => setSenha(e.target.value)}/>
                < input type="password" placeholder="Confirmar Senha" onChange={ e => setCheckSenha(e.target.value)}/>
                < button type="submit">Cadastrar</button>
            </form>
            <StyledLink to="/">Ja é cadastrado? Entre aqui</StyledLink>
        </Main>
    )
}

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    color: #ff6e2f;
    margin-top: 35px;
`;

const Main = styled.main`  
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-bottom: 60px;
        font-family: 'Lobster', cursive;
        color: #e47f54;
        
        font-size: 50px;
        font-weight: bold;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 90%;
        font-family: 'Padauk', sans-serif;
    }

    input {
        margin-bottom: 5px;
        width: 100%;
        height: 60px;
        background-color: #f0e3de;
        color: #d35005;
        text-indent: 10px;
        font-family: 'Poppins', sans-serif;
        font-size:20px;

        &::placeholder{
            color: #d35005;
        }
    }
    

    button {
        margin-top: 30px;
        width: 100%;
        height: 60px;
        background-color: #ff6e2f;
        box-shadow: 0px 0px 10px #e47f54;
        font-family: 'Poppins', sans-serif;

        color: #ffffff;
        font-size: 30px;
        font-weight:400;
    }
`