import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Statistiques extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: {
                labels: ['Phénomènes Parfaitements Identifiés', 'Phénomènes Problablement Identifiés', 'Phénomènes Non Identifiables (manque de données)',
                    'Phénomènes Non Identifiés (après enquête)'],
                datasets: [
                    {
                        label: 'Pourcentage',
                        data: [
                            22,
                            40.5,
                            34,
                            3.5
                        ],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#48FD00',
                        ]
                    }
                ],
            },
            barData: {
                labels: [
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
                ],
                datasets: [
                    {
                    }
                ]
            }
        }

    }

    getCountbyRegion(){
        let url = 'http://localhost:8080/api/countRegion'
                + '?regions=' + this.state.barData.labels
            fetch(url)
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        barData: {
                            datasets: [
                                {
                                    label: 'Nombre de cas',
                                    data: res.count,
                                    backgroundColor: 'rgba(255,99,132,0.2)'
                                }
                            ]
                        }
                    })
                })
    }

    componentDidMount() {
        this.getCountbyRegion()
    }

    render() {
        return (
            <div>
                <h1>Statistiques descriptives des données</h1>
                <Pie data={this.state.pieData} height={75}
                     options={{
                         title: {
                             display: true,
                             text: 'Répartition des cas d observations par type',
                             fontsize: 25
                         },
                         legend: {
                             display: true,
                         }
                     }}/>
                <br/>
                <br/>
                <Bar data={this.state.barData} height={75}
                     options={{
                         title: {
                             display: true,
                             text: 'Répartition des cas d observations par région',
                             fontsize: 25
                         },
                         legend: {
                             display: true
                         }
                     }}/>
            </div>
        )
    }
}
