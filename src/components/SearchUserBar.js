import React, {useState} from 'react'
import {SearchOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const SeachUserBar = () =>{
    const history = useHistory()
    const [name, setName] = useState('')
    const handleSubmit = () =>{
        history.push(`/search-user-result?name=${name}`)
    }

    const handleChange = (event) => {
       setName(event.target.value)
    }
    return (
        <div className='d-flex pb-4'>    
            
            <input 
                type='text' 
                name= 'name' 
                onChange={handleChange} 
                placeholder='User Name' 
                className='form-control' 
                value={name}
                style={{height: '50px'}}
            />

            <SearchOutlined onClick={handleSubmit} className='btn btn-primary p-3 btn-square'/>
        </div>
    )
}
export default SeachUserBar