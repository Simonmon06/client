import {toast} from 'react-toastify'
import { login } from '../actions/auth'
import {useState} from 'react'
import LoginForm from '../components/LoginForm'
import {useDispatch} from 'react-redux'

const Login = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('sending data', {email, password})
        try{
            let res = await login({email, password})
            console.log("LOGIN RESPONSE", res)

            if(res.data){
                console.log('Save user res in redux and local storage then redirect --->')
                console.log(res.data)
                // save user and token to local stoage
                window.localStorage.setItem('auth', JSON.stringify(res.data))

                // save user and token to redux
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data,
                })
                // after user logged in take user to the homepage
                history.push("/dashboard")
            }


        } catch (err){
            console.log(err)
            if(err.response.status === 400){
                toast.error(err.response.data)
            }
        }
        
    }
    return (
        <div>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Login Page</h1>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <LoginForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;