import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OptionsButton from '../Buttons/OptionsButton';
import DeleteButton from './../Buttons/DeleteButton';
import CoveBookImg from './CoveBookImg.jpeg'
import { Grid, Typography, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';


const useStyles = makeStyles((theme)=> ({
    item:{
        backgroundColor: theme.palette.background.paper,
        marginTop:'20px',
        padding: '20px 12px',
        boxShadow: '2px 10px 30px hsla(0, 0%, 0%, 0.25)'
    },
    bookImage:{
        [theme.breakpoints.down('md')]:{
            textAlign: 'center',
        }  
    },
    control:{
        display: 'flex',
        flexDirection: 'column !important',
        alignItems: 'end',
        justifyContent: 'end',
        [theme.breakpoints.down('md')]:{
            alignItems: 'start',
        }
    }
}));


const BookCard = ({ book, updateShelf, bookUpdated, search }) => {
    
    const [shelf, setShelf] = useState('');

    const classes = useStyles();
    const descriptionForamt = book.description ? book.description.split(' ').slice(0, 19).join(' ') : 'there no description for this book.....';
    const titleForamt = book?.title.split(' ').slice(0, 4).join(' ');
    
    useEffect(()=> {
        let isCancelled = false;
        if(!isCancelled && shelf)
            updateShelf(book, shelf);
        return ()=> isCancelled = true;
    }, [shelf])
    
    return (
        <>
            <Grid container className={classes.item}>
                {book.title ?
                <>
                    <Grid item md={2} sm={3} xs={12} className={classes.bookImage}>
                        <img src={book.imageLinks ? book.imageLinks.smallThumbnail : CoveBookImg} alt="book cover"/>
                    </Grid>
                    
                    <Grid item md={7} sm={9} className={classes.info}>
                        <Typography className={classes.text} variant="h6" component='h4'>{titleForamt}</Typography>
                        <Typography className={classes.text} variant="p">{book.authors && book.authors.map((author, i) => 
                            <Typography key={i} variant="span" color='text.secondary'> 
                                by {author}{i === book.authors.length - 1 ? '' : ', '}  
                            </Typography> )}
                        </Typography>
                        <div>
                            <Rating 
                                name="read-only" 
                                value={book.averageRating} 
                                readOnly 
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}    
                            />
                        </div>
                        <Typography  className={classes.text} variant="p" component="p" color='text.secondary'>
                            {descriptionForamt}
                        </Typography>    
                    </Grid>
                    <Grid item md={3} sm={12} className={classes.control}>
                            <OptionsButton  
                                shelf={book.shelf}
                                setShelf={setShelf}
                                bookUpdated={bookUpdated}
                                search={search}
                            />
                            {!search && <DeleteButton setShelf={setShelf} bookUpdated={bookUpdated} />}
                            
                    </Grid>
                </> 
                :   <>....</>
                }
                
            </Grid>
        </>
    );
};

BookCard.propTypes = {
    book: PropTypes.object.isRequired, 
    updateShelf: PropTypes.func.isRequired, 
    bookUpdated: PropTypes.bool,
    search: PropTypes.bool
};

export default React.memo(BookCard);