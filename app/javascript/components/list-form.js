import React, {PropTypes} from 'react';

export default class ListForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.name.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="cf bg-light-purple pa3 w-50">
        <label className="db fl w-60">
          <input className="input-reset border-box w-100 bn pl3 pv3 f6" ref="name" placeholder="name" defaultValue={this.props.name ? this.props.name : '' } />
        </label>
        <div className="fl tr w-40"><button type="submit" className="w-100 f6 link dim bn ph3 pv3 bg-black-70 white">{this.props.action}</button></div>
      </form>
    )
  }
}

ListForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
}

