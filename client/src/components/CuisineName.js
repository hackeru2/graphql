import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getOneCuisine } from "../queries/query";
import Spinner from "./Spinner";

class CuisineName extends Component {


  displayCuisineName() {
    if (this.props.data.loading && this.props.cuisine_id)
      return <Spinner />
    const { cuisine } = this.props.data


    if (cuisine && this.props.cuisine_id) return (

      <p>🌌<b> Cuisine : </b> {cuisine.name}</p>



    )
    else return (<span></span>)
  }

  render() {
    let cuisineName = this.displayCuisineName()
    return (
      <React.Fragment>
        {cuisineName}
      </React.Fragment>

    );
  }
}




export default graphql(getOneCuisine, {

  options: (props) => { return { variables: { id: props.cuisine_id } } }
})(CuisineName);
