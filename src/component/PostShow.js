import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class PostShow extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            posts:{},
            comments:[]
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        console.log(id)
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response=>{
            const user=response.data
            this.setState({user})
        })
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response=>{
            let posts=response.data
            console.log(posts)
            this.setState({posts})
        })
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response=>{
            let comments=response.data
            console.log(comments)
            this.setState({comments})
        })
        .catch(err=>{
            alert(err)
        })
    }

   
        render(){
        return(
            <div>
 <h2>USER NAME:{this.state.user.name}</h2>
<h3>TITLE:{this.state.posts.title} </h3>
<h3>BODY:{this.state.posts.body} </h3>
                <hr/>
                <h2>COMMENTS</h2>
                <h3> no of comments-{this.state.comments.length}</h3>
                <ul>
                    {this.state.comments.map(com=>{
                        return <li key={com.id}>{com.body}</li>
                    })}
                </ul>
                <hr/>
                <h4><Link to={`/users/${this.props.match.params.id}`}>More posts of author:{this.state.user.name}</Link></h4>

            </div>
        )
    }
}
export default PostShow