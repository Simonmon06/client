import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { readItem, updateItem } from '../actions/item'
import ItemEditForm from '../components/forms/ItemEditForm'


const EditItem = ({match}) =>{
    const {auth} = useSelector(state => ({...state}))
    const {token} = auth
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('https://via.placeholder.com/800x500.png?text=NO+PICTURE')

    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        size: '',
        price: '',
        purchaseDate: '',
        condition: '',
    })
    const {title, content, location, price, condition, size, purchaseDate} = values
    const loadSellerItem = async() =>{
        let res = await readItem(match.params.itemId)
        // console.log(res)
        setValues({...values, ...res.data})
        setPreview(`${process.env.REACT_APP_API}/item/image/${res.data._id}`)
    }
    useEffect(() => {
        console.log('useEffect is called')
        loadSellerItem()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        let itemData = new FormData()
        itemData.append('title', title)
        itemData.append('size', size)
        itemData.append('content', content)
        itemData.append('location', location)
        itemData.append('title', title)
        itemData.append('price', price)
        itemData.append('purchaseDate', purchaseDate)
        itemData.append('condition', condition)
        image && itemData.append('image', image)

        try{
            // whats different from the createForm we need to send the itemId from the url as well
            let res = await updateItem(token, itemData, match.params.itemId)
            console.log('Item create Res', res)
            toast.success(`${res.data.title} is updated`)
        }catch(err){
            console.log(err)
            toast.error(err.response.data)
        }
    }
    const handleImageChange = (event) =>{
        
        // console.log(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value })

    }
    return(
        <>
            <div className="container-fluid jumbotron">
                <h1 style={{color: 'white'}}> Edit Item</h1>
            </div>
            
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-10'>
                        <br/>
                        <ItemEditForm 
                            values= {values}
                            setValues={setValues}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    <div className='col-md-2'>
                        <img src={preview} alt='preview_image' className='img img-fluid m-2'></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItem