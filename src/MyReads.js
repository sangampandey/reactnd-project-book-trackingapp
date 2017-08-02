import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import BookShelf from './BookShelf'

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
                <div className="list-books-content">
                    <div>
                        {
                            shelfArray.map((shelf)=> (
                             <div className="bookshelf" key={shelf.id}>
                                 <h2 className="bookshelf-title">{shelf.readableName}</h2>
                                 <div className="bookshelf-books">
                                     <ol className="wrap">
                                         {books.filter((book)=> (
                                             (book.shelf === shelf.value)
                                         )).map((book) => (
                                             <li key={book.id}>
                                                 <BookShelf book={book} shelfArray={shelfArray} updateBookShelf={updateBookShelf}/>
                                             </li>
                                         ))}
                                     </ol>
                                 </div>
                                 <div className="shelf"></div>
                                 <div className="shelf_bottom"></div>
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