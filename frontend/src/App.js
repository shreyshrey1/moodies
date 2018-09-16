import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import './App.css';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

var request = require('request');



class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true
    }

  }
  async componentDidMount() {
    return await fetch('http://localhost:8888/users/gettexts').then(res => res.json().then(
      json => {
        this.setState({
          data: json,
          loading: false
        })
      }
    )
    )}

  getData = () => {
    return fetch('http://localhost:8888/users/gettexts').then(res => res.json())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Moodies</h1>
        </header>
        <p className="App-intro">
          To get started, upload your iMessages file!
        </p>
        {this.state.loading ? <div>Loading</div> : 
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            interpolation="natural"
            data={this.state.data["documents"].map(el => {return {x: el["data"], y: el["score"]}})}
          />
        </VictoryChart>
        }
      </div>
    );
  }
}

export default App;
