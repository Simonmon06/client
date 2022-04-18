import React, {useState} from 'react'
import {DatePicker, Select} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const {Option} = Select
const SearchBar = () =>{
    const history = useHistory()
    const [values, setValues] = useState({
        title: '',
        date: '',
        condition: '',
    })
    const {title,date, condition} = values
    const handleSubmit = () =>{
        history.push(`/search-result?title=${title}&condition=${condition}&date=${date}`)
    }

    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value })

    }
    return (
        <div className='d-flex pb-4'>
            <div className='w-100'>
                <input 
                    type='text' 
                    name= 'title' 
                    onChange={handleChange} 
                    placeholder='Title' 
                    className='form-control m-2' 
                    value={title}
                    style={{hight: '50px'}}
                />
            </div>
        </div>
    )
}
export default SearchBar