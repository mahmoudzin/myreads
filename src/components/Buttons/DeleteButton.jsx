import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({ setShelf, bookUpdated }) {
    return (
        <div>
            <Button 
                onClick={()=> setShelf('none')} 
                sx={{minWidth: '200px'}} 
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