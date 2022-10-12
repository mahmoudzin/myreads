import React, { useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getAll, update } from '../BooksAPI';
import { Routes, Route} from 'react-router-dom';
import { ColorModeContext } from "./ThemeContext/ThemeContext";
import AppNavBar from './AppNavBar/AppNavBar';
import Home from './Home/Home';
import Search from './Search/Search';
import NotFound from './NotFound/NotFound';

function App() {
    const { toggleColorMode } = useContext(ColorModeContext);
    const [books, setBooks] = useState(null);
    const [shelf, setShelf] = useState('All');
    const [bookUpdated, setBookUpdate] = useState(false);
    
    const filterBooks = useMemo(() => {
        if(shelf === 'All')
            return books;
        else 
            return books.filter(book => book.shelf === shelf);
    }, [shelf, books]);
    
    const getTheBookNeedToUpdateShelf = useCallback(async(book, shelf) => {
        
        setBookUpdate(false);
        
        await update(book, shelf);
        
        const data = await getAll();
        
        setBookUpdate(true);
        
        setBooks(data);
    
    }, []);

    useEffect(()=>{
        let isCancelled = false;    
        if(!isCancelled){
            const getAllBooksFromApi = async ()=>{
                const res = await getAll();
                setBooks(res);
            }    
            getAllBooksFromApi();
            setBookUpdate(true);
        }
    
        return ()=> isCancelled = true;

      }, []);

  return (
    <>
      <AppNavBar {...{ toggleColorMode }}/>
      <Routes>
        <Route path='' element={ <Home {...{setShelf, shelf, books, getTheBookNeedToUpdateShelf, filterBooks, bookUpdated}}/> }>
        </Route>
        <Route path='search' element={ <Search updateShelf={getTheBookNeedToUpdateShelf}/> }/>
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
    </>
  );
};

export default App;
