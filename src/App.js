import React, { Fragment, Component } from "react";
import "./App.css";
//Let's import {Browserouter, Switch, Route }
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Let's import axios
import axios from "axios";
//import Components
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {
  //App State
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClear: false,
    alert: null
  };

  //SearchUsers Function
  searchUsers = async text => {
    //set loading to true
    this.setState({ loading: true });
    //get users
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //set loading to false
    this.setState({ users: res.data.items, loading: false, showClear: true });
  };

  //GetUser
  getUser = async username => {
    //Set Loading to true
    this.setState({ loading: true });
    //Get User
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Set user and loading to false
    this.setState({ user: res.data, loading: false });
  };

  //Get User Repos
  getUserRepos = async username => {
    //Set loading to true
    this.setState({ loading: true });
    //Get User Repos
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=7&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Set repos and loading to false
    this.setState({ repos: res.data, loading: false });
  };

  //ClearUsers Function
  clearUsers = () =>
    this.setState({ users: [], loading: false, showClear: false });

  //SetAlert Function
  setAlert = (type, msg) => {
    this.setState({ alert: { type, msg }, loading: false });
    //setTimeout
    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Alert alert={this.state.alert} />
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.showClear}
                      setAlert={this.setAlert}
                    />

                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    loading={this.state.loading}
                    user={this.state.user}
                    repos={this.state.repos}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                  />
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
