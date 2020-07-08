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
          {this.props.loading === true
            ? <div><Login />
              <Switch>
                <Route path='login' component={Login} />
              </Switch>
            </div>
            : <div className='col-6' style={{ margin: 'auto' }}>
              <Nav />
              <Switch>
                <Route exact path='/home' component={Home} loggedIn = {loggedIn}/>
                <Route exact path='/add' component={NewPoll} loggedIn = {loggedIn}/>
                <Route exact path='/Leaderboard' component={LeaderBoard} loggedIn = {loggedIn}/>
                <Route path='/questions/:id' component={PollDetail} loggedIn = {loggedIn}/>
                <Route component={PageNotFound} />
              </Switch>


            </div>}


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

