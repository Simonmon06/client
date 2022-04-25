import {Link} from 'react-router-dom'
// Show a navbar in dashboard it will show 2 components
// 1. Will show all your orders and a button to browse items
// 2.  Show all the modless you have posted and a button to add new

const DashboardNav = () => {
    const active = window.location.pathname // get current pathname
    return (
        <ul className="nav nav-pills nav-fill">
            <li className='nav-item'>
                <Link 
                    className={`nav-link ${active === '/dashboard' && 'active'}`} 
                    to='/dashboard'> 
                    Your orders
                </Link>
            </li>
            <li className='nav-item'>
            <Link 
                    className={`nav-link ${active === '/dashboard/post' && 'active'}`} 
                    to='/dashboard/post'>
                    Your Posts
                </Link>
            </li>
            <li className='nav-item'>
            <Link 
                    className={`nav-link ${active === '/dashboard/seller' && 'active'}`} 
                    to='/dashboard/seller'>
                    Your models in the market
                </Link>
            </li>
        </ul>

    )
}

export default DashboardNav