
import {DatePicker, Select} from 'antd'
import moment from 'moment'
//  try to use react-google-places-autocomplete if still have time
const {Option} = Select;
const ItemCreateForm = (props) => {
    const {values, setValues, handleChange, handleImageChange, handleSubmit} = props
    const {title, content, price, location} = values;
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
                {/* <input 
                    type='text' 
                    name= 'condition' 
                    onChange={handleChange} 
                    placeholder='Condition (Opened or New)' 
                    className='form-control m-2' 
                    value={condition}
                /> */}
                <Select onChange={value => setValues({...values, condition: value})} 
                        className='w-100 m-2' 
                        size='large'
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
                <Select onChange={value => setValues({...values, size: value})} 
                        className='w-100 m-2' 
                        size='large'
                        placeholder='Size'
                        >
                    <Option key={1} value="Perfect Grade 1/60">Perfect Grade 1/60</Option>
                    <Option key={2} value="Master Grade 1/100">Master Grade 1/100</Option>
                    <Option key={3} value="Real Grade 1/144">Real Grade 1/144</Option>
                    <Option key={4} value="High Grade 1/144">High Grade 1/144</Option>
                    <Option key={5} value="BB/SD">BB/SD</Option>
                </Select>
                <input 
                    type='text' 
                    name= 'location' 
                    onChange={handleChange} 
                    placeholder='Location (Your address)' 
                    className='form-control m-2' 
                    value={location}
                />
            </div>
            <DatePicker 
                placeholder='Purchase Date' 
                className='form-control m-2'
                onChange={(date, dateString) => setValues({...values, purchaseDate: dateString })}
                disabledDate={(current) => current && current.valueOf() > moment().subtract(0, "days")}
            />
            <button className='btn btn-outline-primary m-2'>Save</button>
        </form>

    )
}

export default ItemCreateForm;