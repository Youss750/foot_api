import React, { Component } from "react";
import axios from 'axios';
import _ from 'lodash';
class Team extends Component {
  constructor(props){
    super(props);
    this.state = {
      team: [],
      competitions: [],
      squad: [],
    };
  }
  componentDidMount(){
    var config = {headers : { 'X-Auth-Token': 'b1a6479e38d94529bb521a94e0ab15cf' }}
    axios.get("http://api.football-data.org/v2/teams/" + this.props.match.params.id, config)
    .then((res) =>{
      var competition = res.data.activeCompetitions.map((competition, index)=> 
        <span key={index}>{competition.name} </span>
      )
      var sortByPosition = _.sortBy(res.data.squad, [{position : "Attacker"}, {position : "Midfielder"}, {position : "Defender"}, {position: "Goalkeeper"}])
      var squad = _.sortBy(this.allSquad(sortByPosition))
      this.setState({team :res.data})
      this.setState({competitions : competition})
      this.setState({squad : squad})

    })
  }
  allSquad(res){
    return(
      res.map((squad, index) =>{
          return (
            <tr key={index}>
              <td>{squad.name}</td>
              <td>{this.returnDate(squad.dateOfBirth)}</td>
              <td>{squad.nationality}</td>
              {this.detectCoach(squad)}
            </tr>
          )
      })
    )
  }
  detectCoach(squad){
    if (squad.position === null){
      return <td>{squad.role}</td>
    } else{
      return <td>{squad.position}</td>
    }
  }
  returnDate(matche){
    var date = new Date(matche)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options)
  }
  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
            <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Equipe</a>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="card-body">
              <div className="row">
                <img height="200" className="col-md-3" src={this.state.team.crestUrl}/>
                <hr/>
                <div className='col-md-9 border-left'>
                  <h5 className="card-title text-left">{this.state.team.name}</h5>
                  <hr></hr>
                  <div className="text-left">
                    <p className="card-text"><b>Fondation</b> : {this.state.team.founded}</p>
                    <p className="card-text"><b>Stade</b> : {this.state.team.address}</p>
                    <p className="card-text"><b>Joue en : </b>
                    {this.state.competitions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Prénom et Nom</th>
              <th scope="col">Date de naissance</th>
              <th scope="col">Nationalité</th>
              <th scope="col">Poste</th>
            </tr>
          </thead>
          <tbody>
              {this.state.squad}
          </tbody>
      </table>
        </div>
        </div>
      </div>
      );
    }
  }
  
  export default Team;