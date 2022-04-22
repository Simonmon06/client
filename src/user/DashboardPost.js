import DashboardNav from "../components/DashboardNav"
import ConnectNav from "../components/ConnectNav"
import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import { getUserPosts,deletePost } from "../actions/post"
import { useSelector } from "react-redux"
import PostCard from "../components/cards/PostCard"
import {toast} from 'react-toastify'
const DashboardPost = () => {
    const {auth}  = useSelector(state => ({...state}))
    const [posts, setPosts] = useState([])
    const {auth: {token}} = useSelector(state =>({...state}))
    useEffect(() => {
        loadUserPosts();
    }, [])
    const loadUserPosts = async ()=>{
        const res = await getUserPosts(token)
        console.log('response is', res)
        setPosts(res.data)
    }

    const handlePostDelete = async (postId) => {
        if(!window.confirm("Do you want to delete?")) return;
        console.log('postId: ', postId)

        // auth.token from useSelector and the itemId will be given in the child component
        console.log('auth.token in delete', auth.token)
        deletePost(auth.token,postId).then(res=>{
            toast.success('Post is deleted')
            loadUserPosts()//load page again
        })
    }

    
    return (
        <>
            <div className= "container-fluid bg-secondary p-5">
                <ConnectNav/>
            </div>
            <div className='container-fluid p-4'>
                <DashboardNav/>
            </div>
            <div className= "container-fluid">
                <div className="row">
                    <div className='col-md-10'>
                        <h2>Your Posts</h2>

                    </div>
                    <div className='col-md-2'>
                        <Link to='/posts/new' className='btn btn-primary'>Add Now</Link>
                    </div>
                </div>
            </div>
            {posts.map(post => <PostCard 
                            key={post._id} 
                            post={post} 
                            showViewMoreButton={false} 
                            handlePostDelete={handlePostDelete}
                            owner={true}/>)}
        </>
    )
}
export default DashboardPost