import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class MyReads extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
        shelfArray:PropTypes.array.isRequired,
    }


    render() {

        const {books,updateBookShelf,shelfArray} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelfArray.map((shelf)=> (
                             <div className="bookshelf" key={shelf.id}>
                                 <h2 className="bookshelf-title">{shelf.readableName}</h2>
                                 <div className="bookshelf-books">
                                     <ol className="books-grid">
                                         {books.filter((book)=> (
                                             (book.shelf === shelf.value)
                                         )).map((book) => (
                                             <li key={book.id}>
                                                 <Book book={book} shelfArray={shelfArray} updateBookShelf={updateBookShelf}/>
                                             </li>
                                         ))}
                                     </ol>
                                 </div>
                             </div>
                         ))
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MyReads