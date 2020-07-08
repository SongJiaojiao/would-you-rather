
import React, { Component } from 'react'
import { Card, Button, Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthedUser, clearAuthedUser } from "../actions/authedUser";

import '../index.css'


class Login extends Component {
    state = {
        user: 'Select User',
        toHome: false
    }

    handleSelect = (e) => {
        this.setState({
            user: e.target.id
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            toHome: true
        })
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.user))
        const from = this.props.location.pathname !== '/' ? this.props.location.pathname : '/home'
        this.props.history.push(from)


    }
    componentDidMount() {
        this.props.dispatch(clearAuthedUser())
    }

    render() {
        const { users } = this.props;
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


                            <Button variant='primary'
                                type='submit'
                                onClick={this.handleSubmit}
                                disabled={this.state.user === 'Select User'}>

                                Sign In

                            </Button>


                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ users }) {

    return {
        users: Object.values(users),

    }

}

export default withRouter(connect(mapStateToProps)(Login))