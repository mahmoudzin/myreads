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
    const [bookUpdated, setBookUpdate] = useState(true);
    const [bookToUpdateShelf, setBookToUpdateShelf] = useState(null);
    const [shelfToUpdate, setShelfToUpdate] = useState('');

    const filterBooks = useMemo(() => {
      if(shelf === 'All')
          return books;
      else 
          return books.filter(book => book.shelf === shelf);
  }, [shelf, books]);    
   

    const sendTheBookNeedToUpdateShelf =  useCallback(async() => {
      if(bookToUpdateShelf && shelfToUpdate) {
          setBookUpdate(false);
          await update(bookToUpdateShelf, shelfToUpdate);
          setBookUpdate(true);
        }
    }, [bookToUpdateShelf, shelfToUpdate]);


    useEffect(()=>{
        const getAllBooksFromApi = async ()=>{
          const res = await getAll();
          setBooks(res);
        }
        const getBooks = async ()=>{
          await sendTheBookNeedToUpdateShelf();
          await getAllBooksFromApi(); 
        }
        getBooks()   
      }, [sendTheBookNeedToUpdateShelf]);

  return (
    <>
      <AppNavBar {...{ toggleColorMode }}/>
      <Routes>
        <Route path='' element={ <Home {...{setShelf, shelf, books, setBookToUpdateShelf, setShelfToUpdate, filterBooks, bookUpdated}}/> }/>
        <Route path='search' element={ <Search setBookToUpdateShelf={setBookToUpdateShelf} setShelfToUpdate={setShelfToUpdate} books={books}/>}/>
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
    </>
  );
};

export default App;
