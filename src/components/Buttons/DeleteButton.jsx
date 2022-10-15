import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({ book, setBookToUpdateShelf, setShelfToUpdate, bookUpdated}) {
    
    const handleClick = ()=> {
        setBookToUpdateShelf(book);
        setShelfToUpdate('none');
    }
    return (
        <div>
            <Button 
                onClick={handleClick} 
                sx={{minWidth: '150px'}} 
                variant="contained" 
                color="error" 
                startIcon={<DeleteIcon />}>
                    {bookUpdated ? 'Delete' : 'wait...'}
            </Button>
        </div>
    );
};

DeleteButton.propTypes = {
    setShelf: PropTypes.func.isRequired,
    bookUpdated: PropTypes.bool.isRequired
};

export default React.memo(DeleteButton);