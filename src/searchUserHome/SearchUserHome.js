import SeachUserBar from "../components/SearchUserBar"
const SearchUserHome = () => {

    return (
        <div>
            <div className='container-fluid jumbotron'>
                <h1 style={{color: 'white'}}>Search Users</h1>
            </div>
            <div className='col'>
                <br/>
                <SeachUserBar/>
            </div>
        
        </div>
    )
}

export default SearchUserHome;