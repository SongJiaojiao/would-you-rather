import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from './actions/shared'
import Home from './components/Home'
import Nav from './components/Nav'
import NewPoll from './components/NewPoll'
import LeaderBoard from './components/LeaderBoard'
import Login from './components/Login'
import PollDetail from './components/PollDetail'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'
import './font.css'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }



  render() {
    const { loggedIn } = this.props;

    return (
      <Router>

        <Fragment>
          <LoadingBar style={{ backgroundColor: '#426BFD' }} />
          {loggedIn ?
            <div className='col-6' style={{ margin: 'auto' }}>
              <Nav />
              <Switch>
                <ProtectedRoute exact path='/home' component={Home} loggedIn={loggedIn} />
                <ProtectedRoute exact path='/add' component={NewPoll} loggedIn={loggedIn} />
                <ProtectedRoute exact path='/Leaderboard' component={LeaderBoard} loggedIn={loggedIn} />
                <ProtectedRoute path='/questions/:id' component={PollDetail} loggedIn={loggedIn} />
                <ProtectedRoute component={PageNotFound} loggedIn={loggedIn} />
                <Route path='/' component={Login} loggedIn={loggedIn}/>
              </Switch>
            </div>
            :
            <Login />
          }



        </Fragment>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    loggedIn: authedUser !== null
  }
}
export default connect(mapStateToProps)(App)

