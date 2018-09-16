import React, { Component } from 'react';
import { VictoryLine } from 'victory';
import './App.css';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

var request = require('request');

request('http://localhost:8888/azure', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


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
        <VictoryLine
          interpolation="natural"
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 }
          ]}
        />
      </div>
    );
  }
}

export default App;
