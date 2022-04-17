import axios from 'axios'

export const createConnectAccount = async(token) =>{
    return await axios.post(`${process.env.REACT_APP_API}/create-connect-account`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getAccountStatus = async(token) =>{
    return axios.post(`${process.env.REACT_APP_API}/get-account-status`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}


export const getAccountBalance = async(token) =>{
    return axios.post(`${process.env.REACT_APP_API}/get-account-balance`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const currencyFormatter= (data)=>{
    return (data.amount).toLocaleString(data.currency,{
        style: 'currency',
        currency: data.currency
    })
}


export const payoutSetting= async (token)=>{
    return await axios.post(`${process.env.REACT_APP_API}/payout-setting`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
// all we need to do is to make a post request to this end point with this token, then verify the token if the
// token is valid we can extract the user id and based on the id we can find that user. when we make request to the stripe,
// we can send that id to the user database and then we update the user status 