import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class UserShow extends React.Component{
        constructor(){
            super()
            this.state={
                user:{},
                posts:[]
            }
        }
        componentDidMount(){
            const id=this.props.match.params.id
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response=>{
                const user=response.data
                console.log(user)
                this.setState({user})
            })
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response=>{
                let posts=response.data
                console.log(posts)
                this.setState({posts})
            })

            .catch(err=>{
                alert(err)
            })
        }
        render(){
        return(
            <div>
                <h2>USER NAME:{this.state.user.name}</h2>
                <h3>POST WRITTEN BY USER</h3>
                <h2>post list-{this.state.posts.length}</h2>
                <ul>
{ this.state.posts.map(post=>{
    return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
})}                
                </ul>
            </div>
        )
    }
}
export default UserShow