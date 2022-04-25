import { useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import queryString from 'query-string'
import SeachUserBar from "./SearchUserBar"
import { searchUsers } from "../../actions/user"
import moment from 'moment'

const SearchUserResult =() =>{
    const {auth} = useSelector((state) => ({...state}))
    const [searchName, setSearchName] = useState('')
    const [searchResults, setSearchResults] = useState('')

    useEffect(() => {
        const {name} = queryString.parse(window.location.search)
        searchUsers(auth.token, {name}).then(res=>{
            console.log('Search results: =====> ', res.data)
            setSearchResults(res.data)
        })
    },[window.location.search])


    return (
        <div>
            <div className='container-fluid jumbotron'>
                <h1 style={{color: 'white'}}>Search Users</h1>
            </div>
            <div className='col'>
                <br/>
                <SeachUserBar/>
            </div>
            <div className='container'>
                <div className='col'>
                    <div className="d-flex justify-content-center">
  
                    {
                    searchResults && searchResults.map(result => (
                        <div className="card text-center" style={{width: '18rem'}}>
                            <div className='card-header'>
                                {result.name}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{result.email}</li>
                                <li className="list-group-item">{`Joined ${moment(result.createdAt).fromNow()}`}</li>
                            </ul>
                        </div>
                    ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchUserResult


