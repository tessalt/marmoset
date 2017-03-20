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
        <form onSubmit={this.handleSubmit.bind(this)} className="w-100 bg-light-purple pa3">
          <label className="f5 db mb2 white">Subject</label>
          <input className="input-reset border-box w-100 bn pl3 pv2 f6 mb3" ref="subject" placeholder="subject" defaultValue={this.props.letter ? this.props.letter.subject : ''} />
          <label className="f5 db mb2 white">Message</label>
          <textarea className="w-100 mb2 ph3 pv2 input-reset bn" ref="contents" rows="10" defaultValue={this.props.letter ? this.props.letter.contents : ''}></textarea>
          <button className="f6 link dim bn ph3 pv2 bg-black-70 white" type="submit">{this.props.action}</button>
          {this.props.children}
        </form>
      </div>
    )
  }
}

LetterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

