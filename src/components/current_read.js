import React, { Component } from "react";
import BookControl from "./book_control";

class CurrentRead extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        {
          Array.isArray(this.props.books) && this.props.books.length > 0 ? (
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.props.books.map(book => {
                      return (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">

                              <div className="book-cover"
                                   style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
                              </div>

                              <BookControl book={book} move_book={this.props.move_book}/>

                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{
                              book.authors.map((auth, index) => {
                                return (index < 1 ? auth : ` - ${auth}`);
                              })
                            }
                            </div>
                          </div>
                        </li>);
                    })
                  }
                </ol>
              </div>
            )
            :
            (<h3>Not Reading any books at this time</h3>)
        }
      </div>

    );
  }
}


export default CurrentRead;