import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

class User extends Component {
  //PropTypes
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  //Get User
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  //render method
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      company,
      hireable
    } = this.props.user;
    const { loading } = this.props;

    //If still loading show Spinner else show userInfo
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-light">
            Back To Search
          </Link>
          Hireable:{" "}
          {hireable ? (
            <i className="fas fa-check text-success" />
          ) : (
            <i className="fas fa-times-circle text-danger" />
          )}
          <div className="card grid-2">
            <div className="all-center">
              <img
                src={avatar_url}
                className="rounded-img"
                alt="avatar"
                style={{ width: "150px" }}
              />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio:</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} className="btn btn-dark my-1">
                Vist Github Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong>
                      {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong>
                      {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>Website:</strong>
                      <a
                        href={blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0072C6" }}
                      >
                        {" "}
                        {blog}
                      </a>
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers:{followers}</div>
            <div className="badge badge-success">Following:{following}</div>
            <div className="badge badge-light">Public_Repos:{public_repos}</div>
            <div className="badge badge-dark">Public_Gists:{public_gists}</div>
          </div>
          <h1 className="text-center">Last 7 Public_Repos</h1>
          <Repos repos={this.props.repos} />
        </Fragment>
      );
    }
  }
}

export default User;
