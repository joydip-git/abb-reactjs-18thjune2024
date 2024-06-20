//import { memo } from "react";
import { useEffect, useState } from 'react'
import { Post } from '../models/post';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
//import { Link } from "react-router-dom";


const PostDetail = () => {

    //const { id, x } = useParams() //{id:"1", "x":100}
    let [searchParams, setSearchParams] = useSearchParams()
    const selectedPostId = Number(searchParams.get('pid'))
    // const selectedPostId = Number(id)
    // console.log(x);
    const navigate = useNavigate()

    // let [searchParams, setSearchParams] = useSearchParams()
    //console.log(searchParams.get('pid'));

    const [post, setPost] = useState<Post | undefined>(undefined)
    const [fetchStatus, setFetchStatus] = useState(false)
    const [errorInfo, setErrorInfo] = useState('')

    const fetchPost = async () => {
        try {
            const resp = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${selectedPostId}`
            )
            const data = await resp.json()
            setPost(data as Post)
            setFetchStatus(true)
            setErrorInfo('')
        } catch (error: any) {
            setPost(undefined)
            setFetchStatus(true)
            setErrorInfo(error.message)
        }
    }

    useEffect(
        () => {
            console.log('PD data fetching');
            fetchPost()
            return () => {
                console.log('PD clean up');
            }
        },
        []
    )

    console.log('PD rendering...');
    if (!fetchStatus)
        return <span>Loading...</span>
    else if (errorInfo !== '')
        return <span>{errorInfo}</span>
    else if (!post)
        return <span>no record</span>
    else
        return (
            <>
                <div>
                    Id: &nbsp;<span>{post.id}</span>
                    <br />
                    UserId: &nbsp;<span>{post.userId}</span>
                    <br />
                    Title: &nbsp;<span>{post.title}</span>
                    <br />
                    Body: &nbsp;<span>{post.body}</span>
                </div>
                <br />
                {/* <Link to={'/posts'}> */}
                <button type="button" onClick={
                    () => navigate('/posts')
                }>
                    Posts
                </button>
                {/* </Link> */}
            </>
        )
}

//export default memo(PostDetail)
export default PostDetail
