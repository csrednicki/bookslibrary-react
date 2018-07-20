import React, { Component } from "react";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookstore: [],
      searchString: 'jura',
    };
  }

  componentDidMount() {
    fetch("/bookstore/getBooks")
      .then(res => res.json())
      .then(bookstore => {

        const books = bookstore.forEach(book => {
          console.log(book)
        });

        this.setState({ bookstore });

      })
  }

  render() {

    const list = this.state.bookstore.filter(d => {
      const regex = new RegExp(this.state.searchString, 'gi');
      return d.title.match(regex);
    }).map((book, i) =>
    <tr key={i}>
      <td>{book.title}</td>
      <td>{book.isbn}</td>
      <td><img src={book.cover} /></td>
    </tr>
    );

    return (
      <table>
        <tbody>
        {list}
        </tbody>
      </table>
    );
  }
}
