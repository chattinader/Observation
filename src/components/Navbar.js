import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      back: false,
      oldUrl: ""
    }
  }

  isBackOn(url) {
    if (url === "/") {
      this.setState({
        back: false
      })
    } else {
      this.setState({
        back: true
      })
    }
  }

  componentDidMount() {
    let url = window.location.pathname
    this.setState({
      oldUrl: url
    })
    this.isBackOn(url)
    setInterval(() => {
      if (window.location.pathname !== url) {
        this.setState({
          oldUrl: url
        })
        url = window.location.pathname
        this.isBackOn(url)
      }
    }, 500)
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ background: '#282c34' }}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Tooltip title="Search" aria-label="Search
                    ">
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        style={{ marginRight: 5 }}
                      >
                        <Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>
                          <SearchTwoToneIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Stats" aria-label="Stats">
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
                    </Tooltip>

                    <Tooltip title="About" aria-label="About">
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
                    </Tooltip>

                    {this.state.back ? (
                      <Tooltip title="Back" aria-label="Back">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          style={{ marginRight: 5 }}
                        >
                          <Link to={this.state.oldUrl} style={{ textDecoration: 'none', color: 'white' }}>
                            <ArrowBackIcon />
                          </Link>
                        </IconButton>
                      </Tooltip>
                      ) : (
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          style={{ marginRight: 5 }}
                        >
                          <Link to={``} style={{ textDecoration: 'none', color: 'transparent' }}>
                            <ArrowBackIcon />
                          </Link>
                        </IconButton>
                      )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <IconButton>
                  <Typography variant="h6" noWrap style={{ color: 'white' }}>
                    Observation
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
