import axios from 'axios'



export const createItem= async (token, data)=>{
    return await axios.post(`${process.env.REACT_APP_API}/create-item`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const allItems= async (token, data)=>{
    return await axios.get(`${process.env.REACT_APP_API}/items`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const diffDays = (from, to) => {
    const day = 24*60*60*1000
    const start = new Date(from)
    const end = new Date(to)
    const difference = Math.round(Math.abs((start-end)/day))
    return difference
}

export const sellerItems= async (token)=>{
    return await axios.get(`${process.env.REACT_APP_API}/seller-items`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}


export const deleteItem= async (token, itemId)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/delete-item/${itemId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const readItem= async (itemId)=>{
    return await axios.get(`${process.env.REACT_APP_API}/item/${itemId}`)
}

export const updateItem= async (token, data, itemId)=>{
    return await axios.put(`${process.env.REACT_APP_API}/update-item/${itemId}`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}