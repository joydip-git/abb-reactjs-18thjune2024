import { useEffect, useState } from 'react'
import { Post } from '../models/post';
import PostDetail from '../post-detail/PostDetail';

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [errorInfo, setErrorInfo] = useState('')
    const [fetchStatus, setFetchStatus] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [count, setCount] = useState(0)


    const fetchPosts = async () => {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await resp.json()
            setPosts((data as Post[]).slice(0, 3))
            setFetchStatus(true)
            setErrorInfo('')
        } catch (error: any) {
            setPosts([])
            setFetchStatus(true)
            setErrorInfo(error.message)
        }
    }

    useEffect(
        () => {
            console.log('PL data fetching');
            fetchPosts()
            return () => {
                console.log('PL clean up');
            }
        },
        []
    )


    console.log('PL rendered');

    let design: any;
    if (!fetchStatus)
        design = <span>Loading...</span>
    else if (errorInfo !== '')
        design = <span>{errorInfo}</span>
    else if (posts && posts.length === 0)
        design = <span> No records</span>
    else
        design = (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(
                                (p) => <tr key={p.id}>
                                    <td
                                        onClick={
                                            () => setSelectedId(p.id)
                                        }>
                                        <strong> <u>{p.id}</u></strong>
                                    </td>
                                    <td>{p.title}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <br />
                {
                    selectedId > 0 && <PostDetail selectedPostId={selectedId} />
                }
            </>
        )

    return (
        <>
            <div>
                <span> Count &nbsp;{count}</span>
                <br />
                <button type="button" onClick={
                    () => setCount(
                        (oldCount) => oldCount + 1
                    )
                }>Increase</button>
            </div>
            <br />
            {
                design
            }
        </>
    )
}

export default PostList