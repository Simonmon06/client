import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';


const TopNavBar = () =>{
  // cant use history here cuz in app.js login is a route but not topnav
  const {auth} = useSelector((state) => ({...state}))
  const dispatch = useDispatch()
  const history = useHistory()
  
  const logout = () =>{
    dispatch({
      type:  "LOGOUT",
      payload: null,
    })
    window.localStorage.removeItem('auth')
    history.push('/login')
  }
  return (
      <div className= "nav navbar-dark d-flex navbar-expand-sm  bg-dark fixed-top">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav"> 

                {auth !== null ? (
                  <>
                    <li className="nav-item active">
                      <Link className='nav-link' to='/' >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/posts' >
                        Posts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/dashboard' >
                        DashBoard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link' to='/searchUser' >
                        Search
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className='nav-link pointer' onClick={logout} >
                        Logout
                      </Link>
                    </li>
                  </>
                ): 
                (
                  <>
                    <li className="nav-item active">
                      <Link className='nav-link' to='/' >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item float-right">
                        <Link className='nav-link' to='/login' >
                        Login
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className='nav-link float-right' to='/register' >
                        Register
                        </Link>
                    </li>
                  </>
                )}
            
          </ul>
      </div>
    </div>
         
  )
}

export default TopNavBar;