import React, { Component } from "react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { search as SearchApi } from "../BooksAPI";
import BookControl from "./book_control";


class Search extends Component {
  state = {
    query: "",
    results: [],
    loading: false
  };

  toggle_loading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };


  // search function using debounce
  search_deb = debounce(query => {
    if (query.length > 0) {
      this.toggle_loading();
      SearchApi(query, 10).then((results) => {
        // api should return 404 in normal case so ..
        if (results.error) {
          this.setState({
            query: query,
            results: results,
            loading: !this.state.loading
          });
        } else {
          const filteredItems = results.filter(book => Array.isArray(book.authors) && book.imageLinks && book.imageLinks.thumbnail);
          this.setState({
            query: query,
            results: filteredItems,
            loading: !this.state.loading
          });
        }
      });
    } else {
      this.setState({
        results: [],
        loading: false
      });
    }
  }, 600);

  search = event => {
    let query = event.target.value;
    this.search_deb(query);
  };


  render() {
    const { query, results, loading } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search}/>
          </div>
        </div>
        <div className="search-books-results">
          {
            loading === true && (<h1>Loading .... </h1>)
          }
          {
            Array.isArray(results) && results.length > 0 && !loading ? (
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      results.map(book => {
                        return (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">

                                <div className="book-cover"
                                     style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
                                </div>

                                <BookControl book={book} move_to_shelf={this.props.move_to_shelf}
                                             user_books={this.props.user_books}/>

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
              (results.error && query.length >= 0 && !loading ? <h3>No Results</h3> : "")
          }
        </div>
      </div>);
  }
}


export default Search;