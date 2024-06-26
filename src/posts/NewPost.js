import {useState} from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import PostCreateForm from '../components/forms/PostCreateForm'
import { createPost } from '../actions/post'
const NewPost = () =>{
    const {auth} = useSelector(state => ({...state}))
    const {token} = auth
    const [preview, setPreview] = useState('https://via.placeholder.com/300.JPEG?text=No_Image')
    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
    })
    const {title, content, image} = values

    const handleImageChange = (event) =>{
        
        // console.log(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
        setValues({...values, image: event.target.files[0]})
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(values)
        let postData = new FormData()
        postData.append('title', title)
        postData.append('content', content)
        image && postData.append('image', image)

        console.log('PostData ==>', postData)
        try{
            let res = await createPost(token, postData)
            console.log('Create pos Res', res)
            toast.success(`Your new post ${res.data.title}  uploaded`)

        }catch(err){
            console.log(err)
            toast.error(err.response.data)
        }
    }
    return (
        <>
        <div className="container-fluid jumbotron">
        <h1 style={{color: 'white'}}> Add Post</h1>
        </div>

        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-10'>
                    <br/>
                    <PostCreateForm 
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
export default NewPost