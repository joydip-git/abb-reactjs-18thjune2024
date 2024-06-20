import { useEffect, useState } from 'react'
import { Post } from '../models/post';
import PostDetail from '../post-detail/PostDetail';

type PostListStateType = { posts: Post[], errorInfo: string, fetchStatus: boolean, selectedId: number, count: number }

const PostList = () => {
    const [postsState, setPostsState] = useState<PostListStateType>({
        posts: [],
        errorInfo: '',
        fetchStatus: false,
        selectedId: 0,
        count: 0
    })

    const fetchPosts = async () => {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await resp.json()
            setPostsState(
                (oldState) => {
                    return {
                        ...oldState,
                        posts: (data as Post[]).slice(0, 3),
                        fetchStatus: true,
                        errorInfo: ''
                    }
                })
        } catch (error: any) {
            setPostsState(
                (oldState) => {
                    return {
                        ...oldState,
                        posts: [],
                        fetchStatus: true,
                        errorInfo: error.message
                    }
                }
            )
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
    if (!postsState.fetchStatus)
        design = <span>Loading...</span>
    else if (postsState.errorInfo !== '')
        design = <span>{postsState.errorInfo}</span>
    else if (postsState.posts && postsState.posts.length === 0)
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
                            postsState.posts.map(
                                (p) => <tr key={p.id}>
                                    <td
                                        onClick={
                                            () => setPostsState(
                                                (oldState) => {
                                                    return {
                                                        ...oldState, selectedId: p.id
                                                    }
                                                }
                                            )
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
                    postsState.selectedId > 0 && <PostDetail selectedPostId={postsState.selectedId} />
                }
            </>
        )

    return (
        <>
            <div>
                <span> Count &nbsp;{postsState.count}</span>
                <br />
                <button type="button" onClick={
                    () => {
                        setPostsState(
                            (oldState) => {
                                return {
                                    ...oldState,
                                    count: oldState.count + 1
                                }
                            }
                        )
                    }}>Increase</button>
            </div>
            <br />
            {
                design
            }
        </>
    )
}

export default PostList