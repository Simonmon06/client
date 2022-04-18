import DashboardNav from "../components/DashboardNav"
import ConnectNav from "../components/ConnectNav"
import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import { getUserOrders } from "../actions/item"
import { useSelector } from "react-redux"
import OrderCard from "../components/cards/OrderCard"
const Dashboard = () => {
    const [order, setOrder] = useState([])
    const {auth: {token}} = useSelector(state =>({...state}))
    useEffect(() => {
        loadUserOrders();
    }, [])
    const loadUserOrders = async ()=>{
        const res = await getUserOrders(token)
        console.log('response is', res)
        setOrder(res.data)
    }
    return (
        <>
            <div className= "container-fluid bg-secondary p-5">
                <ConnectNav/>
            </div>
            <div className='container-fluid p-4'>
                <DashboardNav/>
            </div>
            <div className= "container-fluid">
                <div className="row">
                    <div className='col-md-10'>
                        <h2>Your Orders</h2>

                    </div>
                    <div className='col-md-2'>
                        <Link to='/' className='btn btn-primary'>Shopping Now</Link>
                    </div>
                </div>
            </div>
                    {order.map((currentOrder) => (
                    <OrderCard
                        key={currentOrder._id}
                        item={currentOrder.item}
                        session={currentOrder.session}
                        orderedBy={currentOrder.orderedBy}
                    />
                    ))}
        </>
    )
}
export default Dashboard