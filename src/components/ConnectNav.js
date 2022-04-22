// Create another nav for stripe connted merchants
// This is where you will show their balance 
// And access to stripe dashboard

import {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import {Card, Avatar, Badge} from 'antd'
import moment from 'moment'
import {getAccountBalance, payoutSetting} from '../actions/stripe'
import { currencyFormatter } from '../actions/utils';
import {SettingOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify'

const {Meta} = Card
const {Ribbon} = Badge
const ConnectNav = () => {
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState(0)
    const {auth} = useSelector(state => ({...state}))
    const {user, token} = auth
    useEffect(()=>{
        getAccountBalance(auth.token).then(res => {
            console.log(res)
            setBalance(res.data)
        })
    }, [])
    const handlePayoutSettings = async () => {
        setLoading(true)
        try {
            const res = await payoutSetting(token)
            console.log('Res for payout setting link', res)
            // tried a lot of time in server side, but redirect to a url does not work in stripe. so open a new window here.
            // no need to redirect anymore
            // window.location.href = res.data.url
            window.open(res.data.url)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error('Unable to access settings. Please try again.')
        }

    }
    const hasStripeAccount = auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled
    const showBalance = balance && balance.pending 
    return (
        <div className="d-flex justify-content-center">
            <div className="card text-center" style={{width: '18rem'}}>
                <div className='card-body'>
                    <h5 className='card-title'>{user.name} </h5>
                    <p class="card-text">{`Account is created ${moment(user.createdAt).fromNow()}`}</p>
                </div>

                {
                    hasStripeAccount && 
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            {showBalance && balance.pending.map((balance, index)=>(
                                        <span key={index} className="lead">
                                            {currencyFormatter(balance)} avaliable
                                        </span>
                            ))}
                        </li>
                    </ul>
                }
                {
                    hasStripeAccount &&
                    <div className='card-body'>
                        <i className="bi bi-gear-wide-connected h1 pointer" onClick={handlePayoutSettings}></i>
                    </div>
                }
            </div>
        </div>
        // <div className="d-flex justify-content-around">
        //     <Card>
        //         <Meta 
        //             avatar={<Avatar>{user.name[0]}</Avatar>} 
        //             title={user.name} 
        //             description={`Joined ${moment(user.createdAt).fromNow()}`} />
        //     </Card>
        //     {
        //         auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
        //         <>
        //             <Ribbon text='Avaliable' color='grey'>
        //                 <Card className='bg-light pt-1'>
        //                     {balance && balance.pending && balance.pending.map((balance, index)=>(
        //                         <span key={index} className="lead">
        //                             {currencyFormatter(balance)}
        //                         </span>
        //                     ))}
        //                 </Card>
        //             </Ribbon>
        //             <Ribbon text='Payouts' color='silver'>
        //                 <Card className='bg-light pointer' onClick={handlePayoutSettings}>
        //                     <SettingOutlined className='h5 pt-2'/>
        //                 </Card>
        //             </Ribbon>
        //         </>
        //     }
        // </div>

    )
}
export default ConnectNav