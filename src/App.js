import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from './actions/shared'
import Home from './components/Home'
import Nav from './components/Nav'
import NewPoll from './components/NewPoll'
import LeaderBoard from './components/LeaderBoard'
import PollResult from './components/PollResult'
import PollItem from './components/PollItem'
import Login from './components/Login'
import PollDetail from './components/PollDetail'
import './index.css'
import './font.css'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    return (
      <Router>

        <Fragment>
          <LoadingBar style={{ backgroundColor: '#426BFD' }} />
          {this.props.loading === true
            ? <Login />
            : <div className='col-6' style = {{margin:'auto'}}>
              <Nav />
              <Route exact path='/Home' component={Home} />
              <Route exact path='/add' component={NewPoll} />
              <Route exact path='/Leaderboard' component={LeaderBoard} />
              <Route path='/questions/:id' component={PollDetail} />
              

            </div>}


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