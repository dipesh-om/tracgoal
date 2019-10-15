import React, { Component } from 'react'
import './App.css';
import Fileread from './components/Fileread';
// eslint-disable-next-line
import Mapplot from './components/Mapplot'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gpslatLong: [[31.708401, 76.932198], [31.708401, 75.932198]]
    };
  }
  myCallback = (dataFromChild) => {
    this.setState({ gpslatLong: dataFromChild });
  }

  render() {
    console.log(this.state.gpslatLong)
    return (
      <div>
        <Fileread callbackFromParent={this.myCallback} />
        <Mapplot latlong={this.state.gpslatLong} />
      </div>
    )
  }
}

export default App;