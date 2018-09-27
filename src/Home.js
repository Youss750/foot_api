import React, { Component } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import _ from 'lodash';
class Home extends Component {
  constructor(props){
    super(props);
      this.state = {
        rencontre: [],
        widgetDate:[],
      };
    }
  componentDidMount(){
  var config = {headers : { 'X-Auth-Token': '563f952786d742e3bb86cb53180730ec' }}
  axios.get("http://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED", config)
   .then((res) => {
    var dates = [];
    var result = res.data.matches.map((matche,index)=> { 
    return this.displayDate(index, matche, dates)
    })
    var widget = dates.map((widget, index) =>{
      return <button type="button" className="btn btn-secondary">{widget}</button>
    })
    this.setState({widgetDate: widget})
    this.setState({rencontre: result})
   })
  }
  displayDate(index, matche, dates){
    if (dates.indexOf(this.returnDate(matche.utcDate)) !== -1) {
        return (
          <div key={index} id={matche.id} className="col-12">
            <div className="nextMatch">
            <table className="table col-12">
              <tbody>
                {this.nextMatch(matche)}
              </tbody>
            </table>
            </div>
          </div>
          )
      } else {
        dates.push(this.returnDate(matche.utcDate))
        return (
          <div key={index} id={matche.id} className="col-12">
            <h4 className="text-center date-foot">{_.upperFirst(this.returnDate(matche.utcDate))}</h4>
            <div className="nextMatch">
              <table className="table col-12">
                <tbody>
                  {this.nextMatch(matche)}
                </tbody>
              </table>
          </div>
        </div>
        )
      }
  }
  returnHours(matche){
    var date = new Date(matche)
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var test = `${hours}:${minutes}`
    return test.toString()
  }
  nextMatch(matche){
    return(
      <tr>
        <td className="right">
        <div className="date-status">
        <span>{this.returnHours(matche.utcDate)}</span>
        </div>
          <Link to={{
            pathname: "/team/" + matche.homeTeam.id
          }}>
            {matche.homeTeam.name}
            </Link>
        </td>
        <td>
          vs
        </td>
        <td className="left">
          <span className="padl">
          <Link to={{
            pathname: "/team/"+ matche.awayTeam.id
          }}>
            {matche.awayTeam.name}
          </Link>
          </span>
        </td>
      </tr>
    )
  }
  returnDate(matche){
    var date = new Date(matche)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options)
  }
  render() {
    return (
      <div>
        <div className="btn-group-vertical position-fixed">
        {this.state.widgetDate}
        </div>
        <div>
            {this.state.rencontre}
        </div>
      </div>
      );
  }
}

export default Home;