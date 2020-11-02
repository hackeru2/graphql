import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getOneRecipy } from "../queries/query";
import CuisineName from "./CuisineName";
import MealType from "./MealType";

class Recipy extends Component {

  render() {

    let recipy = this.props.data.recipy; let cuisine_id = ''; let meal_id = ''
    if (recipy) {
      cuisine_id = recipy.cuisine_id
      meal_id = recipy.meal_id
    }
    return (
      <React.Fragment>
        <CuisineName cuisine_id={cuisine_id} />
        <MealType meal_id={meal_id} />
      </React.Fragment>

    );
  }
}




export default graphql(getOneRecipy, {

  options: (props) => { return { variables: { id: props.recipy_id } } }
})(Recipy);
