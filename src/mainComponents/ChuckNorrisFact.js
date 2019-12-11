import React, { Component } from 'react'
import axios from 'axios'

export class ChuckNorrisFact extends Component {
  constructor(props) {
    super(props)
    //initialize the state with a placeholder fact so its not empty on page load
    this.state = {
      fact: 'Chuck Norris can text using his walkie talkie and without batteries.'
    }
  }
  //fetch a random Chuck quote and store it in state
  getFact = () => {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(response => {
      this.setState({fact: response.data.value});
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="chuck-container">
        <p>There are no commits for this repo in the last 24 hours</p>
        <p>Please enjoy a Chuck Norris fact instead!</p>
        <div className="quote-block">
          <h3>{'"' + this.state.fact + '"'}</h3>
          <button type="button" 
            className="quote-button"
            onClick={this.getFact}>
            More Chuck Facts!
          </button>
        </div>
      </div>
    )
  }
}

export default ChuckNorrisFact
