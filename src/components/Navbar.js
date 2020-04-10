import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

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
              <Grid item xs={2}>
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
              </Grid>
              <Grid item xs={8}>
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
