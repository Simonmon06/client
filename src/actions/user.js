import axios from 'axios'

export const searchUsers = async (token, query) =>{
    return await axios.post(`${process.env.REACT_APP_API}/search-users`, query, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

