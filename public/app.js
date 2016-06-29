const PanagramDashboard = React.createClass ({
  getInitialState: function () {
    return {
      pangram: "Are you ready to give it a shot?",
      iterations: "0"
    };
  },
  handleSolveClick: function(){
    let solvedPangram = helpers.solve();
    let iterations = helpers.getIterations();
    this.setState({
      pangram: solvedPangram,
      bigIterations: iterations.bigIterations,
      smallIterations: iterations.smallIterations
    })
  },
  render: function() {
    return (
        <div>
            <button
              onClick={this.handleSolveClick}>
              Solve
            </button>
            <p><i>
              {this.state.pangram}
            </i></p>
            <b>
            iterations: {this.state.iterations}
            </b>
        </div>
    );
  },
});

ReactDOM.render(
  <PanagramDashboard />,
  document.getElementById('content')
);
