import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.callTestRoute()
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  callTestRoute = async () => {
    console.log("Test Route")
    const response = await fetch('/api/test')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {this.state.data}
          </p>
        </header>
      </div>
    )
  }
}

export default App;
