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
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h3>Add new subscriber</h3>
        <label><input ref="email" placeholder="email" /></label>
        <button type="submit">create</button>
        <Errors errors={this.state.errors} />
      </form>
    )
  }
}

SubscriberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
