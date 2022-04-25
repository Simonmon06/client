export const currencyFormatter= (data)=>{
    return (data.amount).toLocaleString(data.currency,{
        currency: data.currency,
        style: 'currency'
    })
}

export const currencyFormatterUserInfo= (data)=>{
    return (data.amount/100).toLocaleString(data.currency,{
        currency: data.currency,
        style: 'currency'
    })
}