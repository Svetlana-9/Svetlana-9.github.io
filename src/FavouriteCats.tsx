import Card from "./Card";
import { Cat } from "./App";
import { IPropsCats } from "./AllCats";
import { useEffect, useState } from "react";

export default function FavouriteCats(props: IPropsCats) {

    const [favCats, setFavCats] = useState<Cat[]>([]);

    useEffect(() => {
        async function getData(url: RequestInfo | URL) {
            const result = await fetch(url);
            if (result.ok) {
                return result.json();
            } else return Promise.reject(result.status);
        }

        const promises: Promise<Cat>[] = props.favouriteCatsId.map((favCat) => {
            return getData(`https://api.thecatapi.com/v1/images/${favCat.cat_id}`);
        })

        Promise.all(promises)
            .then((data) => {
                setFavCats(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.favouriteCatsId]);

    return (
        <div className="cats">
            {favCats.map((cat: Cat) => (
                <Card cat={cat} key={cat.id} favouriteCatsId={props.favouriteCatsId} setFavouriteCatsId={props.setFavouriteCatsId} />
            ))}
        </div>
    );
}
