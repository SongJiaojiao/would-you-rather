import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Card, Button, Form, ProgressBar, Badge } from 'react-bootstrap'
import { handleSaveAnswer } from '../actions/index'
import '../index.css'

class PollDetail extends Component {
    state = {
        selected: '',
        questionAnswered: false
    }
    componentDidMount() {
        const { isAnswered } = this.props.location.state
        this.setState({
            questionAnswered: isAnswered
        })
    }
    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked')
        const { dispatch, authedUser, question } = this.props
        this.setState({
            questionAnswered: true
        })
        dispatch(handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: this.state.selected
        }))
        this.props.history.push(`/questions/${question.id}`)

    }

    render() {
        const { authedUser, users, question } = this.props
        const author = question.author
        const userName = users[author].name
        const avatarURL = users[author].avatarURL
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

        return (<div>
            {this.state.questionAnswered ?

                <div>
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

                :
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

            }
        </div>

        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const id = props.match.params.id
    const question = questions[id]
    return {
        authedUser,
        users,
        question,

    }

}
export default withRouter(connect(mapStateToProps)(PollDetail))