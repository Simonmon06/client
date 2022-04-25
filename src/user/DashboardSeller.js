import {useState, useEffect} from 'react'
import DashboardNav from "../components/navbars/DashboardNav"
import ConnectNav from "../components/navbars/ConnectNav"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {HomeOutlined} from '@ant-design/icons'
import { openCreateStripeLink } from "../actions/stripe"
import { sellerItems, deleteItem } from '../actions/item'
import {toast} from 'react-toastify'
import ItemCard from "../components/cards/ItemCard";

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
            let res = await openCreateStripeLink(auth.token)
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
                            <h2>Your models</h2>
                        </div>
                        <div className='col-md-2'>
                            <Link to='/items/new' className='btn btn-primary'>+ Add New</Link>
                        </div>
                    </div>
                    <div className='row row-cols-1 row-cols-md-3'>
                    {/* <div className='row'> */}
                    {items.map(item => <ItemCard 
                            key={item._id} 
                            item={item} 
                            showViewMoreButton={false} 
                            handleItemDelete={handleItemDelete}
                            owner={true}/>)}
                    {/* </div> */}
                    </div>
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
                        <h4>Setup your Strip account and credit card info</h4>
                        <button disabled={loading} onClick={handleClick} className='btn btn-primary mb-3'>
                            { loading ? 'Processing...' : 'Setup Payouts'}
                        </button>
                    </div>  
                </div>
            </div>
        </div>
        )
    }
    return (
        <>
            <div className= "container-fluid jumbotron">
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