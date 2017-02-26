import React, {PropTypes} from 'react';

export default class LetterForm extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit({
      subject: this.refs.subject.value,
      contents: this.refs.contents.value,
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Subject</label>
        <input ref="subject" placeholder="subject" />
        <div>
          <textarea ref="contents"></textarea>
        </div>
        <button type="submit">create</button>
      </form>
    )
  }
}

LetterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

