import React, { Component } from "react";
import 'animate.css/animate.css'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Javascript Books Directory</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <button
                                type="button"
                                className="btn btn-secondary ml-sm-3"
                                onClick={() => this.props.showAddBookWindow()}>
                                Add new book
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="btn btn-secondary ml-sm-3"
                                onClick={() => this.props.saveBooks()}>
                                Save all books
                            </button>
                        </li>
                        <li>

                            <div id="messages" className="bs-component ml-sm-3">

                                {(() => {

                                    switch(this.props.userMessage){
                                        case "addedBook":
                                            return(
                                                <div className="alert alert-dismissible alert-success tada animated">
                                                    <strong>Well done!</strong> You successfully added new book.
                                                </div>
                                            );
                                        break;
                                        case "deletedBook":
                                            return(
                                                <div className="alert alert-dismissible alert-warning tada animated">
                                                    <strong>Good job!</strong> You successfully removed a book.
                                                </div>
                                            );
                                        break;
                                        case "savedBooks":
                                            return(
                                                <div className="alert alert-dismissible alert-success slideInDown animated">
                                                    <strong>Great!</strong> You successfully saved all books.
                                                </div>
                                            );
                                        break;
                                        case "savingBooksError":
                                            return(
                                                <div className="alert alert-dismissible alert-danger slideInDown animated">
                                                    <strong>Error!</strong> Saving books failed
                                                </div>
                                            );
                                        break;
                                        case "editedBook":
                                            return(
                                                <div className="alert alert-dismissible alert-success slideInDown animated">
                                                    <strong>Nice!</strong> You successfully edited a book.
                                                </div>
                                            );
                                        break;
                                        case "formError":
                                            return(
                                                <div className="alert alert-dismissible alert-danger slideInDown animated">
                                                    <strong>Error!</strong> Field "title" should have minimum 3 chars.
                                                </div>
                                            );
                                        break;
                                        case "emptyBooks":
                                            return(
                                                <div className="alert alert-dismissible alert-warning tada animated">
                                                    <strong>Warning!</strong> There are no books!?
                                                </div>
                                            );
                                        break;
                                    }
                                })()}

                            </div>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">

                        <input
                            className="form-control mr-lg-3"
                            type="text"
                            placeholder="Search by title"
                            ref={(input) => this.searchInput = input}
                        />

                        <button
                            className="btn btn-secondary my-2 my-sm-0"
                            onClick={(e) => this.props.handleSearch(this.searchInput.value, e)}
                        >Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}
