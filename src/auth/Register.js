import {useState} from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import axios from 'axios'
import {toast} from 'react-toastify'
import { register } from '../actions/auth'
const Register = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit= async (e) => {
        e.preventDefault()
        try{
            const res= await register({ name, email, password})
            console.log('Rigister user', res)
            toast.success("Rigister success. Please login.")
            history.push('/login')
        }catch(err){
            console.log(err)
            err.response.status === 400 && toast.error(err.response.data)
        }

    }
    return (
        <div>
            <div className='container-fluid jumbotron'>
                <h1 style={{color: 'white'}}>Register</h1>
            </div>
            
            <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <RegisterForm 
                                handleSubmit={handleSubmit} 
                                name={name} 
                                setName={setName}
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

export default Register;