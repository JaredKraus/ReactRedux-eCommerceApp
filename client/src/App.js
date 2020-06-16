import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils'
import './default.scss';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';


const initialState = {
  currentUser: null
};

class App extends React.Component {
  state = { ...initialState }

  authListner = null;

  componentDidMount() {
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({...initialState });
    });
  }

  componentDidUnmount() {
    this.authListner();
  }

  render() {
    const {currentUser} = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser} >
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path="/registration"
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser} >
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser} >
                <Login />
              </MainLayout>
          )} />
          <Route path="/recovery" render={() => (
              <MainLayout currentUser={currentUser} >
                <Recovery />
              </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
