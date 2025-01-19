import "./Cats.css";
import Card from "./Card";
import { Cat, FavouriteCatId } from "./App";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useRef, useState } from "react";

const api_key =
    "live_BKJPuclaQPqvtxkdFsFTuWLABQ8L7zu4HzoZPEIxBtCD75OZeSDLcuJudyqJepE1";

export interface IPropsCats {
    favouriteCatsId: FavouriteCatId[],
    setFavouriteCatsId: React.Dispatch<React.SetStateAction<FavouriteCatId[]>>,
}

const pageAllCatsHeight = document.documentElement.scrollHeight - 65 - 48;
const pageAllCatsWidth = document.documentElement.scrollWidth - 120;
const countCatsOnPageByWidth = Math.floor(pageAllCatsWidth / 305) + (pageAllCatsWidth % 305 >= 225 ? 1 : 0);
const countCatsOnPageByHeight = Math.floor(pageAllCatsHeight / 305) + (pageAllCatsHeight % 305 >= 225 ? 1 : 0);
const countCatsOnPage = countCatsOnPageByHeight * countCatsOnPageByWidth;
const countCatsForFetch = countCatsOnPage * 2;

export default function AllCats(props: IPropsCats) {

    const [cats, setCats] = useState<Cat[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const didMountRef = useRef<boolean>(false);

    const fetchMoreData = async () => {
        try {
            const url = `https://api.thecatapi.com/v1/images/search?limit=${countCatsForFetch}&page=${page}&order=ASC`;
            const response = await fetch(url, {
                headers: {
                    "x-api-key": api_key,
                }
            });
            let data = [];
            if (response.ok) {
                data = await response.json();
            } else return Promise.reject(response.status);
            setCats(prevCats => [...prevCats, ...data]);
            setPage(prevPage => prevPage + 1)
            if (data.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error when uploading data:', error);
        }
    };

    useEffect(() => {
        // useMount called twice in React Strict Mode
        if (!didMountRef.current) {
            fetchMoreData();
        }
        didMountRef.current = true
    }, []);

    return (
        <InfiniteScroll
            dataLength={cats.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: 'center' }}>Загрузка...</h4>}
        >
            <div className="cats">
                {cats.map((cat: Cat) => (
                    <Card cat={cat} key={cat.id} favouriteCatsId={props.favouriteCatsId} setFavouriteCatsId={props.setFavouriteCatsId} />
                ))}
            </div>
        </InfiniteScroll>
    );
}
