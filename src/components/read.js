import React, { Component } from "react";
import BookControl from "./book_control";


class Read extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        {
          Array.isArray(this.props.books) && this.props.books.length > 0  ?
            (
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

                        <BookControl book={book} book_update={this.props.book_update}/>

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
        </div>) : (<h3>Read list is empty </h3>)
        }
      </div>
    );
  }

}


export default Read;