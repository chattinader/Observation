import 'date-fns';
import React, { Component } from 'react';
import './../App.css'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            motCle: "",
            duDate: Date().getDate,
            auDate: Date().getDate,
            classe: [],
            reg: [],
            regions: [
                "Auvergne-Rhône-Alpes",
                "Bourgogne-Franche-Comté",
                "Bretagne",
                "Centre-Val de Loire",
                "Corse",
                "Grand Est",
                "Hauts-de-France",
                "Île-de-France",
                "Normandie",
                "Nouvelle-Aquitaine",
                "Occitanie",
                "Pays de la Loire",
                "Provence-Alpes-Côte d'Azur",
                "Outre-Mer"
            ]
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.history.push('/observation');
    };

    render() {
        return (
            <div style={{ margin: "50px 50px" }}>
                <Paper>
                    <FormControl>
                        <FormControl>
                            <FormLabel>Recherche par mot clé du résumé</FormLabel>
                            <TextField id="standard-basic" label="Mot clé du résumé"/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Recherche par date</FormLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-evenly">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="duDate"
                                        label="Du"
                                        value={this.state.duDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change duDate',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="auDate"
                                        label="Au"
                                        value={this.state.auDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change auDate',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Recherche par classe</FormLabel>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="A"
                                    control={<Checkbox color="primary" />}
                                    label="A"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="B"
                                    control={<Checkbox color="primary" />}
                                    label="B"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="C"
                                    control={<Checkbox color="primary" />}
                                    label="C"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="D"
                                    control={<Checkbox color="primary" />}
                                    label="D"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="D1"
                                    control={<Checkbox color="primary" />}
                                    label="D1"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="D2"
                                    control={<Checkbox color="primary" />}
                                    label="D2"
                                    labelPlacement="top"
                                />
                            </FormGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Recherche par région</FormLabel>
                            <InputLabel id="demo-simple-select-label">Région</InputLabel>
                            <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                multiple
                                value={this.state.reg}
                                input={<Input />}
                            >
                                {this.state.regions.map(region => (
                                    <MenuItem key={region} value={region}>
                                        {region}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button id="btn" onClick={this.handleSubmit}>Soumettre</Button>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}
