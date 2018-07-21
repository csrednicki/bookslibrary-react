import React, { Component } from "react";

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
                    </ul>

                    <form className="form-inline my-2 my-lg-0">

                        <input
                            className="form-control mr-lg-3"
                            type="text"
                            placeholder="Search"
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
