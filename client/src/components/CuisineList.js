import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCuisineQuery } from "../queries/query";
import BookDetails from "./BookDetails";
// const getBooksQuery = gql`
//     {
//      books {
//       name
//       id
//     }
//   }`

class CuisineList extends Component {
  // console.log('this.props', this.props)
  state = {
    selected: null

  }
  displayBooks() {
    var data = this.props.data;

    if (data.loading) return (<div style={{ height: "120px" }}>Loading books...</div>)
    else if (data.cuisines)
      return data.cuisines.map(cuisine => (<li
        onClick={(e) => this.setState({ selected: cuisine.id })}
        key={cuisine.id}>{cuisine.name}</li>))
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          {/* <li>Book Name</li> */}
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} notSelect={() => this.setState({ selected: null })} />
      </div>
    );
  }
}




export default graphql(getCuisineQuery)(CuisineList);
