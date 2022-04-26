import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
const PostCard = ({post, handlePostDelete= f => f, owner= false, showViewMoreButton= true}) => {
    const history = useHistory()
    const { auth } = useSelector((state) => ({ ...state }));
    const hasImage = post.image && post.image.contentType
    const numOfLikes = post.thumbs.length
    return (
        <>
            <div className='card mb-3 text-white bg-dark '>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        { hasImage ? (
                            <img 
                                className = 'card-image img img-fluid'
                                src={`${process.env.REACT_APP_API}/post/image/${post._id}`}
                                alt='post image'
                            />
                        ) : (
                            <img 
                                className = 'card-image img img-fluid'
                                src='https://via.placeholder.com/800x500.png?text=NO+PICTURE' 
                                alt='default post image'
                            />
                        )}
                    </div>

                    <div className='col-md-8'>
                        <div className='card-body '>
                            <h3 className="card-title text-white">{post.title}</h3>
                            <p className='alert alert-dark '>{post.content}</p>
                            <i>Posted by {post.postedBy && post.postedBy.name}</i>
                            <div className='card-text h3'>{
                                
                                numOfLikes > 1 ? `${numOfLikes} likes`:  `${numOfLikes} like`
    
                            }</div>
                                                    {
                            post && post.comments && post.comments.map(comment => (
                                <p key={comment._id} className='alert alert-dark'>{`${comment.postedBy.name}: ${comment.text}`}</p>
                            ))
                        }
                            <div className='d-flex justify-content-between h4'>

                                { showViewMoreButton && (
                                    <button 
                                        onClick={() => history.push(`/post/${post._id}`)} 
                                        className="btn btn-secondary float-right">
                                        Details
                                    </button>
                                )
                                }
                                {
                                    owner && (
                                        <a 
                                            onClick={()=> handlePostDelete(post._id)}
                                            className='bi bi-trash-fill h3'
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard
