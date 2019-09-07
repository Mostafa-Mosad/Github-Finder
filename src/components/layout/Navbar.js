import React, { Component } from "react";
//Let's import PropTypes
import PropTypes from "prop-types";
//Let's import { Link }
import { Link } from "react-router-dom";

class Navbar extends Component {
  //Default PropTypes
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
  };

  //Coming Proptypes
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    const { title, icon } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon} /> {title}
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
