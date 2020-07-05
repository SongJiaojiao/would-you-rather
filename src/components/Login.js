
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button, Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthedUser } from "../actions/authedUser";

import '../index.css'


class Login extends Component {
    state = {
        user: 'Select User'
    }

    handleSelect = (e) => {
        this.setState({
            user: e.target.id
        }, () => console.log(this.state.user))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.user))
        this.props.history.push(`/Home`)
    }

    render() {
        const { users } = this.props
        return (
            <div>
                <Card className='card-item login-window'>
                    <Card.Header>

                        <h1>Welcome to Would You Rather App!</h1>
                        <p className='body-regular'>Please sign in to continue</p>
                    </Card.Header>
                    <Card.Body>
                        <h2>Sign In</h2>
                        <Form>
                            <Dropdown className='dropdown'>
                                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-signin">
                                    {this.state.user}
                                </Dropdown.Toggle>
                                <DropdownMenu className='dropdown-menu'>
                                    {users.map((user) => (
                                        <Dropdown.Item key={user.id}
                                            value={user.id}
                                            onClick={this.handleSelect}
                                            id={user.id}
                                            className='dropdown-item'>
                                            <img src={user.avatarURL} width="30" height="30" className="avatar"></img>
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}

                                </DropdownMenu>
                            </Dropdown>

                            <Link to="/Home">
                                <Button variant='primary'
                                    type='submit'
                                    onClick={this.handleSubmit}
                                    disabled={this.state.user === 'Select User'}>
                                    Sign In
                                </Button>
                            </Link>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ users }) {

    return {
        users: Object.values(users)
    }

}

export default withRouter(connect(mapStateToProps)(Login))