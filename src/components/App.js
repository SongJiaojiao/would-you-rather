import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import NewPoll from './NewPoll'
import LeaderBoard from './LeaderBoard'
import PollResult from './PollResult'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <Router>

        <Fragment>
          <LoadingBar style={{ backgroundColor: '#426BFD' }} />

          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Home} />
                <Route path='/NewPoll' component={NewPoll} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/polls/result/:id' component={PollResult} />
              </div>}
          </div>

        </Fragment>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)