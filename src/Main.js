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

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <div className="container">
        <h1 className="text-center text-light title-foot"><a href="/">Résultat Foot</a></h1>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/team/:id" component={Team} />
      </React.Fragment>
    </BrowserRouter>
    );
  }
}
 
export default Main;