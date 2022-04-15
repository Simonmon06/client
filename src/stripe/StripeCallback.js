import { LoadingOutlined } from "@ant-design/icons"; 
import {useEffect} from 'react'
import { useSelector,useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import {updateUserInLocalStorage} from '../actions/auth'

const StripeCallback = () =>{
    const {auth} = useSelector(state => ({...state}))
    const dispatch = useDispatch();
    const accountStatus = async () =>{
        try {
            console.log('auth.token', auth.token)
            const res= await getAccountStatus(auth.token)
            console.log('User account status on stripe callback', res)
            // update user in local storage
            updateUserInLocalStorage(res.data, ()=>{
                //update user in redux
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                })

                // redirect user to dashboard
                window.location.href = '/dashboard/seller'
            })
        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(() =>{
        if(auth && auth.token){
            accountStatus(auth.token)
        }
    }, [auth])


    return (
        <div className='d-flex justify-content-center p-5'>
            <LoadingOutlined className='display-1 h1 p-5 text-danger'/>
        </div>
    )
}
export default StripeCallback