import * as compose from 'lodash.flowright';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { deleteBookMutation, getCuisineQuery } from "../queries/query";


class DeleteBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''

  }
  async confirmHandeler() {
    let variables = {
      id: this.props.book.id
    }
    console.log('variables', variables)
    await this.props.deleteBookMutation(
      {
        variables,
        refetchQueries: [{ query: getCuisineQuery }]
      }
    )

    this.props.closeDeleteBook(true) //wasdeleted
  }
  cancelHandeler() { this.props.closeDeleteBook(false) }
  async onSubmitForm(e) {
    return e.preventDefault();
    return console.log(e)
    let variables = {
      id: this.props.editBook.id
    }
    console.log('variables', variables)
    await this.props.deleteBookMutation(
      {
        variables,
        refetchQueries: [{ query: getCuisineQuery }]
      }
    )

    this.props.closeBook()



  }
  displayAuthors() {
    var data = this.props.getMealsQuery;

    return data.authors.map(author => (<option value={author.id} key={author.id}>{author.name}</option>))
  }
  render() {
    let formVals = {}
    if (this.props.editBook) {
      formVals.name = this.state.name ? this.state.name : this.props.editBook.name
      formVals.genre = this.state.genre ? this.state.genre : this.props.editBook.genre
      formVals.authorId = this.state.authorId ? this.state.authorId : this.props.editBook.author.id
    }
    let formID = this.props.editBook ? "add-book-update" : "add-book"
    return (
      <form id="book-delete" onSubmit={this.onSubmitForm.bind(this)} style={{ color: "black" }} >
        <h2 style={{ textAlign: "center" }}>ARE YOU SURE?</h2>
        <div className="field">


          <br />

        </div>
        <button onClick={() => this.confirmHandeler()} >  ✓</button>
        <button onClick={() => this.cancelHandeler()} className="cancel">x</button>
      </form>
    );
  }
}




//export default graphql(getMealsQuery)(AddBook);
export default compose(
  // graphql(getMealsQuery, { name: "getMealsQuery" }),
  // graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" }) ,
)(DeleteBook);
