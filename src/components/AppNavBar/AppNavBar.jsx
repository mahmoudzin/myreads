import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SwitchMode from './SwitchMode';

const AppNavBar = ({ toggleColorMode }) => {
  return (
      <AppBar position="static">
          <Toolbar sx={{justifyContent: 'space-between'}}>
              <Typography
                variant="h6"
                noWrap
                component="div"
              >
                <Link to='' style={{color:'inherit', textDecoration: 'none'}} >
                  My Reads
                </Link>
            </Typography>
            <SwitchMode {...{ toggleColorMode }}/>
        </Toolbar>
      </AppBar>
  );
};

AppNavBar.propTypes = {
  toggleColorMode: PropTypes.func.isRequired
};

export default React.memo(AppNavBar);