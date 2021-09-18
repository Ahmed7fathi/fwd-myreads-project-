import React, { Component } from "react";
// books api
import * as BooksAPI from "../BooksAPI";


class BookControl extends Component {

   book_update(event, book){
    BooksAPI.update(book, event.target.value).then(r => {
      // todo: find a better approach to reload components
      window.location.reload();
    });
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={(e) => {this.book_update(e, this.props.book)}}>
          <option value="move" disabled>Move to...</option>
          <option value="default" style={{'display': 'none'}}>0</option>
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