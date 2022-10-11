import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import menu from "../assets/menu-outline.png";
import { getTextById } from "../api/textApi";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  background-color:white
  max-width: ${isMobile ? "90vw" : ""};
  background-color: white;
  box-shadow: 2px 3px 5px #a59d9d;
  z-index: 100;
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

const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100vw;
`;

const ColumnMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      header1: "",
      header2: "",
      header3: "",
    };
  }

  componentDidMount() {
    getTextById(85).then((res) => {
      this.setState({ header1: res.text.text });
    });
    getTextById(95).then((res) => {
      this.setState({ header2: res.text.text });
    });
    getTextById(105).then((res) => {
      this.setState({ header3: res.text.text });
    });
  }

  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <>
        <MainContainer>
          <ColumnMenu>
            <TitleContainer>
              <Link className="header-link" to="/home">
                Collemavie🎨
              </Link>
            </TitleContainer>

            {isMobile ? (
              <img
                onClick={() => {
                  this.setState({ showMenu: !this.state.showMenu });
                }}
                style={{
                  height: "40px",
                  marginLeft: "40px",
                  marginTop: "-8px",
                }}
                src={menu}
              ></img>
            ) : (
              <nav>
                <LinkContainer>
                  <Link className="header-link" to="/home">
                    {this.state.header1}
                  </Link>
                  <Link className="header-link" to="/presentation">
                    {this.state.header2}
                  </Link>
                  <Link className="header-link" to="/products">
                    {this.state.header3}
                  </Link>
                </LinkContainer>
              </nav>
            )}
          </ColumnMenu>
          {this.state.showMenu && (
            <ContainerMobile>
              <Link
                className="header-link-mobile"
                to="/home"
                onClick={() => {
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <div
                  style={{
                    lineHeight: "60px",
                    borderTop: "solid 0.5px #c0bfbf",
                  }}
                >
                  Bienvenue
                </div>
              </Link>
              <Link
                className="header-link-mobile"
                to="/presentation"
                onClick={() => {
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <div style={{ lineHeight: "60px" }}>
                  Enchantée, moi c'est Clémence
                </div>
              </Link>
              <Link
                className="header-link-mobile"
                to="/products"
                onClick={() => {
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <div style={{ lineHeight: "60px" }}>Mes oeuvres, ma vie</div>
              </Link>
            </ContainerMobile>
          )}
        </MainContainer>
      </>
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
