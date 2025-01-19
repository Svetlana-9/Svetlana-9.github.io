import { useEffect, useState } from "react";
import Navigation from "./Navigation.tsx";
import AllCats from "./AllCats.tsx";
import FavouriteCats from "./FavouriteCats.tsx";

export interface Cat {
    id: string,
    url: string,
}

export interface FavouriteCatId {
    cat_id: string,
}

export function App() {
    
    const [section, setSection] = useState<string>("allCats");
    const [favouriteCatsId, setFavouriteCatsId] = useState<FavouriteCatId[]>([]);

    useEffect(() => {
        try {
            const value = localStorage.getItem('favouriteCats');
            setFavouriteCatsId(value ? JSON.parse(value) : []);
        } catch {
            console.log("Error: LocalStorage.getItem");
        }
    }, []);

    return (
        <>
            <Navigation setSection={setSection} />
            {section === "allCats" ? (
                <AllCats favouriteCatsId={favouriteCatsId} setFavouriteCatsId={setFavouriteCatsId} />
            ) : (
                <FavouriteCats favouriteCatsId={favouriteCatsId} setFavouriteCatsId={setFavouriteCatsId} />
            )}
        </>
    );
}
