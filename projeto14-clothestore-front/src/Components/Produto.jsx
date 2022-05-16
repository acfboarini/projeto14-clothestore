import styled from "styled-components";

import camisa01 from "./../assets/img/camisa01.jpg";

export default function Produto(props) {

    const {_id, title, price, imgURL, description} = props;

    function removeProduct() {

    }

    return (
        <Li>
            <section>
                <img src={imgURL} alt="produto1"/>
                <article>
                    <h3>{title}</h3>
                    <h3 className="price">R${price}</h3>
                </article>
                <article className="botoes">
                    <button className="add"><ion-icon name="add-circle"></ion-icon></button>
                    <p>1</p>
                    <button className="remove"><ion-icon name="remove-circle"></ion-icon></button>
                </article>  
            </section>
            <button onClick={removeProduct} style={{color: "#888888"}}>
                <ion-icon name="trash-sharp"></ion-icon>
            </button>
        </Li>
    )
}

const Li = styled.li`
    width: 100%;
    display: flex;
    align-items: center;

    > section {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        margin: 10px;
        border: 1px solid #c2c2c2;
        border-radius: 5px;
    }

    img {
        max-width: 70px;
        max-height: 70px;
    }

    article h3.price {
        color: #ff6e2f;
    }

    article.botoes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .botoes button ion-icon {
        font-size: 20px;
    }

    button.add {
        color: #ff6e2f;
    }

    button.remove {
        color: #888888;
    }
`;