"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
  // This turns a 'value' to string
  var result = value.toString(); // and ensures that
  if (result.length < 2) {
    // stopwatch format.
    result = "0" + result;
  }
  return result;
}

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  // STOPWATCH class

  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, display)); // This sets an initial state


    _this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      results: [],
      watch: null
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "format",
    value: function format(times) {
      // Displays time
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true,
          watch: setInterval(function () {
            return _this2.step();
          }, 10)
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      // THE CLOCKWORK
      var miliseconds = this.state.times.miliseconds;
      var seconds = this.state.times.seconds;
      var minutes = this.state.times.minutes;

      miliseconds++;

      if (miliseconds >= 100) {
        // this instruction generates
        seconds += 1; // seconds out of miliseconds
        miliseconds = 0;
      }

      if (seconds >= 60) {
        // this instruction generates
        minutes += 1; // minutes out od seconds
        seconds = 0;
      }

      this.setState({ // this holds an acctual time
        times: { // in real time
          miliseconds: miliseconds,
          seconds: seconds,
          minutes: minutes
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      // STOP function
      clearInterval(this.state.watch);
      this.setState({
        running: false,
        watch: null,
        results: [].concat(_toConsumableArray(this.state.results), [this.format(this.state.times)])
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      // RESET function
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: "resetList",
    value: function resetList() {
      // RESET LIST function
      this.setState({
        results: []
      });
    }
  }, {
    key: "renderTime",
    value: function renderTime(currentTime, key) {
      return React.createElement(
        "li",
        { key: key },
        currentTime
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            { href: "#", className: "button", id: "start", onClick: this.start.bind(this) },
            React.createElement("i", { className: "fa fa-play" })
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "stop", onClick: this.stop.bind(this) },
            React.createElement("i", { className: "fa fa-stop" })
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "reset", onClick: this.reset.bind(this) },
            React.createElement("i", { className: "fas fa-sync-alt" })
          ),
          React.createElement(
            "span",
            { className: "reset-list" },
            React.createElement(
              "a",
              { href: "#", className: "button", id: "resetlisty", onClick: this.resetList.bind(this) },
              React.createElement("i", { className: "fa fa-file" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "display" },
          React.createElement(
            "div",
            { className: "stopwatch" },
            this.format(this.state.times)
          ),
          React.createElement(
            "ul",
            { className: "results" },
            React.createElement(
              "h3",
              null,
              "Results"
            ),
            this.state.results.map(function (time, key) {
              return _this3.renderTime(time, key);
            })
          )
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("app"));
