import React, {PropTypes} from 'react';

export default class ListForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.name.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="name" placeholder="name" /></label>
        <button type="submit">create</button>
      </form>
    )
  }
}

ListForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

