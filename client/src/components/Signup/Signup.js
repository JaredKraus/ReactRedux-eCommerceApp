import React from 'react';
import './signupStyles.scss'

import {auth, handleUserProfile } from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../forms/Input/Input';
import Button from '../forms/Button/Button';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
};

class Signup extends React.Component {
  state = {...initialState}

  handleChange = (e) => {
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const {displayName, email, password, confirmPassword} = this.state;

    if (password !== confirmPassword) {
      const err = ['Passwords do not match']
      this.setState({
        errors: err
      })
      return;
    }

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState
      });

    } catch(err) {
      // console.log(err);
    }
  }

  render() {
    const {displayName, email, password, confirmPassword, errors} = this.state;
    const configAuthWrapper = {
      headline: 'Register'
    }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return (
                  <li key={index}>
                    {err}
                  </li>
                );
              })}
            </ul>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full Name"
              onChange={this.handleChange}
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />

            <Button type="submit">
              Register
            </Button>

          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signup;
