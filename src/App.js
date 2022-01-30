import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/quiz/quiz';
import {Route, Routes, Navigate} from 'react-router-dom';
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
    <Routes>
      <Route path='/auth' element={<Auth />}/>
      <Route path='/quiz/:id' element={<Quiz />}/>
      <Route path='/' element={<QuizList />}/>
      <Route
        path="*"
        element={<Navigate to="/" />}
    />
    </Routes>
    )
    if (this.props.isAuthenticated) {
      routes = (
      <Routes>
        <Route path='/quiz-creator' element={<QuizCreator />}/>
        <Route path='/quiz/:id' element={<Quiz />}/>
        <Route path='/' element={<QuizList />}/>
        <Route path='/logout' element={<Logout />} />
        <Route
        path="*"
        element={<Navigate to="/" />}
    />
      </Routes>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
