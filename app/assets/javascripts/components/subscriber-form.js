import React, {PropTypes} from 'react';
import Errors from './errors';

export default class SubscriberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.email.value).then((errors) => {
      if (errors.length) {
        this.setState({
          errors,
        });
      } else {
        this.setState({
          errors: [],
        });
        this.refs.email.value = '';
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="cf bg-light-purple pa3 w-50">
        <label className="db fl w-60">
          <input className="input-reset border-box w-100 bn pl3 pv2 f6" ref="email" placeholder="email" />
        </label>
        <div className="fl tr w-40">
          <button className="w-100 f6 link dim bn ph3 pv2 bg-black-70 white" type="submit">create</button>
        </div>
        <Errors errors={this.state.errors} />
      </form>
    )
  }
}

SubscriberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
