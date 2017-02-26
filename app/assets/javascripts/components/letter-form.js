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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Subject</label>
          <input ref="subject" placeholder="subject" defaultValue={this.props.letter ? this.props.letter.subject : ''} />
          <div>
            <textarea ref="contents" defaultValue={this.props.letter ? this.props.letter.contents : ''}></textarea>
          </div>
          <button type="submit">{this.props.action}</button>
        </form>
      </div>
    )
  }
}

LetterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

