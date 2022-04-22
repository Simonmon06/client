import { useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import queryString from 'query-string'
import SearchBar from "./SearchBar"
import { searchItems } from "../actions/item"

import ItemCard from "../components/cards/ItemCard";
const SearchResult =() =>{
    const [searchTitle, setSearchTitle] = useState('')
    const [searchCondition, setSearchCondition] = useState('')
    const [searchResults, setSearchResults] = useState('')

    useEffect(() => {
        const {title, condition} = queryString.parse(window.location.search)
        searchItems({title, condition}).then(res=>{
            console.log('Search results: =====> ', res.data)
            setSearchResults(res.data)
        })
    },[window.location.search])


    return (
        <div>
            <div className='container-fluid jumbotron'>
                <h1 style={{color: 'white'}}>Search Result</h1>
            </div>
            <div className='col'>
                <br/>
                <SearchBar/>
            </div>
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-3'>
                    {
                    searchResults && searchResults.map(result => (<ItemCard key={result._id} item={result}/>))
                    }
                </div>
            </div>
        </div>
    )
}
export default SearchResult


