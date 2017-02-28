import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import {publicList} from '../../queries/list';
import {createSubscriber} from '../../mutations/subscriber';
import SubscriberForm from '../subscriber-form';

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  createSubscriber(email) {
    return this.props.createSubscriber({
      variables: {
        subscriber: {
          email,
          list_id: this.props.data.publicList.id
        }
      }
    }).then((response) => {
      if (!response.data.createSubscriber.subscriber.errors.length) {
        this.setState({
          message: 'you have subscribed. Check your email to confirm'
        });
      }
      return response.data.createSubscriber.subscriber.errors;
    })
  }
  render() {
    return (
      <div>
        { !this.props.data.loading &&
          <div>
            <h2>Subscribe to {this.props.data.publicList.name}</h2>
            <SubscriberForm onSubmit={this.createSubscriber.bind(this)} />
            {this.state.message}
          </div>
        }
      </div>
    )
  }
}

export default compose(
  graphql(publicList, {
    options: ({params}) => {
      return {
        variables: {
          list: params.list_id,
          user: params.user_id,
        }
      }
    }
  }),
  graphql(createSubscriber, {
    name: 'createSubscriber',
  })
)(Subscribe);
