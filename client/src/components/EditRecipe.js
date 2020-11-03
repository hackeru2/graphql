import { groupBy, keyBy } from "lodash";
import * as compose from 'lodash.flowright';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCuisineQuery, getMealCuisinePivotQuery, getMealQuery, getRecipyQuery, updateRecipeMutation } from "../queries/query";

class EditRecipe extends Component {

  state = {
    loading: false,
    selected_meal_id: '',
    mealOptions: [],
    isEditing: false,
    isDeleting: false,
    selected: '',
    disableFirst: false,
    mealsByID: {}
  }
  cuisineOptions() {
    let cuisines = this.props.getCuisineQuery
    let pivot = this.props.getMealCuisinePivotQuery
    if (pivot.loading || cuisines.loading) return []

    return cuisines.cuisines

  }
  componentDidUpdate(prevProps, prevState) {

    if (this.props.recipe !== prevProps.recipe) {
      let selected = (this.props.recipe.cuisine_id)
      let selected_meal_id = (this.props.recipe.meal_id)
      this.setState({ selected, selected_meal_id })
      this.onChangeCuisine(selected)
    }
  }
  onChangeCuisine(value) {
    let selected = String(value)
    this.setState({ disableFirst: true, selected })

    this.setMealOptions(selected)
  }
  async onSubmitForm(e) {

    e.preventDefault();

    let variables = {
      meal_id: Number(this.state.selected_meal_id),
      cuisine_id: Number(this.state.selected),
      id: Number(this.props.recipe.id)
    }
    this.setState({ loading: "true" })
    this.props.updateRecipeMutation(
      {
        variables,
        refetchQueries: [{ query: getRecipyQuery }]
      }
    )
    this.setState({ loading: false })
    toast.success(this.props.recipe.name + " UPDATED!", { autoClose: 3000 });




  }
  setMealOptions(selected) {
    let mealOptions = groupBy(this.props.getMealCuisinePivotQuery.cuisine_meal, 'cuisine_id')[selected]
    if (!mealOptions) mealOptions = []

    this.setState({ mealOptions })
    this.setMealIdValue(mealOptions)

  }


  setMealIdValue(mealOptions) {

    let meal_ids = mealOptions.map(mo => mo.meal_id)
    if (!meal_ids.includes(this.state.selected_meal_id))
      this.setState({ selected_meal_id: meal_ids[0] })
  }

  onChangeMealHandeler(e) {

    this.setState({ selected_meal_id: e.target.value })
  }
  render() {
    console.log('12345', 12345)
    let recipe = this.props.recipe
    let getMealQuery = this.props.getMealQuery
    let mealsByID = {}
    if (!getMealQuery.loading) {
      mealsByID = keyBy(this.props.getMealQuery.meals, 'id')

    }

    let cuisineOptions = this.cuisineOptions();
    cuisineOptions = cuisineOptions.map(cu => <option

      value={cu.id} key={cu.id}>{cu.name}</option>)
    let mealOptions = <option></option>
    if (this.state.mealOptions.length) {

      mealOptions = this.state.mealOptions.map(({ meal_id }) => (
        <option key={meal_id}

          value={meal_id} > {mealsByID[meal_id].type}</option >)
      )

    }

    let Go = this.state.loading ? "Please Wait ..." : "↪ Go!"
    let title = (recipe.name ? <h2>Edit Recipe {recipe.name}</h2>
      : <h2>No recipes Selected...</h2>)
    return (
      <div id="cuisine-details" >

        {title}
        <hr />

        <br />
        <form id="edit-recipe"
          className="recipes-container"
          onSubmit={this.onSubmitForm.bind(this)}  >
          <fieldset disabled={!recipe.name || this.state.loading === "true"}>
            <label htmlFor="cuisine_id">Cuisine</label>
            <select
              value={this.state.selected}
              name="cuisine_id" id="cuisine_id"
              onChange={(e) => this.onChangeCuisine(e.target.value)} >
              <option value="" disabled={this.state.disableFirst}>Select Cuisine...</option>
              {cuisineOptions}
            </select>
            <label htmlFor="meal_id">Meal</label>
            <select
              ref={(input) => this.selectVal = input}
              onChange={(e) => this.onChangeMealHandeler(e)
              }
              value={this.state.selected_meal_id}
              name="meal_id" id="meal_id">{mealOptions} </select>
            <button className="submit-edit">{Go}</button>
          </fieldset>
        </form>
        <ToastContainer />
      </div>
    );
  }
}




export default
  compose(
    graphql(getMealCuisinePivotQuery, { name: "getMealCuisinePivotQuery" }),
    graphql(getCuisineQuery, { name: "getCuisineQuery" }),
    graphql(getRecipyQuery, { name: "getRecipyQuery" }),
    graphql(updateRecipeMutation, { name: "updateRecipeMutation" }),
    graphql(getMealQuery, { name: "getMealQuery" }))
    (EditRecipe);
