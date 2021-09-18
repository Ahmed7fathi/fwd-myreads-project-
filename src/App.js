import React from "react";
import "./App.css";
// books api
import * as BooksAPI from "./BooksAPI";

// router
import { Link, Route } from "react-router-dom";

// components
import CurrentRead from "./components/current_read";
import WantRead from "./components/want_read";
import Read from "./components/read";
import Search from "./components/search";

class BooksApp extends React.Component {
  state = {
    currently_reading: [],
    want_to_read: [],
    read: [],
    nonUsedKey: 0
  };

  get_user_books = () => {
    let data = BooksAPI.getAll();
    data.then(books => {
      this.setState(oldState => {
        oldState.currently_reading = books.filter(book => {
          return book.shelf === "currentlyReading";
        });
        oldState.want_to_read = books.filter(book => {
          return book.shelf === "wantToRead";
        });
        oldState.read = books.filter(book => {
          return book.shelf === "read";
        });
      });
    });
  };

  book_update = new_books => {
    this.setState({ nonUsedKey: Date.now() } );
  };

  componentDidMount() {
    this.get_user_books();
  }

  app() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentRead books={this.state.currently_reading} book_update={this.book_update}/>
              <WantRead books={this.state.want_to_read} book_update={this.book_update}/>
              <Read books={this.state.read} book_update={this.book_update}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );


  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (this.app())}/>
        <Route path="/search" component={Search}/>
      </div>
    );
  }
}

export default BooksApp;
