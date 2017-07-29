import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfArray: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
    };

    /**
     * @description : create dynamic option item for select
     * @returns {Array} items - return the options for select item
     */
    createSelectItems = () => {
        let items = [];
        this.props.shelfArray.map((option) => (
            items.push(<option key={option.id} value={option.value}>{option.readableName}</option>)
        ));
        return items;
    };

    /**
     * @description : text input change listener
     * @param event - javascript event on button
     */
    handleChange = (event) => {
        const bookId = event.target.getAttribute('data-id');
        const shelfNewState = event.target.value;
        this.props.updateBookShelf(bookId, shelfNewState);
    };

    render() {

        const {book} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                    }}></div>
                    <div className="book-shelf-changer">

                        <select defaultValue={book.shelf} data-id={book.id} onChange={this.handleChange}>
                            <option value="none" disabled>Move to...</option>
                            {this.createSelectItems()}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.toString() : book.authors}</div>
            </div>
        );
    }

};

export default Book