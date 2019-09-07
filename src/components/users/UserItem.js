import React, { Component } from "react";
//Let's import PropTypes
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UserItem extends Component {
  render() {
    const { login, avatar_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt="avatar"
          className="rounded-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div>
          <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
            More
          </Link>
        </div>
      </div>
    );
  }
}

//PropTypes
UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
