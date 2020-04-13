import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Statistiques extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData:{
                labels: ['Phénomènes Parfaitements Identifiés', 'Phénomènes Problablement Identifiés', 'Phénomènes Non Identifiables (manque de données)',
                    'Phénomènes Non Identifiés (après enquête)'],
                datasets: [
                    {
                        label:'Pourcentage',
                        data:[
                            22,
                            40.5,
                            34,
                            3.5
                        ],
                        backgroundColor:[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#48FD00',
                        ]
                    }
                ],
            }
        }

    }

    render() {
        return(
            <div>
                <h1>Statistiques descriptives des données</h1>
                <Pie data={this.state.pieData} height={75}
                options={{
                    title:{
                        display:true,
                        text:'Répartition des cas d observations par type',
                        fontsize:25
                    },
                    legend:{
                    display:true,
                }
            }}/>
            <br/>
                <Bar data={this.state.pieData} height={75}
                     options={{
                         title:{
                             display:true,
                             text:'Répartition des cas d observations par région',
                             fontsize:25
                         },
                         legend:{
                             display:false
                         }
                     }}/>
            </div>
        )
        }
    }
