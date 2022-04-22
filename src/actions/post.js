import axios from 'axios'

export const createPost= async (token, data)=>{
    console.log('data', data)
    return await axios.post(`${process.env.REACT_APP_API}/create-post`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const getAllPosts= async (token, data)=>{
    return await axios.get(`${process.env.REACT_APP_API}/posts`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const getUserPosts= async (token)=>{
    return await axios.get(`${process.env.REACT_APP_API}/user-posts`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const deletePost= async (token, postId)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/delete-post/${postId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}


export const updateLike= async (token, postId)=>{
    console.log('token', token)
    return await axios.put(`${process.env.REACT_APP_API}/post/like/${postId}`, null, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateUnlike= async (token, postId)=>{
    return await axios.put(`${process.env.REACT_APP_API}/post/unlike/${postId}`, null, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const getOnePost= async (token,postId)=>{
    return await axios.get(`${process.env.REACT_APP_API}/post/${postId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateComment= async (token, postId, comment)=>{
    return await axios.put(`${process.env.REACT_APP_API}/post/comment/${postId}`, comment, {
        headers:{
            Authorization: `Bearer ${token}`
        },
    })
}

export const updateUnComment= async (token, postId, comment)=>{
    return await axios.put(`${process.env.REACT_APP_API}/post/uncomment/${postId}`, [], {
        headers:{
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({comment})
    })
}
