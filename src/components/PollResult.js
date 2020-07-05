import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ProgressBar, Col, Row, Container, Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

class PollResult extends Component {


    render() {
        const { authedUser, users, question } = this.props
        const author = question.author
        const avatarURL = users[author].avatarURL
        const userName = users[author].name
        const optionOne = question.optionOne.text
        const optionTwo = question.optionTwo.text

        const optionOneVoted = question.optionOne.votes.includes(authedUser)
        const optionTwoVoted = question.optionTwo.votes.includes(authedUser)
        const optionOneClass = optionOneVoted ? 'selected-card' : 'unseleced-card'
        const optionTwoClass = optionTwoVoted ? 'selected-card' : 'unseleced-card'
        const totalCount = question.optionOne.votes.length + question.optionTwo.votes.length
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const optionOnePercent = (optionOneVotes / totalCount * 100).toFixed(2)
        const optionTwoPercent = (optionTwoVotes / totalCount * 100).toFixed(2)



        return (
            <div >
                <Card border='light' className="card-item">
                    <Card.Header>
                        <img src={avatarURL} width="40" height="40" className="avatar"></img>
                        <p className='body-regular'>{userName} asks</p>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ marginBottom: '16px' }}>
                            <p className='body-regular' >
                                Would you rather
                                </p>
                        </div>

                        <Card className={optionOneClass} style={{ marginBottom: '24px' }}>
                            {optionOneVoted ?
                                <Badge className='selected-badge' variant="warning">Your<br /> Vote</Badge>
                                :
                                null}

                            <Card.Body>
                                <h3>{optionOne}</h3>
                                <ProgressBar now={optionOnePercent} label={`${optionOnePercent}%`} />
                                <p className='body-regular'>{optionOneVotes} out of {totalCount} Votes</p>
                            </Card.Body>
                        </Card>

                        <Card className={optionTwoClass} style={{ marginBottom: '24px' }}>
                            {optionTwoVoted ?
                                <Badge className='selected-badge' variant="warning">Your<br /> Vote</Badge>
                                :
                                null}
                            <Card.Body>
                                <h3>{optionTwo}</h3>
                                <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent}%`} />
                                <p className='body-regular'>{optionTwoVotes} out of {totalCount} Votes</p>
                            </Card.Body>
                        </Card>

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
export default connect(mapStateToProps)(PollResult)