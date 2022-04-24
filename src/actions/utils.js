export const currencyFormatter= (data)=>{
    return (data.amount).toLocaleString(data.currency,{
        style: 'currency',
        currency: data.currency
    })
}

export const currencyFormatterUserInfo= (data)=>{
    return (data.amount/100).toLocaleString(data.currency,{
        style: 'currency',
        currency: data.currency
    })
}