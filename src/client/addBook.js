import React, { Component } from "react";

export default class AddBookModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.windowVisible) {
            return (
                <div className="bs-component">
                    <div id="addBookModalWindow" className="modal show">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.props.isEdited ? "Edit selected book" : "Add new book"}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.closeWindow()}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <div className="bs-component">
                                        <form>
                                            <fieldset>

                                                <div className="form-group">
                                                    <input type="text" name="title" value={this.props.book.title} onChange={this.props.handleInputChange} className="form-control" id="booktitle" aria-describedby="bookTitle" placeholder="Enter book title" />
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="isbn" value={this.props.book.isbn} onChange={this.props.handleInputChange} className="form-control" id="bookisbn" aria-describedby="bookIsbn" placeholder="Enter book isbn number" />
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="cover" value={this.props.book.cover} onChange={this.props.handleInputChange} className="form-control" id="bookcoverurl" aria-describedby="bookCoverUrl" placeholder="Enter book cover URL" />
                                                </div>

                                                <div className="form-group">
                                                    <textarea name="description" className="form-control" id="descriptionTextarea" rows="3" placeholder="Enter book description" value={this.props.book.description} onChange={this.props.handleInputChange}></textarea>
                                                </div>

                                            </fieldset>
                                        </form>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    {this.props.isEdited ?
                                    <button type="button" className="btn btn-primary" onClick={() => this.props.editBook()}>Apply changes</button>
                                    :
                                    <button type="button" className="btn btn-primary" onClick={() => this.props.addBook()}>Add new book</button>
                                    }

                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.props.closeWindow()}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else {
            return (
                <div></div>
            )
        }
    }
}
