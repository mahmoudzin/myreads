import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import { List, ListItem, ListItemIcon, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LayersIcon from '@mui/icons-material/Layers';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AddBoxIcon from '@mui/icons-material/AddBox';


const useStyles = makeStyles((theme)=> ({
    sidebar:{
        backgroundColor: theme.palette.background.paper,
        height: '100vh',
        padding: '0 0 0 10px !important',
        position: 'sticky',
        top:0
    },
    listItem:{
        cursor: 'pointer',
        padding: '10px 15px !important',
        transition: 'all 0.5s',
        '&:hover':{
            backgroundColor: theme.palette.background.default,
            borderTopLeftRadius: '50px', 
            borderBottomLeftRadius: '50px', 
        }
    },
    text:{
        [theme.breakpoints.down('sm')]:{
            display: 'none',
        }
    },
    icon:{
        color: `${theme.palette.secondary.main} !important`,
        [theme.breakpoints.down('lg')]:{
            minWidth: '40px !important',
        }
    },
    active:{
        backgroundColor: theme.palette.background.default,
        borderTopLeftRadius: '50px', 
        borderBottomLeftRadius: '50px',
    }
}));


function Sidebar({ setShelf }) {
    const [activeShelf, setActiveShelf] = useState('All');
    const classes = useStyles();
    const active = classes.active;
    const listItem = classes.listItem;

    const handleClick = (shelf) =>{
        if(shelf) {
            setShelf(shelf);
            setActiveShelf(shelf);
        };
    };

    return (
        <Container className={classes.sidebar}>
            <List>
                <ListItem onClick={()=> handleClick('All')} className={`${listItem} ${activeShelf === 'All' && active}`}>
                    <ListItemIcon  className={classes.icon}>
                        <LayersIcon fontSize="small" />
                    </ListItemIcon> 
                    <Typography className={classes.text} variant="inherit" component='span'>All Shelves</Typography>
                </ListItem>
                <ListItem onClick={()=> handleClick('currentlyReading')} className={`${listItem} ${activeShelf === 'currentlyReading' && active}`}>
                    <ListItemIcon className={classes.icon}>
                        <AutoStoriesIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.text} variant="inherit">Reading</Typography>
                </ListItem>
                <ListItem onClick={()=> handleClick('wantToRead')} className={`${listItem} ${activeShelf === 'wantToRead' && active}`}>
                    <ListItemIcon className={classes.icon}>
                        <BookmarkOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.text} variant="inherit">To Read</Typography>
                </ListItem>
                <ListItem onClick={()=> handleClick('read')} className={`${listItem} ${activeShelf === 'read' && active}`}>
                    <ListItemIcon className={classes.icon}>
                        <BeenhereIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.text} variant="inherit">Read</Typography>
                </ListItem>
                <ListItem className={listItem}>
                    <Link to='search' style={{color: 'inherit', width: '100%', display: 'flex', textDecoration: 'none'}}>
                        <ListItemIcon className={classes.icon}>
                            <AddBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography className={classes.text} variant="inherit">Add New</Typography>
                    </Link>
                </ListItem>
            </List>
        </Container>  
    );
};

Sidebar.propTypes = {
    setShelf: PropTypes.func.isRequired
};

export default React.memo(Sidebar);