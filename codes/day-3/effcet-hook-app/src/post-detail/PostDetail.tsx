import { memo, useEffect, useState } from 'react'
import { Post } from '../models/post';

type PostDetailPropType = { selectedPostId: number }

const PostDetail = (props: Readonly<PostDetailPropType>) => {
    const { selectedPostId } = props
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
        [selectedPostId]
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
            <div>
                Id: &nbsp;<span>{post.id}</span>
                <br />
                UserId: &nbsp;<span>{post.userId}</span>
                <br />
                Title: &nbsp;<span>{post.title}</span>
                <br />
                Body: &nbsp;<span>{post.body}</span>
            </div>
        )
}

export default memo(PostDetail)
//export default PostDetail
