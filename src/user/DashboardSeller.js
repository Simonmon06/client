import {useState, useEffect} from 'react'
import DashboardNav from "../components/DashboardNav"
import ConnectNav from "../components/ConnectNav"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {HomeOutlined} from '@ant-design/icons'
import { createConnectAccount } from "../actions/stripe"
import { sellerItems, deleteItem } from '../actions/item'
import {toast} from 'react-toastify'
import SmallCard from '../components/cards/SmallCard'


const DashboardSeller = () => {
    const {auth}  = useSelector(state => ({...state}))
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    useEffect(() =>{
        loadSellersItems()
    },[])
    const loadSellersItems = async () =>{
        let res = await sellerItems(auth.token)
        setItems(res.data)
    }
    const handleClick =  async() => {
        setLoading(true)
        try{
            let res = await createConnectAccount(auth.token)
            console.log(res) // get loginin link
            window.location.href = res.data//
        } catch (err){
            console.log(err)
            toast.error("Stripe connect failed, Try again")
            setLoading(false)
        }
    }
    const handleItemDelete = async (itemId) => {
        if(!window.confirm("Do you want to delete?")) return;
        console.log('itemId: ', itemId)

        // auth.token from useSelector and the itemId will be given in the child component
        deleteItem(auth.token,itemId).then(res=>{
            toast.success('Item is deleted')
            loadSellersItems()//load page again
        })
    }
    const connected = () => {
        return (
            <>
                <div className= "container-fluid">
                    <div className="row">
                        <div className='col-md-10'>
                            <h2>You models</h2>
                        </div>
                        <div className='col-md-2'>
                            <Link to='/items/new' className='btn btn-primary'>+ Add New</Link>
                        </div>
                    </div>

                    {/* <div className='row'> */}
                    {items.map(item => <SmallCard 
                            key={item._id} 
                            item={item} 
                            showViewMoreButton={false} 
                            handleItemDelete={handleItemDelete}
                            owner={true}/>)}
                    {/* </div> */}
                </div>
        </>
        )
    }
    const notConnected = () => {
        return (
        <div className= "container-fluid">
            <div className="row">
                <div className='col-md-6 offset-md-3 text-center'>
                    <div className='p-5 pointer'>
                        <HomeOutlined className='h1'/>
                        <h4>Setup payouts to post your items</h4>
                        <p className='lead'>MEAN partners with stripe to transfer earnings to your bank account.</p>
                        <button disabled={loading} onClick={handleClick} className='btn btn-primary mb-3'>
                            { loading ? 'Processing...' : 'Setup Payouts'}
                        </button>
                        <p className='text-muted'>
                            <small>
                                You'll be redirected to Stripe to complete the onboading process
                            </small>
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }
    return (
        <>
            <div className= "container-fluid bg-secondary p-5">
                <ConnectNav/>
            </div>
            <div className='container-fluid p-4'>
                <DashboardNav/>
            </div>

            {
                auth && 
                auth.user && 
                auth.user.stripe_seller && 
                auth.user.stripe_seller.charges_enabled ?
                connected() : notConnected()

             }
        </>
    )
}
export default DashboardSeller