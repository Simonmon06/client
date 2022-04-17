
import {DatePicker} from 'antd'
import moment from 'moment'
// import AlgoliaPlaces from 'algolia-places-react'
//  try to use react-google-places-autocomplete if still have time
const ItemCreateForm = (props) => {
    const {values, setValues, handleChange, handleImageChange, handleSubmit} = props
    const {title, content, price, condition, location} = values;
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
                <input 
                    type='text' 
                    name= 'condition' 
                    onChange={handleChange} 
                    placeholder='Condition (Opened or New)' 
                    className='form-control m-2' 
                    value={condition}
                />
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
            <DatePicker 
                placeholder='From date' 
                className='form-control m-2'
                onChange={(date, dateString) => setValues({...values, from: dateString })}
                disabledDate={current => {return current && current.valueOf() < moment().subtract(1, 'days')}}
            />
            <DatePicker 
                placeholder='To date' 
                className='form-control m-2'
                onChange={(date, dateString) => setValues({...values, to: dateString })}
                disabledDate={current => {return current && current.valueOf() < moment().subtract(1, 'days')}}
            />
            <button className='btn btn-outline-primary m-2'>Save</button>
        </form>

    )
}

export default ItemCreateForm;