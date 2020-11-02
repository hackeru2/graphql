import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCuisineQuery } from "../queries/query";
import EditRecipe from "./EditRecipe";

class CuisineList extends Component {
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
          {this.displayCuisine()}
        </ul>
        <EditRecipe recipe={this.props.recipe} notSelect={() => this.setState({ selected: null })} />
      </div>
    );
  }
}




export default graphql(getCuisineQuery)(CuisineList);
