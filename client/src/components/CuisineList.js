import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCuisineQuery } from "../queries/query";
// import BookDetails from "./BookDetails";
import EditRecipe from "./EditRecipe";
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
  displayCuisine() {
    let { recipe, data } = this.props

    if (data.loading) return (<div style={{ height: "120px" }}>Loading Cuisines...</div>)
    else if (data.cuisines)
      return data.cuisines.filter(c => recipe ? c.id === recipe.cuisine_id : true).map(cuisine => (<li
        onClick={(e) => this.setState({ selected: cuisine.id })}
        key={cuisine.id}>{cuisine.name}</li>))
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.props.recipe)}
        <ul id="cuisine-list">
          {/* <li>Book Name</li> */}
          {this.displayCuisine()}
        </ul>
        {/* <BookDetails bookId={this.state.selected} notSelect={() => this.setState({ selected: null })} /> */}
        <EditRecipe recipe={this.props.recipe} bookId={this.state.selected} notSelect={() => this.setState({ selected: null })} />
      </div>
    );
  }
}




export default graphql(getCuisineQuery)(CuisineList);
