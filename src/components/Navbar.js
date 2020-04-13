import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ background: '#282c34' }}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={3}>
               <Grid container spacing={2}>
                 <Grid item xs={6}>
                   <IconButton
                       edge="start"
                       color="inherit"
                       aria-label="open drawer"
                       style={{ marginRight: 5 }}
                   >
                     <Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>
                       <HomeIcon />
                     </Link>
                   </IconButton>
                   <IconButton
                       edge="start"
                       color="inherit"
                       aria-label="open drawer"
                       style={{ marginRight: 5 }}
                   >
                     <Link to={`/Statistique`} style={{ textDecoration: 'none', color: 'white' }}>
                       <EqualizerIcon />
                     </Link>
                   </IconButton>
                   <IconButton
                       edge="start"
                       color="inherit"
                       aria-label="open drawer"
                       style={{ marginRight: 5 }}
                   >
                     <Link to={`/About`} style={{ textDecoration: 'none', color: 'white' }}>
                       <InfoIcon />
                     </Link>
                   </IconButton>
                 </Grid>
               </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" noWrap>
                  Observation
            </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
