import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'

class PollResult extends Component {


    render() {
        const { authedUser, users, question } = this.props
        console.log('test',this.props.location.state,question)
        

        return (
            <div className="col-5">
            <Card border='light' className="question-item">
                <Card.Header> asks
                </Card.Header>
                <Card.Body>

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
export default connect(mapStateToProps)(PollResult)