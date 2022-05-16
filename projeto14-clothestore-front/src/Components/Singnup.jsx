import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Signup() {
    function handleSubmit(event) {
        event.preventDefault();
       
    }
    return (
        <Container>
            <h1>ClotheStore</h1>
            <form onSubmit={handleSubmit}>
                
                < input type="text" placeholder="Nome" />
                < input type="text" placeholder="Email" />
                < input type="password" placeholder="Senha" />
                < input type="password" placeholder="Confirmar Senha" />
                < button type="submit">Cadastrar</button>
            </form>
            <StyledLink to="/">Ja é cadastrado? Entre aqui</StyledLink>
        </Container>
    );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    color: #ff6e2f;
    margin-top: 35px;
`;

const Container = styled.div`
    *{
        border-radius: 10px;
        border: none;
    }
    
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        margin-bottom: 60px;
        font-family: 'Lobster', cursive;
        color: #e47f54;
        
        font-size: 50px;
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: column;
        width: 90%;
        font-family: 'Padauk', sans-serif;
    }

    input{
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
    

    button{
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