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
        this.props.router.replace('/lists')
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>email: <input ref="email" placeholder="email" defaultValue="joe@example.com" /></label><br/>
        <label>password: <input ref="pass" placeholder="password" /></label><br />
        <label>password confirmation: <input ref="pass_confirmation" placeholder="password" /></label><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
}

