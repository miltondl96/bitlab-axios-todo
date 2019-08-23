import React, { Component } from 'react'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        editing: false,
        id: '',
    }

    async componentDidMount () {
        const res = await axios.get('https://fake-user-todo-api.herokuapp.com/api/users');
        this.setState({
            users: res.data.map(user => user),
            userSelected: res.data[0].name
        })
        if (this.props.match.params.id){
            const res = await axios.get('https://fake-user-todo-api.herokuapp.com/api/todos/' + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                userSelected: res.data.user_id,
                editing: true,
                id: this.props.match.params.id
            })
        }
    }

    onsubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            user_id: this.state.userSelected,
        }
        if (this.state.editing) {
            await axios.put('https://fake-user-todo-api.herokuapp.com/api/todos/' + this.state.id, newNote)
        }else{
            await axios.post('https://fake-user-todo-api.herokuapp.com/api/todos', newNote)
        }
        this.props.history.push('/')
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                   { this.state.editing ? <h4>Edit a ToDo</h4> : <h4>Create a ToDo</h4> }
                    
                    {/* SELECT USER  */}
                    <div className="form-group">
                        <select 
                            name="userSelected" 
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                        >
                            {
                                this.state.users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Title" 
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                        />
                    </div>

                    <form onSubmit={this.onsubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
