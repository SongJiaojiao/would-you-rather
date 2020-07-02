import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

class QuestionListItem extends Component {
    toPoll = (e) => {

    }

    render() {

        const { authedUser, users, question } = this.props
        const author = question.author
        const avatarURL = users[author].avatarURL

        const optionOne = question.optionOne.text
        const optionTwo = question.optionTwo.text

        const allVotes = [...question.optionOne.votes, ...question.optionTwo.votes]
        const isAnswered = allVotes.includes(authedUser) ? true : false
        return (

            <div className="col-5">
                <Card border='light' className="question-item">
                    <Card.Header>

                        <img src={avatarURL} width="35" height="35" className="avatar"></img>
                        {author} asks
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Would you rather <br />
                            {optionOne} or {optionTwo} ?
                        </Card.Text>
                        <Link to={`/polls/result/${question.id}`} 
                              id={question.id}   
                        >
                            <Button className='btn-viewpoll'>View Poll</Button>
                        </Link>
                        {isAnswered
                            ? <p>Answered</p>
                            : <p>Unanswered</p>}
                    </Card.Body>
                </Card>
            </div>


        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]

    return {
        authedUser,
        users,
        question
    }

}
export default connect(mapStateToProps)(QuestionListItem)