import React, { Component } from "react";
import "./app.css";
import Header from './Header';
import AddBookModal from './addBook';

import DeleteIcon from './images/delete.svg';
import EditIcon from './images/edit.svg';

import AJAX from 'jquery-ajax';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.showAddBookWindow = this.showAddBookWindow.bind(this);
    this.saveBooks = this.saveBooks.bind(this);
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.bookmodal = React.createRef();

    this.state = {
      bookstore: [],
      searchString: '',
      isEdited: false,
      editedBookId: undefined,
      userMessage: '',

      book: {
        title: undefined,
        isbn: undefined,
        cover: undefined,
        description: undefined
      }

    };
  }

  handleSearch(wordToMatch, e) {
    e.preventDefault(); // prevent search form submit
    console.log('Search phrase:', wordToMatch);
    this.setState({
      searchString: wordToMatch
    });
  }

  handleInputChange(event) {
    console.log('change')
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let modifiedBook = Object.assign({}, this.state.book); // creating copy of object
    modifiedBook[name] = value; // updating value

    this.setState({
      book: modifiedBook
    }, () => console.log('state', this.state));

  }

  showAddBookWindow() {
    console.log('Add new book');

    this.setState({
      book: {},
      isEdited: false
    }, () => {
      this.bookmodal.current.showWindow();
    })

  }

  addBook() {

    let bookData = [this.state.book];

    console.log('Adding book', bookData);

    this.setState({
      bookstore: this.state.bookstore.concat(bookData)
    }, () => {
      this.bookmodal.current.closeWindow()
    });

  }

  editBook() {

    let id = this.state.editedBookId;

    console.log('Edit book id:', id);

    let books = this.state.bookstore;

    books[id] = this.state.book;

      this.setState({
        bookstore: books,
        isEdited: false, // editing ended
        editedBookId: undefined
      }, () => {
        console.log( 'edit', this.state.bookstore )
        this.bookmodal.current.closeWindow();
      })
  }

  showEditBookWindow(id) {
    console.log('Edit book id:', id);

    console.log('edit book', this.state.bookstore[id])

    this.setState({
      book: this.state.bookstore[id],
      isEdited: true, // editing start
      editedBookId: id
    }, () => {
      this.bookmodal.current.showWindow();
    });
  }

  deleteBook(id) {
    console.log('Delete book id:', id);

    let books = this.state.bookstore;

    if(confirm('Are you sure ?')) {

      books.splice(id, 1);

      this.setState({
        bookstore: books
      }, function() {
        console.log( this.state.bookstore )
      })

    }


  }

  saveBooks() {
    let dataToSave = JSON.stringify(this.state.bookstore);

    console.log('Saving book', dataToSave);

    AJAX.ajax({
      url: '/bookstore/saveBooks/',
      type: 'PUT',
      contentType: "application/json",
      data: dataToSave,
      success: (data) => {

        this.setState({
          userMessage: "savedBooks"
        }, function() {
          console.log('Books saved sucessfully');
          this.bookmodal.current.closeWindow();
        });

      },
      error: (error) => {
        console.log('Error saving books:', error);
      }
    });

  }

  componentDidMount() {
    // fetching books data from api
    fetch("/bookstore/getBooks")
      .then(res => res.json())
      .then(bookstore => this.setState({ bookstore }));
  }

  render() {

    console.log(this.state.bookstore)

    const list = this.state.bookstore.filter(d => {
      const regex = new RegExp(this.state.searchString, 'gi'); // '^'+this.state.searchString
      return d.title.match(regex);
    }).map((book, i) =>
      <tr key={i}>
        <td>{book.title}</td>
        <td>{book.description}</td>
        <td>{book.isbn}</td>
        <td><img className="cover" src={book.cover} /></td>
        <td className="action"><img
          className="editIcon"
          src={EditIcon}
          title="Edit book"
          onClick={() => this.showEditBookWindow(i)}
        /></td>
        <td className="action"><img
          className="deleteIcon"
          src={DeleteIcon}
          title="Delete book"
          onClick={() => this.deleteBook(i)}
        /></td>
      </tr>
      );

    return (
      <div>
        <Header
          showAddBookWindow={this.showAddBookWindow}
          saveBooks={this.saveBooks}
          handleSearch={this.handleSearch}
          userMessage={this.state.userMessage}
        />

        <AddBookModal
          ref={this.bookmodal}
          addBook={this.addBook}
          editBook={this.editBook}
          handleInputChange={this.handleInputChange}
          book={this.state.book}
          isEdited={this.state.isEdited}
        />

        <div className="container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>ISBN</th>
                <th>Cover</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
