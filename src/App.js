import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Observation from './components/Observation'
import DetailsCas from "./components/DetailsCas";
import DetailsTemoignage from './components/DetailsTemoignages'

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/observation/" exact component={Observation} />
                    <Route path="/observation/cas/:_id" exact component={DetailsCas} />
                    <Route path="/observation/temoignage/:_id" exact component={DetailsTemoignage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
