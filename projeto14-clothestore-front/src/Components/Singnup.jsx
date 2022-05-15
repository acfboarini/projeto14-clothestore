import styled from 'styled-components';

export default function Signup() {
    function handleSubmit(event) {
        event.preventDefault();
       
    }
    return (
        <Container>
            <h1> Cloth Store</h1>
            <form onSubmit={handleSubmit}>
                
                < input type="text" placeholder="Nome" />
                < input type="text" placeholder="Email" />
                < input type="password" placeholder="Senha" />
                < input type="password" placeholder="Confirmar Senha" />
                < button type="submit">Cadastrar</button>
            </form>
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
    justify-content: center;
    align-items: center;
    
    background-color: #f5f5f5;

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