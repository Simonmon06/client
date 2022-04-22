import { useSelector } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({...props}) =>{
    const {auth} = useSelector((state) => ({...state}))
    console.log('auth', auth)
    return auth && auth.token ? <Route {...props}/> : <Redirect to='/login'/>
}
export default PrivateRoute