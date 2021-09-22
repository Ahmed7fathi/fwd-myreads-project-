import React from "react";
import "./App.css";
// books api
import * as BooksAPI from "./BooksAPI";

// router
import { Link, Route } from "react-router-dom";

// components
import Shelf from "./components/shelf";
import Search from "./components/search";

class BooksApp extends React.Component {
  state = {
    currently_reading: [],
    want_to_read: [],
    read: []
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
              <Shelf shelf_name={"Currently Reading"}
                     books={this.state.currently_reading}
                     move_to_shelf={this.get_user_books}/>

              <Shelf shelf_name={"Want To Read"}
                     books={this.state.want_to_read}
                     move_to_shelf={this.get_user_books}/>

              <Shelf shelf_name={"Read"}
                     books={this.state.read}
                     move_to_shelf={this.get_user_books}/>
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

        {/*pass props to route */}
        <Route path='/search'>
          <Search user_books={this.state} move_to_shelf={this.get_user_books}/>
        </Route>

      </div>
    );
  }
}

export default BooksApp;
