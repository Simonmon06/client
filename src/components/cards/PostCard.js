import { useSelector } from 'react-redux'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { useState } from 'react'
import {toast} from 'react-toastify'
import {updateLike, updateUnlike} from '../../actions/post'
import { useHistory } from 'react-router-dom'
const PostCard = ({post, handlePostDelete= f => f, owner= false, showViewMoreButton= true}) => {
    const history = useHistory()
    const { auth } = useSelector((state) => ({ ...state }));
    const hasImage = post.image && post.image.contentType
    const numOfLikes = post.thumbs.length
    return (
        <>
            <div className='card mb-3 '>
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
                        <div className='card-body'>
                            <p className='alert alert-info'>{post.content}</p>
                            <i>Posted by {post.postedBy && post.postedBy.name}</i>
                            <h5>{
                                
                                numOfLikes > 1 ? `${numOfLikes} likes`:  `${numOfLikes} like`
    
                            }</h5>
                                                    {
                            post && post.comments && post.comments.map(comment => (
                                <p key={comment._id} className='alert alert-primary'>{`${comment.postedBy.name}: ${comment.text}`}</p>
                            ))
                        }
                            <div className='d-flex justify-content-between h4'>

                                { showViewMoreButton && (
                                    <button 
                                        onClick={() => history.push(`/post/${post._id}`)} 
                                        className="btn btn-primary">
                                        Show more...
                                    </button>
                                )
                                }
                                {
                                    owner && (
                                        <DeleteOutlined 
                                            onClick={()=> handlePostDelete(post._id)}
                                            className='text-danger'
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
