import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getTextById } from "../api/textApi";
import DOMPurify from "dompurify";
import TextEditor from "../components/textEditor";
import Clem from "../assets/clem_bienvenu.jpg";
import { isMobile } from "react-device-detect";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;

const Title = styled.p`
  font-size: 62px;
  font-weight: 700;
  padding-left: ${isMobile ? "40px" : "20%"};
  padding-right: ${isMobile ? "40px" : "20%"};
`;
const SubTitle = styled.p`
  font-size: 32px;
  padding-left: ${isMobile ? "40px" : "20%"};
  padding-right: ${isMobile ? "40px" : "20%"};
`;
const Paragraphe = styled.p`
  font-size: 22px;
  padding-left: ${isMobile ? "40px" : "20%"};
  padding-right: ${isMobile ? "40px" : "20%"};
`;
const EditButton = styled.div`
  padding: 20px;
  background-color: grey;
  color: white;
  width: fit-content;
  margin: auto;
  border-radius: 12px;
  cursor: pointer;
`;
const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: "",
      paragraphe: "",
      isEditingTitleMode: false,
      isEditingParagrapheMode: false,
    };
  }

  componentDidMount() {
    getTextById(25).then((res) => {
      this.setState({ subtitle: res.text.text });
    });
    getTextById(45).then((res) => {
      this.setState({ paragraphe: res.text.text });
    });
  }

  handleToggleEditTitleMode = () => {
    this.setState({ isEditingTitleMode: !this.state.isEditingTitleMode });
  };

  handleToggleEditParagrapheMode = () => {
    this.setState({
      isEditingParagrapheMode: !this.state.isEditingParagrapheMode,
    });
  };

  render() {
    return (
      <div className="main">
        {/* <p className="title">Bienvenue sur le site de l'application 4b</p> */}
        <MainContainer>
          <img
            style={{
              width: isMobile ? "300px" : "650px",
              margin: "auto",
              marginTop: isMobile ? "30px" : "",
            }}
            src={Clem}
          />
          {this.state.isEditingTitleMode ? (
            <TextEditor
              id={25}
              toggle={this.handleToggleEditTitleMode}
              text={this.state.subtitle}
            />
          ) : (
            <SubTitle>
              <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(this.state.subtitle)}
              ></div>
            </SubTitle>
          )}
          {!this.state.isEditingTitleMode && this.props.user.isLogged && (
            <EditButton onClick={this.handleToggleEditTitleMode}>
              Modifier le titre
            </EditButton>
          )}
          {this.state.isEditingParagrapheMode ? (
            <TextEditor
              id={45}
              toggle={this.handleToggleEditParagrapheMode}
              text={this.state.paragraphe}
            />
          ) : (
            <Paragraphe>
              <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(this.state.paragraphe)}
              ></div>
            </Paragraphe>
          )}
          {!this.state.isEditingParagrapheMode && this.props.user.isLogged && (
            <EditButton onClick={this.handleToggleEditParagrapheMode}>
              Modifier le text
            </EditButton>
          )}
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
