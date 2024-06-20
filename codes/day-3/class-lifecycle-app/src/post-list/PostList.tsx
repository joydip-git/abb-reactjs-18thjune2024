import { Component } from 'react'
import { Post } from '../models/post';
import PostDetail from '../post-detail/PostDetail';

type PostListStateType = { posts: Post[], errorInfo: string, fetchStatus: boolean, selectedId: number, count: number }

class PostList extends Component<any, PostListStateType> {
    constructor(props: any) {
        super(props)
        this.state = {
            posts: [],
            errorInfo: '',
            fetchStatus: false,
            selectedId: 0,
            count: 0
        }
        console.log('PL created');
    }
    // state = {
    //     posts: [],
    //     errorInfo: '',
    //     fetchStatus: false
    // }
    componentDidMount(): void {
        console.log('PL CDM');
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(
                (resp) => {
                    resp
                        .json()
                        .then(
                            (data) => {
                                this.setState(
                                    {
                                        posts: data.splice(0, 3),
                                        fetchStatus: true
                                    })
                            }, (err) => {
                                this.setState({
                                    posts: [], fetchStatus: true
                                })
                            }
                        )
                }
            )
    }
    render() {
        let design: any;
        console.log('PL rendered');
        if (!this.state.fetchStatus)
            design = <span>Loading...</span>
        else if (this.state.posts && this.state.posts.length === 0)
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
                                this.state.posts.map(
                                    (p) => <tr key={p.id}>
                                        <td
                                            onClick={
                                                () => this.setState({
                                                    selectedId: p.id
                                                })
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
                        this.state.selectedId > 0 && <PostDetail selectedPostId={this.state.selectedId} />
                    }
                </>
            )

        return (
            <>
                <div>
                    <span> Count &nbsp;{this.state.count}</span>
                    <br />
                    <button type="button" onClick={
                        () => {
                            this.setState(
                                (oldState) => {
                                    return {
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
    componentWillUnmount(): void {
        console.log('PL unmounted');
    }
}

export default PostList
