import React from "react";
//Let's import Proptypes
import PropTypes from "prop-types";
//Let's import UserItem
import UserItem from "./UserItem";
//Let's import Spinner
import Spinner from "../layout/Spinner";

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

//Style
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

//Coming PropTypes
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
