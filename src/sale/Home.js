import { allItems } from "../actions/item";
import {useState, useEffect} from 'react'
import ItemCard from "../components/cards/ItemCard";
import SearchBar from "../components/search/SearchBar";

const Home = () => {
    const [items, setItems] = useState([])
    const loadAllItems = async() =>{
        let res = await allItems()
        setItems(res.data)
    }

    useEffect(()=>{
        loadAllItems();
    },[])


    return (
        <>
            <div className="container-fluid jumbotron">
                <h1 style={{color: 'white'}}>Welcome to Gundam Model Shop</h1>
            </div>
            <div className='col'>
                <br/>
                <SearchBar/>
            </div>
            <div className="container-fluid">
                <br/>
                <div className='row row-cols-1 row-cols-md-3'>
                {
                    items.map(item => (
                        <ItemCard key={item._id} item={item}  owner={false} showViewMoreButton/>
                    ))
                }
                </div>
            </div>

        </>

    )
}

export default Home;