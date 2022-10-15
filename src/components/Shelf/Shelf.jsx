import React from 'react';
import PropTypes  from 'prop-types';
import BookCard from './../BookCard.jsx/BookCard';
import Loading from './../Loading/Loading';
import { Typography } from '@mui/material';

function Shelf({ type, books, mainBooks, setBookToUpdateShelf, setShelfToUpdate, bookUpdated, search }) {
    let title = '';

    if(!search){
        if(type === 'read')
            title = 'Read Books';
        else if(type === 'wantToRead')
            title = 'Want To Read Books';
        else if (type === 'currentlyReading')
            title = 'Currently Reading Books';     
    }
    
    return (
        <div>
            
            <Typography variant="h4" component="h2" mt={5} mb={5}>{search ? '' : title}</Typography>
            {books 
                ? books.map( 
                    book => {
                    const setShelf = search && mainBooks.find(b => b.id === book.id); 
                    if (setShelf) {
                        book.shelf = setShelf.shelf
                    }
                    return <BookCard 
                        key={book.id} 
                        book={book} 
                        setBookToUpdateShelf ={setBookToUpdateShelf}
                        setShelfToUpdate={setShelfToUpdate}
                        bookUpdated={bookUpdated}
                        search={search}
                    />
                    }
                )
                : search ? '' : <Loading/>
            }
        </div>
    );
}

Shelf.propTypes = {
    type: PropTypes.string, 
    books: PropTypes.arrayOf(PropTypes.object), 
    bookUpdated: PropTypes.bool, 
    search: PropTypes.bool
};
export default React.memo(Shelf);