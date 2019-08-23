import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {

    state = {
        users: [],
        name: "",
        last_name: "",
        email: "",
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        const res = await axios.get('https://fake-user-todo-api.herokuapp.com/api/users')
        this.setState({
            users: res.data
        })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        })
    }

    onChangeLastname = (e) => {
        this.setState({
            last_name: e.target.value,
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('https://fake-user-todo-api.herokuapp.com/api/users' , {
            name: this.state.name,
            last_name: this.state.last_name,
            email: this.state.email
        })
        this.setState({
            name: ""
        })
        this.getUsers();
    }

    deleteUser = async (id) => {
        await axios.delete('https://fake-user-todo-api.herokuapp.com/api/users/' + id)
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.last_name}
                                    onChange={this.onChangeLastname}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    placeholder="Email"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                    <br/>
                    <h6>* Double click to delete a user.</h6>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map( (user) => (
                                <li 
                                    key={user.id} 
                                    className="list-group-item list-group-item-action"
                                    onDoubleClick={() => this.deleteUser(user.id)}
                                >
                                    <p >Name: {user.name} {user.last_name}</p>
                                    <p className="mb-0">Email: {user.email}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
