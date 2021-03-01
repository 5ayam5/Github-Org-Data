import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var org, repoC, commC;

class Org extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    org = evt.target.value;
  }
}

class RepoC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '1'
    };
  }

  render() {
    return (
      <input type="number" min="1" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    repoC = evt.target.value;
  }
}

class CommC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '1'
    };
  }

  render() {
    return (
      <input type="number" min="1" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    commC = evt.target.value;
  }
}

class Submit extends React.Component {
  render() {
    return (
      <button>Query</button>
    )
  }
}

class Query extends React.Component {
  render() {
    return (
      <div className="query">
        <form>
          <Org />
          <RepoC />
          <CommC />
          <Submit />
        </form>
      </div>
    )
  }
}

class Root extends React.Component {
  render() {
    return (
      <div className="document">
        <Query />
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
