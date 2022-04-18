import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { stripeSuccess } from '../actions/stripe'
import {LoadingOutlined} from '@ant-design/icons'

const StripeSuccess = ({history, match}) =>{
    const {auth: {token}} = useSelector(state =>({...state}))

    useEffect(() => {
        // console.log('Sending itemId to create order : ', match.params.itemId)
        stripeSuccess(token, match.params.itemId)
        .then(res => {
            res.data.success? history.push('/dashboard'):history.push('/stripe/cancel')
        })
    }, [match.params.itemId])
    return (
        <div className='container'>
            <div className='justify-content-center d-flex p-5  '>
                <LoadingOutlined className='display-1 text-danger p-5'/>
            </div>
        </div>
    )
}

export default StripeSuccess