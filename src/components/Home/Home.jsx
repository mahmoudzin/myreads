import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Shelf from './../Shelf/Shelf';
import { Grid } from '@mui/material';

const Home = ({ setShelf, shelf, books, setBookToUpdateShelf, setShelfToUpdate, filterBooks, bookUpdated }) => {
    return (
        <>
            <Grid container>
                <Grid item xs={2} sm={3} md={2}>
                    <Sidebar 
                        setShelf={setShelf}
                    />
                </Grid>
                <Grid item xs={10} sm={9} md={10} sx={{padding: '10px'}}>
                   {shelf === "All" && books?
                     <>
                        <Shelf 
                            setBookToUpdateShelf ={setBookToUpdateShelf}
                            setShelfToUpdate={setShelfToUpdate}
                            type="currentlyReading" 
                            books={filterBooks.filter(book => book.shelf === "currentlyReading")}
                            bookUpdated={bookUpdated}
                            search={false}
                        />
                        <Shelf 
                            setBookToUpdateShelf ={setBookToUpdateShelf}
                            setShelfToUpdate={setShelfToUpdate}
                            type="wantToRead" 
                            books={filterBooks.filter(book => book.shelf === "wantToRead")}
                            bookUpdated={bookUpdated}
                            search={false}
                        />
                        <Shelf
                            setBookToUpdateShelf ={setBookToUpdateShelf}
                            setShelfToUpdate={setShelfToUpdate} 
                            type="read" 
                            books={filterBooks.filter(book => book.shelf === "read")}
                            bookUpdated={bookUpdated}
                            search={false}
                        />
                     </> 
                    : <Shelf 
                        setBookToUpdateShelf ={setBookToUpdateShelf}
                        setShelfToUpdate={setShelfToUpdate}
                        type={shelf} 
                        books={filterBooks}
                        bookUpdated={bookUpdated}
                        search={false}
                    />
                    }
                </Grid>
            </Grid>
        </>
    );
};

Home.propTypes ={
    setShelf: PropTypes.func.isRequired, 
    shelf: PropTypes.string.isRequired, 
    books: PropTypes.arrayOf(PropTypes.object), 
    filterBooks: PropTypes.arrayOf(PropTypes.object), 
    bookUpdated: PropTypes.bool.isRequired
};

export default React.memo(Home);