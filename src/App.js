import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Search'
import Observation from './components/Observation'
import DetailsCas from "./components/DetailsCas";
import DetailsTemoignage from './components/DetailsTemoignages'
import Statistiques from "./components/Statistiques";
import About from "./components/About";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/observation/:params" exact component={Observation} />
                    <Route path="/observation/cas/:_id" exact component={DetailsCas} />
                    <Route path="/observation/temoignage/:_id" exact component={DetailsTemoignage} />
                    <Route path="/statistique/" exact component={Statistiques} />
                    <Route path="/about/" exact component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
