import React, { Component } from 'react';
import { VictoryBar } from 'victory';
import './App.css';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Moodies</h1>
        </header>
        <p className="App-intro">
          To get started, upload your iMessages file!
        </p>
        <VictoryBar
          data = {data}
          x="quarter"
          y="earnings"
        />
      </div>
    );
  }
}

export default App;
