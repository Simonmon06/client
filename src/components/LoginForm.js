const LoginForm = ({handleSubmit, email, setEmail, password, setPassword}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
                <label className='form-label'>Email address</label>
                <input 
                    type='email' className='form-control' placeholder='Enter email' value={email} 
                    onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className='form-group mb-3'>
                <label className='form-label'>Password</label>
                <input 
                    type='password' className='form-control' placeholder='Enter password' value={password} 
                    onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <button className='btn btn-primary' disabled={!email || !password}>Submit</button>
        </form>
    )
}
export default LoginForm