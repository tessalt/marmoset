import React, {PropTypes} from 'react';

export default class LetterForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit({
      subject: this.refs.subject.value,
      contents: this.refs.subject.contents,
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="subject" placeholder="subject" /></label>
        <textarea ref="contents"></textarea>
        <button type="submit">create</button>
      </form>
    )
  }
}

LetterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

