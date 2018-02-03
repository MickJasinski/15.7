function pad0(value) {                                     // This turns a 'value' to string
  let result = value.toString();                           // and ensures that
  if (result.length < 2) {                                 // stopwatch format.
    result = "0" + result;
  }
  return result;
}

class Stopwatch extends React.Component {                 // STOPWATCH class

  constructor(display) {                                  // This sets an initial state
    super(display);

    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      results: [],
      watch: null
    };
  }

  format(times) {                                         // Displays time
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
            Math.floor(times.miliseconds)
        )}`;
  }
  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      });
    }
  }
  step() {                                                 // THE CLOCKWORK
    let miliseconds = this.state.times.miliseconds;        
    let seconds = this.state.times.seconds;
    let minutes = this.state.times.minutes;

    miliseconds++;

    if (miliseconds >= 100) {                             // this instruction generates
      seconds += 1;                                       // seconds out of miliseconds
      miliseconds = 0;
    }

    if (seconds >= 60) {                                  // this instruction generates
      minutes += 1;                                       // minutes out od seconds
      seconds = 0;
    }

    this.setState({                                       // this holds an acctual time
      times: {                                            // in real time
        miliseconds,
        seconds,
        minutes
      }
    });
  }

  stop() {                                                // STOP function
    clearInterval(this.state.watch);
    this.setState({
      running: false,
      watch: null,
      results: [...this.state.results, this.format(this.state.times)]
    });
  }

  reset() {                                               // RESET function
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  resetList() {                                           // RESET LIST function
    this.setState({
      results: []
    });
  }

  renderTime(currentTime, key){
    return (<li key={key}>{currentTime}</li>)
  }

  render(){
    return (
      <div>
        <nav className="controls">
          <a href="#" className="button" id="start" onClick={this.start.bind(this)}><i className="fa fa-play"></i></a>
          <a href="#" className="button" id="stop" onClick={this.stop.bind(this)}><i className="fa fa-stop"></i></a>
          <a href="#" className="button" id="reset" onClick={this.reset.bind(this)}><i className="fas fa-sync-alt"></i></a>
          <span className="reset-list"><a href="#" className="button" id="resetlisty" onClick={this.resetList.bind(this)}><i className="fa fa-file"></i></a></span>
        </nav>
        <div className="display">
          <div className="stopwatch">{this.format(this.state.times)}</div>
          <ul className="results">
            <h3>Results</h3>
            {this.state.results.map( (time, key) => this.renderTime(time, key))}
          </ul>
        </div>
      </div>
        )
    }
}

ReactDOM.render( < Stopwatch / > , document.getElementById("app"));