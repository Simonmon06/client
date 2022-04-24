import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { getOnePost, updateUnlike, updateLike, updateComment, updateUnComment } from '../actions/post'
const ViewPost = ({match, history}) =>{
    const {auth} = useSelector(state =>({...state}))
    const [post, setPost] = useState([])
    const [image, setImage] = useState('')
    const [comment, setComment] = useState('')
    const [hasLiked, setHasLiked] = useState(false)
    const [numOfLikes, setNumOfLikes] = useState(0)


    useEffect(() => {
        loadOnePost();
    }, [])

    const loadOnePost = async() =>{
        
        let res = await getOnePost(auth.token,match.params.postId)
        // console.log('res',res)
        setPost(res.data)
        // console.log('res.data',res.data)
        // console.log('res.data.thumbs.length',res.data.thumbs.length)
        setNumOfLikes(res.data.thumbs.length)
        setHasLiked(liked(res.data.thumbs))
        setImage(`${process.env.REACT_APP_API}/post/image/${res.data._id}`)

    }

    const liked = (likeArray) => {
        return likeArray.indexOf(auth.user._id) !== -1    
    }
    const handleLike = async () => {
        let likeRequest = hasLiked ? updateUnlike : updateLike
        console.log('hasLiked',hasLiked)
        try{
            
            let res = await likeRequest(auth.token, post._id)

            console.log('Like res', res)
            setComment('')
            loadOnePost()
        }catch(err){
            console.log(err.response.data)
            toast.error(err)
        }
    }
    const handleCommentChange = (e) =>{
        setComment(e.target.value)
    }
    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if(comment.length >0){
            const newComment = {text: comment}
            try {
                let res = await updateComment(auth.token, post._id, newComment)
                console.log('comment res', res)
                
                loadOnePost()
            } catch (err) {
                console.log(err.response.data)
                toast.error(err)
            }
        }else{
            toast.error('Comment is empty')
        }


    } 
    return (
        <>
        <div className="container-fluid jumbotron">
            <h1 style={{color: 'white'}}>{post.title}</h1>
        </div>
        <div className="container-fluid ">
            <div className='row no-gutters'>
                <div className='col-md-6'>
                    <br/>
                    <img src={image} alt={post.title} className='img img-fluid m-2'/>
                </div>
                <div className='col-md-6'>
                    
                    <div className='card-body'>
                    <p className='alert alert-info'>{post.content}</p>
                    <i>Posted by {post.postedBy && post.postedBy.name}</i>
                    <h5>{ numOfLikes > 1 ? `${numOfLikes} likes`:  `${numOfLikes} like`}</h5>

                    {
                        hasLiked? 
                        <i onClick={handleLike} className="bi bi-hand-thumbs-up-fill h3"/> : 
                        <i onClick={handleLike} className="bi bi-hand-thumbs-up h3"/>
                    }
                    <div>
                        {
                            post && post.comments && post.comments.map(comment => (
                                <p key={comment._id} className='alert alert-primary'>{`${comment.postedBy.name}: ${comment.text}`}</p>
                            ))
                        }
                        <form onSubmit={handleCommentSubmit}>
                        <div className='form-group'>
                            <input className='form-control mt-2' 
                                   name='comment'type='text' 
                                   onChange={handleCommentChange}
                                   value={comment}
                                   placeholder='Leave a comment here ' 
                            />
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default ViewPost