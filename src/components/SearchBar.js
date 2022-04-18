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
        purchaseDate: '',
        condition: '',
    })
    const {title, purchaseDate, condition} = values
    const handleSubmit = () =>{
        history.push(`/search-result?title=${title}&condition=${condition}`)
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
                    className='form-control' 
                    value={title}
                    style={{hight: '50px'}}
                />

            <Select onChange={value => setValues({...values, condition: value})} 
                        className='w-100' 
                        size='large'
                        placeholder='Opened/Not Opened'
                        style={{height: '50px'}}
                        >
                    <Option value="Opened">Opened</Option>
                    <Option value="Not Opened">Not Opened</Option>
            </Select>

            <SearchOutlined onClick={handleSubmit} className='btn btn-primary p-3 btn-square'/>
            </div>

        </div>
    )
}
export default SearchBar