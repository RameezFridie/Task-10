import React from 'react';
// import './App.css';

// import components
import Game from './components/Game'
import Rules from './components/Rules'
import Header from './components/Header';



class App extends React.Component {
  constructor(props) {
    // constructor to set which component is displayed
    super(props);
    // Setting initial state
    this.state = { comp: 0 };
  }
  render() {
    // Assign components to an array
    const comp = [<Game width={4} height={4}/>, <Rules/> ]
    return(
      <div className="App">
        <div>
          {/* Header component */}
          <Header/>
        </div>
        <div>
          {/* Select which component to display */}
          <select
          className="select"
          onChange = { e=> {
            this.setState({
              comp: e.target.value
            })
          }}
          >
            <option value="0">Game</option>
            <option value="1">Rules</option>

          </select>
          <hr/>
          {/* Display the component */}
          {comp[this.state.comp]}
        </div>
    </div>
    )
  }
}


export default App;
