export default function Account(){

    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    return (
        <main>
            Infos da Conta
        </main> 
    )
}