import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Card, Button, Form, Col, Row, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'
import { handleAddQuestion } from '../actions/index'

class NewPoll extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
    }
    handleOptionOneChange = (e) => {
        this.setState({
            optionOneText: e.target.value
        })

    }
    handleOptionTwoChange = (e) => {
        this.setState({
            optionTwoText: e.target.value
        })

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const question = {
            optionOneText: this.state.optionOneText,
            optionTwoText: this.state.optionTwoText,
            author: ''
        }
        dispatch(handleAddQuestion(question))
            .then(() => this.props.history.push(`/Home`))

        this.setState({
            optionOneText: '',
            optionTwoText: '',
        })

    }


    render() {
        const { optionOneText, optionTwoText } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Card border='light' className="card-item">
                        <Card.Header style={{ textAlign: 'center' }}>
                            <h2>
                                Create New Question
                            </h2>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group style={{ margin: '24px 0 24px 0' }}>
                                <Form.Control placeholder="Enter Option One"
                                    onChange={this.handleOptionOneChange}
                                    value={this.state.optionOneText} />
                            </Form.Group>

                            <div style={{ textAlign: 'center' }}>
                                <p className='body-regular'>
                                    OR
                                </p>
                            </div>

                            <Form.Group style={{ margin: '24px 0 40px 0' }}>
                                <Form.Control placeholder="Enter Option Two"
                                    onChange={this.handleOptionTwoChange}
                                    value={this.state.optionTwoText} />
                            </Form.Group>

                            <div style={{ textAlign: 'center' }}>
                                <Button type='submit'
                                    className='button'
                                    disabled={optionOneText === '' || optionTwoText === ''}>
                                    Subimt
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(NewPoll))
