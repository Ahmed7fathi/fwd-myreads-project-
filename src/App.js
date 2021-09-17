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
    currently_reading: []

  };

  get_currently = () => {
    let data = BooksAPI.getAll();
    data.then(books => {
      this.setState(oldState => {
        oldState.currently_reading = books.filter(book => {
          return book.shelf === "currentlyReading";
        });
      });
    })
  };


  componentDidMount() {
    this.get_currently();
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
              <CurrentRead books={this.state.currently_reading || null}/>
              <WantRead/>
              <Read/>
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
