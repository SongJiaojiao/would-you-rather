import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap'
import { handleSaveAnswer } from '../actions/index'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

class PollItem extends Component {
    state = {
        selected: ''
    }

    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, authedUser, question } = this.props
        dispatch(handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: this.state.selected
        }))
        this.props.history.push (`/polls/${question.id}`)
    }
    render() {
        const { authedUser, users, question } = this.props
        const author = question.author
        const avatarURL = users[author].avatarURL
        const optionOne = question.optionOne.text
        const optionTwo = question.optionTwo.text
        return (

            <div>
                <Card border='light' className='card-item'>
                    <Card.Header>
                        <img src={avatarURL} width="35" height="35" className="avatar"></img>
                        {author} asks
                    </Card.Header>
                    <Card.Body>
                        Would you rather
                        <form onSubmit={this.handleSubmit} >
                            <Form.Group >

                                <Form.Check
                                    type="radio"
                                    label={optionOne}
                                    checked={this.state.selected === "optionOne"}
                                    value="optionOne"
                                    onChange={this.handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label={optionTwo}
                                    checked={this.state.selected === "optionTwo"}
                                    value="optionTwo"
                                    onChange={this.handleChange}
                                />


                            </Form.Group>
                            <div>
                                <Button type='submit'
                                    className='button'
                                >
                                    Subimt
                                </Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        )

    }
}


function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]
    return {
        authedUser,
        users,
        question
    }

}
export default connect(mapStateToProps)(PollItem)