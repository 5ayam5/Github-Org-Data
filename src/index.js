import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      org: '',
      commC: '1',
      repoC: '1',
      list: []
    }
  }

  render() {
    return (
      <div className="document">
        <div className="query" onSubmit={this.handleSubmit.bind(this)}>
          <form>
            <input type="text" value={this.state.org} onChange={this.updateOrg.bind(this)} />
            <input type="number" min="1" max="100" value={this.state.repoC} onChange={this.updateRepoC.bind(this)} />
            <input type="number" min="1" max="100" value={this.state.commC} onChange={this.updateCommC.bind(this)} />
            <button>Query</button>
          </form>
        </div>
        <div className="result">
          <ol>
            {this.state.list.map((repo, index) => (
              <li key={index}>
                <a href={repo.url}>{repo.name}</a> ({repo.forks} forks)
                <ul>
                  {repo.contributors && (repo.contributors).map((contributor, idx) => (
                    <li key={idx}><a href={contributor.url}>{contributor.name}</a> ({contributor.contributions} contributions)</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  updateOrg(event) {
    this.setState({ org: event.target.value })
  }
  updateRepoC(event) {
    this.setState({ repoC: event.target.value })
  }
  updateCommC(event) {
    this.setState({ commC: event.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://api.github.com/orgs/' + this.state.org + '/repos?per_page=100').then(response => response.json()).then(response => this.displayResults(response));
  }

  displayResults(arr) {
    try {
      arr.sort(function (a, b) {
        return b.forks_count - a.forks_count;
      });
    } catch (err) {
      alert("Error in retrieving data, please try again");
      return;
    }
    arr = arr.slice(0, this.state.repoC);
    let ret = [];
    arr.forEach(repo => {
      let temp = {
        name: repo.name,
        url: repo.svn_url,
        forks: repo.forks,
        contributors: []
      };
      try {
        fetch(repo.contributors_url + '?per_page=' + this.state.commC).then(response => response.json()).then(response => response.forEach(contributor => {
          temp.contributors.push({
            name: contributor.login,
            url: contributor.html_url,
            contributions: contributor.contributions
          })
        })).then(response => ret.push(temp)).then(response => this.setState({ list: ret }));
      } catch (err) {
        this.setState({ list: ret });
      }
    });
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
