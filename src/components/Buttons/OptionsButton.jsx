import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.primary.main === '#efe5da' ? '#fff' : '#000',
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.secondary.main,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const OptionsButtons = ({ shelf, setShelf, bookUpdated, search }) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [newShelf, setNewShelf] = useState('');
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShelvClick = (shelf) => {
    setNewShelf(shelf)
    setShelf(shelf);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        sx={{minWidth: '200px', margin: '10px 0'}}
        color='secondary'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {search ? newShelf ? newShelf : 'none' : bookUpdated ? shelf : "wait..."}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem id='currentlyReading' onClick={(e)=>handleShelvClick(e.currentTarget.id)} disableRipple>
          <AutoStoriesIcon />
          Currantly Reading
        </MenuItem>
        <MenuItem id='wantToRead' onClick={(e)=>handleShelvClick(e.currentTarget.id)} disableRipple>
          <BookmarkOutlinedIcon />
          Wont to Read
        </MenuItem>
        <MenuItem id='read' onClick={(e)=>handleShelvClick(e.currentTarget.id)} disableRipple>
          <BeenhereIcon />
          Read
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default React.memo(OptionsButtons);