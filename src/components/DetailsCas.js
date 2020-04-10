import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class DetailsCas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cas: [],
            temoignages: []
        }
    }

    getCasById(id) {
        fetch('http://localhost:8080/api/cas/' + id)
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.setState({
                    cas: res.cas
                })
                this.getTemoignagesByCasId(this.state.cas.id_cas)
            }).catch(err => {
                console.log("Erreur dans le get: " + err)
            });
    }

    componentDidMount() {
        this.getCasById(this.props.match.params._id);
    }

    render() {
        return(
            <div style={{ margin: "50px 50px" }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <List>
                            <ListSubheader component="div" id="nested-list-subheader">
                                {this.state.cas.cas_nom_dossier}
                            </ListSubheader>
                            <ListItem>
                                <ListItemText primary="Observé le" secondary={this.state.cas.cas_date} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Région" secondary={this.state.cas.cas_zone_nom} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Résumé" secondary={this.state.cas.cas_resume_web} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Description" secondary={this.state.cas.cas_resume} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Compte rendu" secondary="Aucun" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <List>
                            <ListItem>
                                <ListItemText primary="Document(s)" secondary="0" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Nb Temoignages" secondary={this.state.cas.cas_temoignages_nb} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        )
    }

}