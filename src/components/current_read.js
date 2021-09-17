import React, { Component } from "react";


class CurrentRead extends Component {

  render() {
    return (
      <div className="bookshelf">

        <h2 className="bookshelf-title">Currently Reading</h2>
        {
          this.props.books.length < 0 && (<h1>Loading ...</h1>)
        }
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map(book => {
                console.log("book : ", book);
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">

                        <div className="book-cover"
                         style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
                        </div>

                        <div className="book-shelf-changer">
                          <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
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
      </div>

    );
  }
}


export default CurrentRead;