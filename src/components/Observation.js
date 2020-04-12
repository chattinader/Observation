import React, { Component } from 'react';
import MaterialTable from "material-table";
const queryString = require('query-string');

export default class Observation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cas: [],
            count: 0,
            page: 0,
            pagesize: 0,
            dataTable: []
        }
    }

    renderDataTable() {
        let newDataTable = []
        this.state.cas.map((el, index) => {
            let data = {
                _id: el._id,
                casName: el.cas_nom_dossier,
                casDate: el.cas_date,
                departement: el.cas_zone_nom,
                classe: el.cas_classification
            }
            newDataTable.push(data)
            return newDataTable
        })
        this.setState({
            dataTable: newDataTable
        })
    }

    handleDetailRow(_id) {
        this.props.history.push('/observation/cas/' + _id);
    }

    render() {
        return (
            <div style={{ margin: "50px 50px 0px 50px" }}>
                <MaterialTable
                    columns={[
                        //{ title: "ID", field: "_id" },
                        { title: "Nom du cas", field: "casName" },
                        { title: "Date", field: "casDate" },
                        { title: "Département", field: "departement" },
                        { title: "Classe", field: "classe" }
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                            let url = 'http://localhost:8080/api/filteredCas'
                                + '?form=' + JSON.stringify(queryString.parse(this.props.match.params.params))
                                + '&pagesize=' + query.pageSize
                                + '&page=' + (query.page + 1)
                            fetch(url)
                                .then(response => response.json())
                                .then(res => {
                                    let newCas = [];
                                    res.data.forEach((el) => {
                                        newCas.push(el);
                                    });
                                    this.setState({
                                        cas: newCas,
                                        count: res.count,
                                        page: res.page - 1,
                                        pagesize: res.pagesize
                                    });
                                    this.renderDataTable()
                                    resolve({
                                        data: this.state.dataTable,
                                        page: this.state.page,
                                        totalCount: this.state.count,
                                    })
                                })
                        })
                    }
                    title="Résultats"
                    onRowClick={(event, rowData) => { this.handleDetailRow(rowData._id) }}
                />
            </div>
        );
    }
}