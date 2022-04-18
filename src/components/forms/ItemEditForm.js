import {DatePicker, Select} from 'antd'
import moment from 'moment'
const {Option} = Select;
const ItemEditForm = (props) => {
    const {values, setValues, handleChange, handleImageChange, handleSubmit} = props
    const {title, content, price, location, purchaseDate, condition} = values;
    console.log(condition)
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>
                    Image
                    <input 
                        type='file' 
                        name='image' 
                        onChange={handleImageChange} 
                        accept='image/*' 
                        hidden
                    />
                </label>

                <input 
                    type='text' 
                    name= 'title' 
                    onChange={handleChange} 
                    placeholder='Title' 
                    className='form-control m-2' 
                    value={title}
                />

                <textarea 
                    name= 'content' 
                    onChange={handleChange} 
                    placeholder='Content' 
                    className='form-control m-2' 
                    value={content}
                />
                <Select onChange={value => setValues({...values, condition: value})} 
                        className='w-100 m-2' 
                        size='large'
                        value={condition}
                        placeholder='Opened/Not Opened'
                        >
                    <Option value="Opened">Opened</Option>
                    <Option value="Not Opened">Not Opened</Option>
                </Select>

                <input 
                    type='number' 
                    name= 'price' 
                    onChange={handleChange} 
                    placeholder='Price' 
                    className='form-control m-2' 
                    value={price}
                />

                <input 
                    type='text' 
                    name= 'location' 
                    onChange={handleChange} 
                    placeholder='Location (Your address)' 
                    className='form-control m-2' 
                    value={location}
                />
            </div>
            {purchaseDate && (
                <DatePicker 
                    defaultValue={moment(purchaseDate, "YYYY-MM-DD")}
                    placeholder='Purchase Date' 
                    className='form-control m-2'
                    onChange={(date, dateString) => setValues({...values, purchaseDate: dateString })}
                    disabledDate={(current) => current && current.valueOf() > moment().subtract(0, "days")}
                />
                )
            }


            <button className='btn btn-outline-primary m-2'>Save</button>
        </form>

    )
}

export default ItemEditForm;