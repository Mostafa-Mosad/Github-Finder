import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  //Search State
  state = {
    text: ""
  };

  //onChange
  onChange = e => this.setState({ text: e.target.value });

  //onSubmit
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("light", "Please Enter Something !!!");
    } else {
      this.props.searchUsers(this.state.text);
      //Clear Search Bar
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Github Users ..."
            onChange={this.onChange}
            value={this.state.text}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-secondary btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;
