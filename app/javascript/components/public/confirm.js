import React from 'react';
import { graphql, compose } from 'react-apollo';
import {confirmSubscriber} from '../../mutations/subscriber';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  componentDidMount() {
    this.props.confirmSubscriber({
      variables: {
        subscriber: {
          id: this.props.params.subscriber_id,
        }
      }
    }).then((data) => {
      this.setState({
        message: 'you are subscribed now'
      });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
          {this.state.message}
      </div>
    )
  }
}

export default graphql(confirmSubscriber, {
  name: 'confirmSubscriber',
})(Confirm);
