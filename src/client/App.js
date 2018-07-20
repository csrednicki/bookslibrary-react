import React, { Component } from "react";
import "./app.css";
import ReactTable from "react-table";
import 'react-table/react-table.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookstore: [],
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

    const columns = [{
      Header: 'Title',
      accessor: 'title'
    }, {
      Header: 'ISBN',
      accessor: 'isbn',
    }, {
      Header: 'Cover',
      accessor: 'cover',
      Cell: props => <img className='cover' src={props.value} />
    }];

    return (
      <ReactTable
        data={this.state.bookstore}
        columns={columns}
      />
    )

  }
}
