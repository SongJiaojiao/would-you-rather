import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import { Button, Dropdown, Row, Container, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

function Nav(props) {
    const { authedUser, users } = props
    const user = users[authedUser]
    const userName = user.name
    const avatarURL = user.avatarURL

    function handleClick(e) {
        e.preventDefault();
        const { dispatch } = props;
        dispatch(setAuthedUser(null))
        props.history.push(`/`)
    }

    return (

        <Row>
            <Col >
                <nav className='nav stroke'>
                    <ul>
                        <li>
                            <NavLink to='/Home' exact className="nav-item" activeClassName='active-nav'>
                                Home
                    </NavLink>

                        </li>
                        <li>
                            <NavLink to='/add' className="nav-item" activeClassName='active-nav'>
                                New Poll
                    </NavLink>
                        </li>
                        <li>
                            <NavLink to='/LeaderBoard' className="nav-item" activeClassName='active-nav'>
                                LeaderBoard
                    </NavLink>
                        </li>
                    </ul>

                </nav>

            </Col>
            <Col md='auto' >
                <Row className='signout'>
                    <Col md='auto' style={{ padding: '0' }}>
                        <img src={avatarURL} width="45" height="45" className="avatar" style={{ display: 'inline' }} />
                    </Col>
                    <Col md='auto' style={{ padding: '0' }}>
                        <Dropdown>
                            <Dropdown.Toggle className='dropdown-toggle-signout'>
                                {userName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleClick} >Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Col>
                </Row>
            </Col>

        </Row>



    )
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users

    }

}
export default withRouter(connect(mapStateToProps)(Nav))