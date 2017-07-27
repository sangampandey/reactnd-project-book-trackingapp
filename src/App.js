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

    componentDidMount() {
        // @description : Fetch all the books for this user
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    updateBookShelf = (bookId,newShelfState) => {

        let updatedBook = null,updatedBooks = [];

        this.state.books.map(function(book){
            if(book.id === bookId){
                updatedBook = book;
                book.shelf = newShelfState;
            }
            updatedBooks.push(book);
        });


        this.setState((state) => ({
            books: updatedBooks
        }))

        BooksAPI.update(updatedBook,newShelfState);
    }

    render() {
        return (
            <div className="app">

                <Route path="/search" render={({ history }) => (
                    <BookSearch/>
                )}/>

                <Route exact path="/" render={() => (
                    <MyReads books={this.state.books} updateBookShelf={this.updateBookShelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
