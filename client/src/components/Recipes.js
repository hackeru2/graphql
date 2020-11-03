import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getRecipyQuery } from "../queries/query";
import EditRecipe from "./EditRecipe";
import Recipy from "./Recipy";
export class Recipes extends Component {
  state = {
    disableFirst: false,
    selected: {}
  }

  displayRecipes() {
    var data = this.props.data;
    if (data.recipes)
      return data.recipes.map(recipe => (
        <option
          value={recipe.id}

          key={recipe.id}>{recipe.name}</option>))
  }



  render() {

    let firstOptionMessage = this.props.data.loading ? 'Loading...' : "Select Recipe"
    let desc = '', name = ""
    if (this.state.selected && this.state.selected.description) {
      desc = (<p>🌌<b> Description:</b> {this.state.selected.description}</p>)
      name = (<h4> Name : {this.state.selected.name}</h4>)
    }

    return (
      <React.Fragment>
        <div className="recipes-container">
          Recipy List
          <select id="recipe-list"
            disabled={this.props.data.loading}
            onChange={(e) => this.setState({ disableFirst: true, selected: this.props.data.recipes.find(r => r.id === e.target.value) })} >
            <option disabled={this.state.disableFirst} value={undefined} >{firstOptionMessage}</option>
            {this.displayRecipes()}
          </select>
          <hr />
          {name}
          <Recipy recipy_id={this.state.selected.id} />

          {desc}
        </div>
        <EditRecipe recipe={this.state.selected} notSelect={() => this.setState({ selected: null })} />
      </React.Fragment>

    )
  }
}

export default
  graphql(getRecipyQuery)(Recipes); 
