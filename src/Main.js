import React, { Component } from "react";
 import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Team from "./Team";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Stuff from "./Stuff";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1 className="text-center text-light title-foot">Résultat Foot</h1>
          <ul className="header">
             <li><NavLink to="/">Home</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={Home}/>
             <Route path="/team/:id" component={Team}/>
          </div>
        </div>
      </BrowserRouter>  
    );
  }
}
 
export default Main;