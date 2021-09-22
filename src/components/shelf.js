import React, { Component } from "react";
import BookControl from "./book_control";
import PropTypes from 'prop-types';


class Shelf extends Component {
  render() {
    const {shelf_name, books, move_to_shelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf_name}</h2>
        {
          Array.isArray(books) && books.length > 0 ? (
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.map(book => {
                    return (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">

                            <div className="book-cover"
                                 style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
                            </div>

                            <BookControl book={book} move_to_shelf={move_to_shelf}/>

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
          ) : (<h3> Shelf is Empty </h3>)
        }

      </div>

    );
  }
}

Shelf.propTypes = {
  shelf_name: PropTypes.string,
  books: PropTypes.array,
  move_to_shelf: PropTypes.func,
};


export default Shelf;