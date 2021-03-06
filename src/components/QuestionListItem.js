import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Card, Button, Badge, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

class QuestionListItem extends Component {
    render() {

        const { users, question } = this.props
        const author = question.author
        const userName = users[author].name
        const avatarURL = users[author].avatarURL

        const optionOne = question.optionOne.text
        const optionTwo = question.optionTwo.text

        return (

            <div>
                <Card border='light' className="card-item">
                    <Card.Header>
                        <img alt='avatar' src={avatarURL} width="40" height="40" className="avatar"></img>
                        <p className='body-regular'>{userName} asks</p>
                    </Card.Header>

                    <Card.Body>
                        <div style={{ marginBottom: '16px' }}>
                            <p className='body-regular' >
                                Would you rather
                                </p>
                        </div>
                        <Col >
                            <Badge variant="light">{optionOne}</Badge>
                        </Col>
                        <Col>
                            <Badge variant="light">{optionTwo}</Badge>
                        </Col>

                        <Link
                            to={{
                                pathname: `/questions/${question.id}`,
                               
                            }}
                        >
                            <Button variant='primary'>View Poll</Button>
                        </Link>
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
        question: question ? question : null
    }

}
export default connect(mapStateToProps)(QuestionListItem)