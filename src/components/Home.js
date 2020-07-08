import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QuestionListItem from './QuestionListItem'
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap'
import '../index.css'




class Home extends Component {
    divideQuestions = (authedUser, questions) => {
        const questionIds = Object.keys(questions)
        const answered = questionIds.filter(function (id) {
            const question = questions[id]
            const allVotes = [...question.optionOne.votes, ...question.optionTwo.votes]
            return allVotes.includes(authedUser);
        })
        return answered

    }

    separateQuestions = (authedUser, questions) => {
        const questionValues = Object.values(questions);
        const answeredQuestions = questionValues.filter(question =>
            question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
        ).sort((a, b) => b.timestamp - a.timestamp);

        const unansweredQuestions = questionValues.filter(question =>
            answeredQuestions.includes(question) === false
        ).sort((a, b) => b.timestamp - a.timestamp);
        return { answeredQuestions, unansweredQuestions }
    }

    render() {
        const { authedUser, questions } = this.props
        const { answeredQuestions, unansweredQuestions } = this.separateQuestions(authedUser, questions)
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="10">
                        <Tab.Container defaultActiveKey="first" className='tab-container text-center'>
                            <Nav variant="pills">
                                <Col xs lg='6'>
                                    <Nav.Link eventKey="first" className='nav-pill-item' >Unanswered</Nav.Link>
                                </Col>
                                <Col xs lg='6'>
                                    <Nav.Link eventKey="second" className='nav-pill-item'>Answered</Nav.Link>
                                </Col>


                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ul className='question-list'>
                                        {unansweredQuestions.map((question) => (
                                            <li key={question.id}>
                                                <QuestionListItem id={question.id} />
                                            </li>))}
                                    </ul>

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ul className='question-list'>
                                        {answeredQuestions.map((question) => (
                                            <li key={question.id}>
                                                <QuestionListItem id={question.id} />
                                            </li>))}
                                    </ul>

                                </Tab.Pane>
                            </Tab.Content>

                        </Tab.Container>
                    </Col>

                </Row>
            </Container>

        )
    }
}

function mapStateToProps({ authedUser, questions }) {
    const questionIds = Object.keys(questions)
    return {
        authedUser,
        questions,
        questionIds
    }
}

export default withRouter(connect(mapStateToProps)(Home))