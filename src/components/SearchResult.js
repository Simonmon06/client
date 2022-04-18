import { useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import queryString from 'query-string'
import SearchBar from "./SearchBar"
import { searchItems } from "../actions/item"
import SmallCard from '../components/cards/SmallCard'

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
            <div className='col'>
                <br/>
                <SearchBar/>
            </div>
            <div className='container'>
                <div className='row'>
                    {
                    searchResults && searchResults.map(result => (<SmallCard key={result._id} item={result}/>))
                    }
                </div>
            </div>
        </div>
    )
}
export default SearchResult


