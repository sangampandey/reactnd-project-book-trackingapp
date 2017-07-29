import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import MyReads from './MyReads'
import BookSearch from './BookSearch'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {

    state = {
        books: []
    }

    shelfArray = [{
        id: 1,
        value: "currentlyReading",
        readableName: "Currently Reading"
    }, {
        id: 2,
        value: "wantToRead",
        readableName: "Want to Read"
    }, {
        id: 3,
        value: "read",
        readableName: "Read"
    }];

    componentDidMount() {

        // Fetch all the books for this user by calling the API and then setting the state of the book
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
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

    /**
     * @description Invoke this function whenever you need to add new book to the shelf
     * @param {object} book - the book object
     */
    addBookToShelf = (book) => {

        let prevStateBooksArray = this.state.books.slice()
        prevStateBooksArray.push(book)

        // set the new state of the books Array
        this.setState((state) => ({
            books: prevStateBooksArray
        }))
    }

    render() {
        return (
            <div className="app">

                <Route path="/search" render={({ history }) => (
                    <BookSearch shelfArray={this.shelfArray} booksOnShelf={this.state.books} addBookToShelf={this.addBookToShelf} />
                )}/>

                <Route exact path="/" render={() => (
                    <MyReads books={this.state.books} updateBookShelf={this.updateBookShelf} shelfArray={this.shelfArray}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
