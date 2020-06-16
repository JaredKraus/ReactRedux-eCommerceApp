import React from 'react';
import { Link } from 'react-router-dom';
import './signinStyles.scss'
import { signInWithGoogle, auth } from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../forms/Input/Input'
import Button from '../forms/Button/Button'

const initialState ={
  email: '',
  password: ''
}

class SignIn extends React.Component {
  state = {...initialState}

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }
  handleSubmit = async e => {
    e.preventDefault();
    const {email, password} = this.state;

    try {

      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState
      })

    } catch(err){
      // console.log(err)
    }
  }

  render() {
    const {email, password} = this.state
    const configAuthWrapper ={
      headline: 'LogIn'
    }

    return (
      <AuthWrapper {...configAuthWrapper} >
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
            />

            <Button type="submit">
              LogIn
            </Button>

            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle} >
                  Sign in with Google
                </Button>
              </div>
            </div>

            <div className="links">
              <Link to="/recovery">
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;
