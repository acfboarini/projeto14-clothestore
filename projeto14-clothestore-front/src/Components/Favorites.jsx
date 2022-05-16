export default function Favorites(){

    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    return (
        <main>
            Favoritos
        </main> 
    )
}