import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {

    state = {
        notes: [],
        users: [],
        userSelected: 1,
    }

    async componentDidMount() {
        const res = await axios.get('https://fake-user-todo-api.herokuapp.com/api/users');
        this.setState({
            users: res.data.map(user => user)
        })
        this.getNotes();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            this.getNotes();
        })
        
    }

    getNotes = async () => {
        const res = await axios.get(`https://fake-user-todo-api.herokuapp.com/api/users/${this.state.userSelected}/todos`);
        console.log(res)
        this.setState({
            notes: res.data,
        });
    }

    deleteNote = async (id) => {
        await axios.delete('https://fake-user-todo-api.herokuapp.com/api/todos/' + id);
        this.getNotes();
    }

    render() {
        return (
            <div className="">
                <div className="row">
                <div className="col-md-4 pb-4">
                    <div className="card card-body">
                        <h4>Select User</h4>
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
                </div>
                </div>
                <div className="row">
                    {
                        this.state.notes.map(note => (
                            <div className="col-md-4 pb-4" key={note.id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <Link className="btn btn-secondary" to={"/edit/" + note.id}>
                                            Edit
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="mb-0">{note.title}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => this.deleteNote(note.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
