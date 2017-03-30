import React, {PropTypes} from 'react';
import {indexLists} from '../queries/list';
import { graphql } from 'react-apollo';

function ListSelector(props) {
  const options = props.lists.map((list) => {
    return <option key={list.id} value={list.id}>{list.name}</option>;
  });
  return (
    <select onChange={props.onSelectChange} value={props.value}>
      <option value=''>--</option>
      {options}
    </select>
  );
}


class LetterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: this.props.letter ? this.props.letter.list_id : ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit({
      subject: this.refs.subject.value,
      contents: this.refs.contents.value,
      list_id: this.state.selectedList
    });
  }

  onSelectChange(event) {
    this.setState({selectedList: event.target.value});
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} className="w-100 bg-light-purple pa3">
          <label className="f5 db mb2 white">Subject</label>
          <input className="input-reset border-box w-100 bn pl3 pv2 f6 mb3" ref="subject" placeholder="subject" defaultValue={this.props.letter ? this.props.letter.subject : ''} />
          <label className="f5 db mb2 white">Message</label>
          <textarea className="w-100 mb2 ph3 pv2 input-reset bn" ref="contents" rows="10" defaultValue={this.props.letter ? this.props.letter.contents : ''}></textarea>
          <div className="mb2">
          <label className="f5 db mb2 white">Send to List</label>
          {!this.props.data.loading &&
            <ListSelector lists={this.props.data.lists} onSelectChange={this.onSelectChange.bind(this)} value={this.state.selectedList} />
          }
          </div>
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
export default graphql(indexLists)(LetterForm);
