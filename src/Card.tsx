import "./Card.css";
import { Cat, FavouriteCatId } from "./App";

interface IPropsCard {
    cat: Cat,
    favouriteCatsId: FavouriteCatId[],
    setFavouriteCatsId: React.Dispatch<React.SetStateAction<FavouriteCatId[]>>,
}

export default function Card(props: IPropsCard) {

    const isFavourite = props.favouriteCatsId.find((fav: FavouriteCatId) => fav.cat_id === props.cat.id);

    const onClick = (id: string) => {
        if (!isFavourite) {
            addFavouriteCat(id);
        } else {
            delFavouriteCat(id);
        };
    };

    let addFavouriteCat = (cat_id: string) => {
        let items = [...props.favouriteCatsId];
        items.push({ cat_id: cat_id });
        props.setFavouriteCatsId(items);
        try {
            localStorage.setItem("favouriteCats", JSON.stringify(items));
        } catch {
            console.log("Error: function AddToCart, localStorage.setItem");
        }
    };

    let delFavouriteCat = (cat_id: string) => {
        let items = props.favouriteCatsId.filter((item: FavouriteCatId) => {
            return item.cat_id !== cat_id;
        });
        props.setFavouriteCatsId(items);
        try {
            localStorage.setItem("favouriteCats", JSON.stringify(items));
        } catch {
            console.log("Error: function DeleteFromCart, localStorage.setItem");
        }
    };

    return (
        <div className="card" key={props.cat.id}>
            <img
                src={props.cat.url}
                className="card__image"
                alt="Error"
            />
            <div
                className={`card__like ${isFavourite ? "_favourite" : ""}`}
                onClick={() => onClick(props.cat.id)}
            />
        </div>
    );
}
