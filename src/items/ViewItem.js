import React, {useEffect, useState}from 'react'
import { readItem} from '../actions/item'
import { useSelector } from "react-redux";
import moment from 'moment'
import { getSessionId } from '../actions/stripe';
import {loadStripe} from '@stripe/stripe-js'
import { currencyFormatter } from '../actions/utils';

const ViewItem = ({match, history}) =>{
    const [item, setItem] = useState({})
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const { auth } = useSelector((state) => ({ ...state }));
    useEffect(()=>{
        console.log('useEffect is called')
        loadSellerItem()
    }, [])
    const loadSellerItem = async() =>{
        
        let res = await readItem(match.params.itemId)
        // console.log('res',res)
        setItem(res.data)
        setImage(`${process.env.REACT_APP_API}/item/image/${res.data._id}`)
    }


    // console.log('item', item)

    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (!auth) history.push("/login");
        console.log('auth.token', auth.token);
        // console.log('match.params.itemId: ',  match.params.itemId)
        let res = await getSessionId(auth.token, match.params.itemId);
        // console.log("get sessionid resposne", res.data.sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId
        })
        .then(result =>{
            console.log(result)
        })
    };
    return (
        <>
        <div className="container-fluid jumbotron">
            <h1 style={{color: 'white'}}>{item.title}</h1>
        </div>
        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-6'>
                    <br/>
                    <img src={image} alt={item.title} className='img img-fluid m-2'/>
                </div>

                <div className='col-md-6'>
                    <br/>
                    <p className='alert alert-info'>{item.content}</p>
                    {item && item.price && (
                        <p className='alert alert-info mt-3'>

                            {
                                currencyFormatter({amount: item.price,currency: 'cad'})
                            }
                         </p>
                    )}


                    <p className='alert alert-warning'>{item.condition}</p>
                    <p className= 'card-text'>{item.size}</p>
                    <p className= 'card-text'>{item.location}</p>
                    <p>Last Owner Bought It On {moment(new Date(item.purchaseDate)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <i>Posted by {item.postedBy && item.postedBy.name}</i>
                        <br />
                    <button
                        onClick={handleClick}
                        className="btn btn-block btn-lg btn-primary mt-3"
                        disabled = {loading}
                    > {loading ? "Loading..." : auth && auth.token ? "Buy Now" : "Login In First To Buy"}
                    </button>
                </div>
            </div>
        </div>
    </>

    )

}
export default ViewItem
