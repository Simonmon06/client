import {getAllPosts} from '../actions/post'
import {useState, useEffect} from 'react'
import PostCard from '../components/cards/PostCard'
const PostHome = () => {
    const [posts, setPosts] = useState([])
    const loadAllPosts = async() =>{
        let res = await getAllPosts()
        setPosts(res.data)
    }
    
    useEffect(()=>{
        loadAllPosts();
    },[])

    return (
        <>
            <div className="container-fluid jumbotron">
                <h1 style={{color: 'white'}}>All Posts</h1>
            </div>
            <div className="container-fluid">
                <br/>
                {
                    posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                }

            </div>

        </>

    )
}

export default PostHome;