import React from 'react';
import auth from '../lib/auth';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.pass.value
    const password_confirmation = this.refs.pass_confirmation.value

    auth.signup({
      email,
      password,
      password_confirmation,
    }, (loggedIn) => {
      console.log(loggedIn);
      if (!loggedIn) {
        return this.setState({ error: true });
      }

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  }

  render() {
    return (
      <form className="mw6 pa4 center mt4 bg-light-purple white" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="mt0">Signup</h1>
        <div className="mt2">
          <label className="db fw4 lh-copy f6">Email address </label>
          <input className="pa2 input-reset ba bg-white w-100" ref="email" type="email" />
        </div>
        <div className="mt2">
          <label className="db fw4 lh-copy f6">Password</label>
          <input className="pa2 input-reset ba bg-white w-100" ref="pass" type="password" />
        </div>
        <div className="mt2">
          <label className="db fw4 lh-copy f6">Confirm password</label>
          <input className="pa2 input-reset ba bg-white w-100" ref="pass_confirmation" type="password"  />
        </div>
        <div className="mt2">
          <button className="f6 link dim bn ph3 pv2 bg-black-70 white" type="submit">Signup</button>
        </div>
        <div className="mt2">
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </div>
      </form>
    )
  }
}

