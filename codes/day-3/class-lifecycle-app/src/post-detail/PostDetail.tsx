import React, { Component, ReactNode } from 'react'
import { Post } from '../models/post';
type PostDetailPropType = { selectedPostId: number }
type PostDetailStateType = { post: Post | undefined, fetchStatus: boolean }

export default class PostDetail extends Component<PostDetailPropType, PostDetailStateType> {
    constructor(props: PostDetailPropType) {
        super(props)
        this.state = {
            post: undefined,
            fetchStatus: false
        }
        console.log('PD created');
    }

    shouldComponentUpdate(nextProps: Readonly<PostDetailPropType>, nextState: Readonly<PostDetailStateType>, nextContext: any): boolean {
        //old props => this.props (1)
        //newly received props => nextProps (1)
        if ((this.props.selectedPostId !== nextProps.selectedPostId || this.props.selectedPostId !== this.state.post?.id) || !this.state.post)
            return true

        return false
    }
    componentDidUpdate(prevProps: Readonly<PostDetailPropType>, prevState: Readonly<PostDetailStateType>, snapshot?: any): void {
        console.log('PD CDU');
        if (prevProps.selectedPostId !== this.props.selectedPostId)
            this.fetchPost()
    }
    render(): ReactNode {
        console.log('PD rendered ' + this.props.selectedPostId);
        if (!this.state.fetchStatus)
            return <span>Loading...</span>
        else if (!this.state.post)
            return <span>no record</span>
        else
            return (
                <div>
                    Id: &nbsp;<span>{this.state.post.id}</span>
                    <br />
                    UserId: &nbsp;<span>{this.state.post.userId}</span>
                    <br />
                    Title: &nbsp;<span>{this.state.post.title}</span>
                    <br />
                    Body: &nbsp;<span>{this.state.post.body}</span>
                </div>
            )
    }
    componentDidMount(): void {
        console.log('PD CDM');
        this.fetchPost()
    }
    private fetchPost() {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.selectedPostId}`)
            .then(
                (resp) => {
                    resp.json().then(
                        (data) => {
                            this.setState({
                                post: data, fetchStatus: true
                            })
                        },
                        (error) => {
                            console.log(error);
                            this.setState({
                                post: undefined, fetchStatus: true
                            })
                        }
                    )

                },
                (err) => {
                    this.setState({
                        post: undefined, fetchStatus: true
                    })
                }
            )
    }
    componentWillUnmount(): void {
        console.log('PD unmounted');
    }
}
