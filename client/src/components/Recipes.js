import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getRecipyQuery } from "../queries/query";
import CuisineList from "./CuisineList";
export class Recipes extends Component {
  state = {
    disableFirst: false,
    selected: {}
  }

  displayRecipes() {
    var data = this.props.data;
    console.log('data REcipe', data)
    // if (data.loading) 
    // return (<option style={{ height: "120px" }}>Loading...</option>)
    // else 
    if (data.recipes)
      //  return data.recipes.map(recipe => (<p style={{ fontSize: "12px" }}>{JSON.stringify(recipe)}</p>))
      return data.recipes.map(recipe => (
        <option
          value={recipe.id}

          key={recipe.id}>{recipe.name}</option>))
  }



  render() {
    let firstOptionMessage = this.props.data.loading ? 'Loading...' : "Select Recipe"
    let desc = ''
    if (this.state.selected)
      desc = (<p>{this.state.selected.description}</p>)

    return (
      <React.Fragment>
        <div className="recipes-container">
          Recipes
          <select id="recipe-list" onChange={(e) => this.setState({ disableFirst: true, selected: this.props.data.recipes.find(r => r.id === e.target.value) })} >
            <option disabled={this.state.disableFirst} value={undefined} >{firstOptionMessage}</option>
            {this.displayRecipes()}
          </select>
          <hr />
          {desc}
        </div>
        <CuisineList recipe={this.state.selected} />
      </React.Fragment>

    )
  }
}

export default
  graphql(getRecipyQuery)(Recipes); 
