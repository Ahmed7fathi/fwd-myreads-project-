import React, { Component } from "react";
// books api
import * as BooksAPI from "../BooksAPI";


class BookControl extends Component {

  shelf_context = {
    currently_reading: "currentlyReading",
    want_to_read: "wantToRead",
    read: "read"
  };

  book_update(event, book) {
    BooksAPI.update(book, event.target.value).then(() => {
      this.props.move_to_shelf();
    });
  };

  // find existence shelf of this book
  find_shelf = (book_id) => {
    for (let [shelf, books] of Object.entries(this.props.user_books)) {
      const found = books.find(book => {
        return book.id === book_id;
      });
      if (found) {
        return this.shelf_context[shelf];
      }
    }
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(e) => {
            this.book_update(e, this.props.book);
          }}
          value={this.props.book.shelf || this.find_shelf(this.props.book.id) || "none"}>

          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>

        </select>
      </div>
    );
  }

}


export default BookControl;