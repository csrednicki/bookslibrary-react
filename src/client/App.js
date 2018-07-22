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
    this.setState({
      searchString: wordToMatch
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let modifiedBook = Object.assign({}, this.state.book); // creating copy of object
    modifiedBook[name] = value; // updating value

    this.setState({ book: modifiedBook });
  }

  showMessage(messageId) {
    this.setState({ userMessage: messageId }, () => {
      setTimeout(() => {
        this.setState({ userMessage: undefined });
      }, 5000);
    });
  }

  showAddBookWindow() {
    this.setState({
      book: {},
      isEdited: false
    }, () => {
      this.bookmodal.current.showWindow();
    })
  }

  addBook() {
    let bookData = [this.state.book];
    let title = this.state.book.title;

    // simple form validation
    if (typeof title === 'string' || title instanceof String && title.length >= 3) {
      this.setState({
        // adding book to a bookstore
        bookstore: this.state.bookstore.concat(bookData)
      }, () => {
        this.showMessage("addedBook");
        this.bookmodal.current.closeWindow();
      });
    } else {
      this.showMessage("formError");
    }
  }

  editBook() {
    let id = this.state.editedBookId;
    let books = this.state.bookstore;

    books[id] = this.state.book;

    this.setState({
      bookstore: books,
      isEdited: false, // editing ended
      editedBookId: undefined
    }, () => {
      this.showMessage("editedBook");
      this.bookmodal.current.closeWindow();
    })
  }

  showEditBookWindow(id) {
    this.setState({
      book: this.state.bookstore[id],
      isEdited: true, // editing start
      editedBookId: id
    }, () => {
      this.bookmodal.current.showWindow();
    });
  }

  deleteBook(id) {
    let books = this.state.bookstore;

    if (confirm('Are you sure ?')) {

      books.splice(id, 1);

      this.setState({
        bookstore: books,
      }, () => {
        this.showMessage("deletedBook");
      })
    }
  }

  saveBooks() {
    let dataToSave = JSON.stringify(this.state.bookstore);

    AJAX.ajax({
      url: '/bookstore/saveBooks/',
      type: 'PUT',
      contentType: "application/json",
      data: dataToSave,
      success: (data) => {
        this.showMessage("savedBooks");
        this.bookmodal.current.closeWindow();
      },
      error: (error) => {
        this.showMessage("savingBooksError");
      }
    });

  }

  componentDidMount() {
    // fetching books data from api
    fetch("/bookstore/getBooks")
      .then(res => {

        res.json().catch(error => {
          this.showMessage("emptyBooks");
          console.log('Error parsing json!')
        });

      })
      .then(bookstore => this.setState({ bookstore }));
  }

  render() {

    let list = undefined;

    if (this.state.bookstore && this.state.bookstore.length > 0) {
      list = this.state.bookstore.filter(d => {
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

    }

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

            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
