import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class DetailsTemoignage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            temoignages: []
        }
    }

    getTemoignageById(id) {
        fetch('http://localhost:8080/api/temoignages/' + id)
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.setState({
                    temoignages: res.temoignage
                })
            }).catch(err => {
                console.log("Erreur dans le get: " + err)
            });
    }

    componentDidMount() {
        this.getTemoignageById(this.props.match.params._id);
    }

    render() {
        return (
            <div style={{ margin: "50px 50px" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper>
                            <List>
                                <ListSubheader>
                                    {this.state.temoignages.tem_nom_dossier}
                                </ListSubheader>
                                <ListItem>
                                    <ListItemText primary="Numéro d'étude" secondary={this.state.temoignages.cas_numEtude} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Date de l'observation" secondary={this.state.temoignages.obs_chrono} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <List>
                                <ListSubheader>
                                    Témoins
                                </ListSubheader>
                                <ListItem>
                                    <ListItemText primary="Numéro SEPRA" secondary={this.state.temoignages.tem_numSEPRA} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Numéro de catégorie" secondary={this.state.temoignages.tem_catno} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Age" secondary={this.state.temoignages.tem_age} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Profession" secondary={this.state.temoignages.tem_xp_activite_type} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Sexe" secondary={this.state.temoignages.tem_genre} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Réaction" secondary={this.state.temoignages.obs_1_tem_reaction_types} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <List>
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Conditions
                                </ListSubheader>
                                <ListItem>
                                    <ListItemText primary="Pays" secondary={this.state.temoignages.obs_1_adr_pays} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Commune" secondary={this.state.temoignages.obs_1_adr_commune} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Conditions météo" secondary={this.state.temoignages.obs_conditions_meteo} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Plage horaire de l'observation" secondary={this.state.temoignages.obs_heure_plage} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Cadre de référence" secondary={this.state.temoignages.obs_1_cadre_reference_type} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Psition GPS" secondary={"Latitude: " + this.state.temoignages.obs_1_lat + " | Longitude: " + this.state.temoignages.obs_1_lon} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Forme du phénomène" secondary={this.state.temoignages.obs_1_forme_lib} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Nature du phénomène" secondary={this.state.temoignages.obs_1_PAN_nature_type} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Caractéristique du phénomène" secondary={this.state.temoignages.obs_1_caracteristiques_types} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}