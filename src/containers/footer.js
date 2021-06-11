import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const LinkContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: grey;
  text-decoration: none;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <LinkContainer>
          {" "}
          <Link className="header-link" to="/admin">
            Admin
          </Link>
        </LinkContainer>
      </footer>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
