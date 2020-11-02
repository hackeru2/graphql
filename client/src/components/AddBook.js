import * as compose from 'lodash.flowright';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addBookMutation, getAuthorsQuery, getCuisineQuery, updateBookMutation } from "../queries/query";


class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''

  }
  setInitialState() {
    this.setState((state, props) => {

      return {
        name: props.editBook.name,
        genre: props.editBook.genre,
        authorId: props.editBook.author.id
      }
    });
  }
  // componentDidMount() {
  //   if (this.props.editBook) this.setInitialState()


  // }
  // componentDidUpdate(prevProps, prevState) {
  //   // if (!prevState.editBook) return console.log("bye cdu")
  //   // console.log({ prevPropsName: prevState.editBook.name }, { state: this.state.name })
  //   if (prevProps.editBook && prevProps.editBook.name !== this.state.name) this.setInitialState()
  // }


  // console.log('this.props', this.props)
  async onSubmitForm(e) {
    e.preventDefault();
    if (this.props.editBook) {
      let variables = {
        name: this.state.name ? this.state.name : this.props.editBook.name,
        genre: this.state.genre ? this.state.genre : this.props.editBook.genre,
        id: this.props.editBook.id
      }
      console.log('variables', variables)
      await this.props.updateBookMutation(
        {
          variables,
          refetchQueries: [{ query: getCuisineQuery }]
        }
      )


      this.props.closeBook()

    }
    else this.props.addBookMutation(
      {
        variables: { name: this.state.name, genre: this.state.genre, authorId: this.state.authorId },
        refetchQueries: [{ query: getCuisineQuery }]
      }
    )
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;

    //    return data.authors.map(author => (<option value={author.id} key={author.id}>{author.name}</option>))
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
      <form id={formID} onSubmit={this.onSubmitForm.bind(this)}  >
        <div className="field">
          <label>Book name:</label>
          <input type="text" value={formVals.name}
            onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" value={formVals.genre}
            onChange={e => this.setState({ genre: e.target.value })} />

        </div>
        <div className="field">
          <label>Author:</label>
          {this.props.getAuthorsQuery.loading ? <div>Loading Authors...</div> : (
            <select value={formVals.authorId} disabled={this.props.editBook} onChange={e => this.setState({ authorId: e.target.value })} >
              <option>Select author</option>
              {this.displayAuthors()}
            </select>)}
        </div>
        <button disabled={!this.props.editBook && !this.state.authorId}>+</button>

      </form>
    );
  }
}




//export default graphql(getAuthorsQuery)(AddBook);
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(updateBookMutation, { name: "updateBookMutation" }) ,
)(AddBook);
