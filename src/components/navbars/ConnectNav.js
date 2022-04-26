// show user and stripe info in user dashboard
import {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import moment from 'moment'
import {getAccountBalance} from '../../actions/stripe'
import { currencyFormatterUserInfo } from '../../actions/utils';

const ConnectNav = () => {
    const [balance, setBalance] = useState(0)
    const {auth} = useSelector(state => ({...state}))
    const {user, token} = auth
    useEffect(()=>{
        getAccountBalance(auth.token).then(res => {
            console.log(res)
            setBalance(res.data)
        })
    }, [])
    
    const hasStripeAccount = auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled
    const showBalance = balance && balance.pending 
    return (
        <div className="d-flex justify-content-center">
            <div className="card text-center" style={{width: '18rem'}}>
                <div className='card-body'>
                    <h5 className='card-title'>{user.name} </h5>
                    <p className="card-text">{`Account is created ${moment(user.createdAt).fromNow()}`}</p>
                </div>

                {
                    hasStripeAccount && 
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {showBalance && balance.pending.map((balance, index)=>(
                                        <span key={index} className="lead">
                                            {currencyFormatterUserInfo(balance)} earned
                                        </span>
                            ))}
                        </li>
                    </ul>
                }
            </div>
        </div>


    )
}
export default ConnectNav