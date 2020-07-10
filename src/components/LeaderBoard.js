import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'


class LeaderBoard extends Component {
    handleRankStyle = (index) => {
        if (index === 1) {
            return '#FFECBB'

        }
        if (index === 2) {
            return '#D7F2DF'
        }
        if (index === 3) {
            return '#DEDEDE'

        }
        return '#E8ECFC'


    }
    render() {
        const { rankedUsers } = this.props
        return <div>
            {rankedUsers.map((user, index) =>
                <div key = {user.id}>
                    <Card border='light' className='card-item'>
                        <Card.Body className='card-body card-body-rank'>
                            <Row style={{ margin: '0', height: '100px' }}>
                                <Col md='2' style={{ backgroundColor: this.handleRankStyle(index + 1) }} className='rank-badge'>
                                    <p className='caption'>
                                        Top
                                     </p>
                                    <h1>{index + 1}</h1>
                                </Col>
                                <Col md='2'>
                                    <img alt='avatar' style={{ marginTop: '20px' }} src={user.avatarURL} width="60" height="60" className="avatar"></img>
                                </Col>
                                <Col md='6' style={{ textAlign: 'left', marginTop: '24px' }}>
                                    <div style={{ verticalAlign: 'middle' }}>
                                        <p className='body-semibold'>{user.name}</p>
                                        <p className='body-regular'>Answered:{user.answerCount}   </p>
                                        <p className='body-regular'>Asked:{user.questionCount}</p>
                                    </div>
                                </Col>
                                <Col md='2' className='rank-badge' style={{ marginTop: '8px' }}>
                                    <p className='caption'>
                                        Total Score
                                    </p>
                                    <h1>{user.totalScore}</h1>
                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>
                </div>
            )}
        </div>
    }
}
function mapStateToProps({ users }) {
    const allUsers = Object.values(users)
    const rankedUsers = allUsers.map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        totalScore: Object.values(user.answers).length + user.questions.length
    })).sort((a, b) => b.totalScore - a.totalScore)

    return {
        rankedUsers
    }

}

export default withRouter(connect(mapStateToProps)(LeaderBoard))
