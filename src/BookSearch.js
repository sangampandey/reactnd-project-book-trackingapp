import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

class BookSearch extends Component {

    maxResults = 20
    noResults = ""

    static propTypes = {
        shelfArray:PropTypes.array.isRequired,
        booksOnShelf:PropTypes.array.isRequired,
        addBookToShelf:PropTypes.func.isRequired,
    }

    state = {
        query: '',
        books: []
    }

    /**
     * @description Invoke this function whenever there is change on search bar
     * @param {string} query - the query string of the search
     */
    updateQuery = (query) => {
        this.setState({ query: query })

        // search only if the query exceeds more than 2 characters
        if(query && query.length>2){

            // fetch books based on the query and return maximum 20 results
            BooksAPI.search(query,this.maxResults).then((books) => {

                console.log(books.error);

                if(books.hasOwnProperty("error")){
                    this.noResults = "No results found"
                }else{

                    this.noResults = ""

                    // check if the booksOnShelf is present in our search results as well
                    // if yes then update their shelf status to reflect
                    this.props.booksOnShelf.map(function(shelfBook){
                        books.map(function(book,index){
                            if(book.id === shelfBook.id){
                                books[index] = shelfBook;
                            }
                        });
                    });

                    // set the new state of the books Array
                    this.setState((state) => ({
                        books: books
                    }))
                }
            })
        }
    }

    /**
     * @description Invoke this function whenever we need to clear the search bar
     */
    clearQuery = () => {
        this.setState({ query: '' })
    }

    /**
     * @description Invoke this function whenever the shelf status of the book is changed
     * @param {string} bookId - the id of the book
     * @param {string} newShelfState - the shelf state of the book i.e. currentlyReading,wantToRead,read,none
     */
    updateBookShelf = (bookId,newShelfState) => {

        // store the book of which shelf status is going to change i.e. updatedBook
        // store the entire updated book Array in updatedBooks to set the state later
        let updatedBook = null,updatedBooks = [];

        // iterate through the books array and find the book with id = bookId & store than information in the
        // updatedBook variable so that we can it to the update BooksAPI
        this.state.books.map(function(book){
            if(book.id === bookId){
                updatedBook = book;
                book.shelf = newShelfState;
            }
            updatedBooks.push(book);
        });

        // set the new state of the books Array
        this.setState((state) => ({
            books: updatedBooks
        }))

        // invoke the API to update the shelf state of the book
        BooksAPI.update(updatedBook,newShelfState);
    }


    render() {

        const {shelfArray} = this.props;
        const { query,books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            id="search-input"
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                    {(query.length>0)?<div onClick={this.clearQuery} className="clear-search"></div>:""}
                </div>
                <div className="search-books-results">
                    {this.noResults}
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelfArray={shelfArray} updateBookShelf={this.updateBookShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch