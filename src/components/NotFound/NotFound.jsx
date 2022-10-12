import React from 'react';
import { makeStyles } from '@mui/styles';
import NotFoundImg from './NotFoundImg.png';

const useStyles = makeStyles((theme)=> ({
    backgroundImg: {
        background: `url(${NotFoundImg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
    },
}));

const NotFound = () => {
    const classes = useStyles(); 
    return <div className={classes.backgroundImg}></div>
};

export default React.memo(NotFound);