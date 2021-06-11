import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  color: grey;
  text-decoration: none;
  margin-right: 30px;
`;

class Header extends React.Component {
  render() {
    return (
      <MainContainer>
        <TitleContainer>
          <Link className="header-link" to="/home">
            Collemavie🎨
          </Link>
        </TitleContainer>
        <nav>
          <LinkContainer>
            <Link className="header-link" to="/home">
              Bienvenue
            </Link>
            <Link className="header-link" to="/presentation">
              Enchantée, moi c'est Clémence
            </Link>
            <Link className="header-link" to="/products">
              Mes Oeuvres, ma vie
            </Link>
          </LinkContainer>
        </nav>
      </MainContainer>
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
