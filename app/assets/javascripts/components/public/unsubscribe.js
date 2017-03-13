import React from 'react';
import { graphql, compose } from 'react-apollo';
import {deleteSubscriber} from '../../mutations/subscriber';

class Unsubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  onClick() {
    this.props.deleteSubscriber({
      variables: {
        subscriber: {
          id: this.props.params.subscriber_id,
        }
      }
    }).then((data) => {
      this.setState({
        message: 'you have unsubscribed'
      });
    });
  }

  render() {
    return (
      <div>
        <p>Do you want to unsubscribe from this list?</p>
        <button onClick={this.onClick.bind(this)}>Unsubscribe</button>
        {this.state.message}
      </div>
    )
  }
}

export default graphql(deleteSubscriber, {
  name: 'deleteSubscriber',
})(Unsubscribe);
