import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import { search } from '../../BooksAPI';
import Shelf from '../Shelf/Shelf';
import searchBackground from './searchBackGround.jpg'
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';



const useStyles = makeStyles((theme)=> ({
    backgroundImg: {
        background: `url(${searchBackground})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '1px'
    },
    searchInput: {
        margin: '50px 10px',
        width: 'calc(100% - 20px)',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            margin: '50px auto',      
        },
    },
    results:{
        margin: 'auto',
        width: '75% !important',
        padding: '10px',
        [theme.breakpoints.down('md')]: {
            width: '98% !important',      
        }
    }    
}));
function Search({ updateShelf }) {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [emptyQuery, setEmptyQueryMsg] = useState('');
    
    useEffect(()=>{
        let isCancelled = false;

        if(!isCancelled && query) {
            const searchBooks =  async () => { 
                const res = await search(query.trim(), 20);
                console.log(query.trim());
                if(res.length > 0) {
                    setResults(res);
                    setEmptyQueryMsg('');
                }else {
                    setEmptyQueryMsg('There no results match your query <:');
                    setResults(null);
                }
            }
            searchBooks();
        }else setResults(null);

        return () => {
            isCancelled = true
        };
    }, [query]);
    return (
        <div className={classes.backgroundImg}>
            <SearchInput classes={classes.searchInput} setQuery={setQuery} query={query}/>
            <div className={classes.results}>
                {query ? emptyQuery ?
                <Typography variant="h6" mb={5} color='#fff'> {emptyQuery} </Typography>
                :<Typography variant="h6" mb={5} color='#fff'> The Results Mathed <Typography sx={{fontSize: '1.5rem'}} component='span' color='secondary.main'>"{query}"</Typography> </Typography>
                : ''
                }
                {query ?
                <Grid container className={classes.container}>
                    <Shelf books={results} search={true} updateShelf={updateShelf}/>
                </Grid>
                : ''}
            </div>
        </div>
    );
};

Search.propTypes = {
    updateShelf: PropTypes.func.isRequired
};

export default React.memo(Search);