import React, { useEffect } from 'react';
import './default.scss';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils'
import {setCurrentUser} from './redux/actions/userActions'
import { connect } from 'react-redux'

// hoc
import WithAuth from './hoc/withAuth';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';
import Dashboard from './pages/Dashboard/Dashboard';

const App = props => {

  const {setCurrentUser, currentUser} = props;

  useEffect(() => {

    const authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });

    // runs when component unmounts
    return (
      authListner()
    )
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
              <HomepageLayout >
                <Homepage />
              </HomepageLayout>
            )} />
            <Route path="/registration"
            render={() => (
              <MainLayout >
                <Registration />
              </MainLayout>
            )} />
            <Route path="/login"
              render={() => (
                <MainLayout >
                  <Login />
                </MainLayout>
            )} />
            <Route path="/recovery" render={() => (
                <MainLayout >
                  <Recovery />
                </MainLayout>
            )} />
            <Route path="/dashboard" render={() => (
                <WithAuth>
                  <MainLayout >
                    <Dashboard />
                  </MainLayout>
                </WithAuth>
            )} />

          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  };
}

export default connect(mapStateToProps, { setCurrentUser })(App);
