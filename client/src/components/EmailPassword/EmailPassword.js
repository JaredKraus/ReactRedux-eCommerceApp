import React from 'react';
import { withRouter } from 'react-router-dom';
import './emailpasswordStyles.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../forms/Input/Input';
import Button from '../forms/Button/Button';

import {auth} from '../../firebase/utils'

const initialState = {
  email: '',
  error: []
}

class EmailPassword extends React.Component {
  state = {...initialState}

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { email } = this.state;
      const config = {
        url: 'http://localhost:3000/login'
      };

      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found. Please try again'];
          this.setState({error: err})
        });

    } catch (err) {
      // console.log(err)
    }
  }

  render() {
    const {email, error} = this.state;
    const configAuthWrapper = {
      headline: 'Email Password'
    }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">

          {error.length > 0 && (
            <ul>
              {error.map((e, i) => {
                return (
                  <li key={i}>
                    {e}
                  </li>
                );
              })}
            </ul>
          )}

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <Button type="submit">
              Send Password
            </Button>
          </form>
        </div>

      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
