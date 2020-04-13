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

    handleInputChange = event => {
        this.setState({ motCle: event.target.value });
    };

    handleDuDateChange = duDate => {
        this.setState({ duDate: duDate });
    };
    handleAuDateChange = auDate => {
        this.setState({ auDate: auDate });
    };

    handleRadioChange = event => {
        if (this.state.classe.length === 0) {
            this.state.classe.push(event.target.value);
        } else {
            let i = 0;
            let exist = false;
            while (i < this.state.classe.length && exist === false) {
                if (this.state.classe[i] === event.target.value) {
                    exist = true
                } else {
                    i++;
                }
            }
            if (exist) {
                this.state.classe.splice(i, 1)
            } else {
                this.state.classe.push(event.target.value);
            }
        }
    };

    handleSelectChange = event => {
        this.setState({ reg: event.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const form = {
            motCle: this.state.motCle,
            duDate: this.state.duDate || "",
            auDate: this.state.auDate || "",
            classe: [],
            region: []
        };

        if (this.state.classe.length !== 0) {
            form.classe = this.state.classe
        }
        if (this.state.reg.length !== 0) {
            form.region = this.state.reg
        }

        let params = "";
        if (form.motCle !== "") {
            if (params !== "") params += "&"
            params += "motCle=" + form.motCle;
        }
        if (form.duDate !== "") {
            if (params !== "") params += "&"
            params += "cas_date_du=" + form.duDate.getFullYear() + "-" + (form.duDate.getMonth() + 1) + "-" + form.duDate.getDate();
        }
        if (form.auDate !== "") {
            if (params !== "") params += "&"
            params += "cas_date_au=" + form.auDate.getFullYear() + "-" + (form.auDate.getMonth() + 1) + "-" + form.auDate.getDate();
        }
        if (form.classe.length !== 0) {
            if (params !== "") params += "&"
            params += "cas_classification=";
            for (let i = 0; i < form.classe.length -1 ; i++) {
                params += form.classe[i] + ",";
            }
            params += form.classe[form.classe.length - 1]
        } else {
            if (params !== "") params += "&"
            params += "cas_classification=TOUS";
        }
        if (form.region.length !== 0) {
            if (params !== "") params += "&"
            params += "cas_zone_nom=";
            for (let i = 0; i < form.region.length - 1; i++) {
                params += form.region[i] + ",";
            }
            params += form.region[form.region.length - 1]
        }
        this.props.history.push('/observation/' + params);
    };

    render() {
        return (
            <div style={{ margin: "50px 50px" }}>
                <Paper>
                    <FormControl>
                        <FormControl>
                            <FormLabel>Recherche par mot clé du résumé</FormLabel>
                            <TextField id="standard-basic" label="Mot clé du résumé" onChange={this.handleInputChange} />
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
                                        onChange={this.handleDuDateChange}
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
                                        onChange={this.handleAuDateChange}
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
                                    onChange={this.handleRadioChange}
                                />
                                <FormControlLabel
                                    value="B"
                                    control={<Checkbox color="primary" />}
                                    label="B"
                                    labelPlacement="top"
                                    onChange={this.handleRadioChange}
                                />
                                <FormControlLabel
                                    value="C"
                                    control={<Checkbox color="primary" />}
                                    label="C"
                                    labelPlacement="top"
                                    onChange={this.handleRadioChange}
                                />
                                <FormControlLabel
                                    value="D"
                                    control={<Checkbox color="primary" />}
                                    label="D"
                                    labelPlacement="top"
                                    onChange={this.handleRadioChange}
                                />
                                <FormControlLabel
                                    value="D1"
                                    control={<Checkbox color="primary" />}
                                    label="D1"
                                    labelPlacement="top"
                                    onChange={this.handleRadioChange}
                                />
                                <FormControlLabel
                                    value="D2"
                                    control={<Checkbox color="primary" />}
                                    label="D2"
                                    labelPlacement="top"
                                    onChange={this.handleRadioChange}
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
                                onChange={this.handleSelectChange}
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
