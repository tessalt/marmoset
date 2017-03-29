import React, {PropTypes} from 'react';
import SideNav from './side-nav';
import ListForm from './list-form';
import { graphql } from 'react-apollo';
import { createList } from '../mutations/list';

class ListNew extends React.Component {
  createList(name) {
    this.props.createList({
      variables: {
        list: {
          name
        }
      }
    }).then((response) => {
      this.props.router.replace(`/lists/${response.data.createList.list.id}/edit/`);
    });
  }

  render () {
    return (
      <div className="cf">
        <SideNav />
        <div className="fl w-60">
          <h1>New List</h1>
          <ListForm onSubmit={this.createList.bind(this)} action="Create new list" />
        </div>
      </div>
    )
  }
}

export default graphql(createList, {
  name: 'createList',
})(ListNew);
