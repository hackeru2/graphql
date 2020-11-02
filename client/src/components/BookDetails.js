import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getOneCuisine } from "../queries/query";
import AddBook from "./AddBook";
import DeleteBook from "./DeleteBook";

class BookDetails extends Component {

  state = {
    isEditing: false,
    isDeleting: false,
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log({ prevProps })
  //   // this.displayBookDetails()
  // }
  closeBook() {
    this.setState({ isEditing: !this.state.isEditing })
    //this.displayBookDetails()
  }

  closeDeleteBook(wasDeleted) {
    this.setState({ isEditing: false, isDeleting: false })
    if (wasDeleted) {
      this.props.notSelect()
      this.displayBookDetails()
    }
  }
  displayBookDetails() {
    const { cuisine } = this.props.data

    console.log({ cuisine })

    if (cuisine && this.props.bookId) return (
      <div>
        <h2>{cuisine.name}</h2>
        {/* <p>{book.genre}</p>
        <p>{book.author.name}</p> */}

        { /*  
        All books by this aut
        <ul className="other-books">
          {book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          )
          )}
        </ul> */}

      </div>
    )
    else return (<div>No Books selected ...</div>)
  }

  render() {
    let editOrClose = this.state.isEditing ? <button onClick={() => this.closeBook()}>Close</button>
      : <div style={{
        display: "inline-block"
      }}> <button onClick={() => this.setState({ isEditing: !this.state.isEditing, isDeleting: false })}>Edit</button>
        <button onClick={() => this.setState({ isDeleting: !this.state.isDeleting })}>{this.state.isDeleting ? "Close" : "Delete"}</button></div >
    if (!this.props.bookId) editOrClose = ""
    let addBook = this.state.isEditing ? <AddBook closeBook={() => this.closeBook()} editBook={this.props.data.book} /> : ''
    let changeBook = this.props.data.book ? addBook : '';
    if (this.state.isDeleting) changeBook = <DeleteBook book={this.props.data.book} closeDeleteBook={wasDeleted => this.closeDeleteBook(wasDeleted)} />

    return (
      <div id="cuisine-details">
        {/* <p>Output book details here</p> */}
        {this.displayBookDetails()}
        {this.props.data.book ? editOrClose : ''}
        {changeBook}

      </div>
    );
  }
}




export default graphql(getOneCuisine, {

  options: (props) => { return { variables: { id: props.bookId } } }
})(BookDetails);
