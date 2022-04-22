
import {useState} from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import ItemCreateForm from '../components/forms/ItemCreateForm'
import { createItem } from '../actions/item'
// import AlgoliaPlaces from 'algolia-places-react'
//  try to use react-google-places-autocomplete if still have time
const NewItem = () => {
    const {auth} = useSelector(state => ({...state}))
    const {token} = auth
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')
    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        image: '',
        size: '',
        price: '',
        purchaseDate: '',
        condition: '',
    })
    const {title, content, location, image,size, price, purchaseDate, condition} = values
    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(values)
        let itemData = new FormData()
        itemData.append('title', title)
        itemData.append('content', content)
        itemData.append('location', location)
        itemData.append('size', size)
        itemData.append('price', price)
        itemData.append('purchaseDate', purchaseDate)
        itemData.append('condition', condition)

        image && itemData.append('image', image)


        try{
            let res = await createItem(token, itemData)
            console.log('Item Edit Res', res)
            toast.success(`${res.data.title} New Item uploaded`)

        }catch(err){
            console.log(err)
            toast.error(err.response.data)
        }
    }
    const handleImageChange = (event) =>{
        
        // console.log(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
        setValues({...values, image: event.target.files[0]})
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value })

    }
    return (
        <>
            <div className="container-fluid jumbotron">
            <h1 style={{color: 'white'}}> Add Item</h1>
            </div>

            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-10'>
                        <br/>
                        <ItemCreateForm 
                            values= {values}
                            setValues={setValues}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    <div className='col-md-2'>
                        <img src={preview} alt='preview_image' className='img img-fluid m-2'></img>
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </div>
                </div>
            </div>

        </>

    )
}

export default NewItem;