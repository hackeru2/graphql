import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getOneMeal } from "../queries/query";
import Spinner from "./Spinner";

class MealType extends Component {


  displayMealType() {
    if (this.props.data.loading && this.props.meal_id)
      return <Spinner />
    const { meal } = this.props.data


    if (meal && this.props.meal_id) return (

      <p>🌌<b> Meal : </b> {meal.type}</p>



    )
    else {

      return (<span></span>)
    }
  }

  render() {
    let MealType = this.displayMealType()
    return (
      <React.Fragment>
        {MealType}
      </React.Fragment>

    );
  }
}




export default graphql(getOneMeal, {

  options: (props) => { return { variables: { id: props.meal_id } } }
})(MealType);
