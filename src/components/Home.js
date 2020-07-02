import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionListItem from './QuestionListItem'
import '../index.css'


class Home extends Component {
    render() {
        console.log('Home', this.props)
        return (
            <div>
                
                <ul className='question-list'>
                    {this.props.questionIds.map((id) => (
                        <li key={id}>
                            <QuestionListItem id={id} />
                        </li>))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions }) {
    return {
        questionIds: Object.keys(questions)
    }
}

export default connect(mapStateToProps)(Home)