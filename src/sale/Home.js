import { allItems } from "../actions/item";
import {useState, useEffect} from 'react'
import SmallCard from "../components/cards/SmallCard";
import SearchBar from "../components/SearchBar";

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
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Welcome to Gundam Model Shop</h1>
            </div>
            <div className='col'>
                <br/>
                <SearchBar/>
            </div>
            <div className="container-fluid">
                <br/>
                {
                    items.map(item => (
                        <SmallCard key={item._id} item={item}/>
                    ))
                }
            </div>

        </>

    )
}

export default Home;