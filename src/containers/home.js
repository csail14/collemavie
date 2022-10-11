import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import TextField from "@mui/material/TextField";
import Clem from "../assets/clem1.webp";
import { getTextById } from "../api/textApi";
import TextEditor from "../components/textEditor";
import DOMPurify from "dompurify";
import ProductBanner from "../components/productBanner";
import { isMobile } from "react-device-detect";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
  height: 400px;
  width: 100%;
  background-size: cover;
  background-image: url(${image1});
`;

const Title = styled.div`
  font-size: 62px;
  font-weight: 700;
  padding-left: ${isMobile ? "" : "20%"};
  padding-right: ${isMobile ? "" : "20%"};
  padding-top: 30px;
  text-align: center;
`;
const SubTitle = styled.div`
  font-size: 32px;
  padding-left: ${isMobile ? "" : "20%"};
  padding-right: ${isMobile ? "" : "20%"};
  text-align: justify;
`;
const Paragraphe = styled.div`
  font-size: 22px;
  padding-left: ${isMobile ? "40px" : "20%"};
  padding-right: ${isMobile ? "40px" : "20%"};
  text-align: justify;
`;

const ClemenceSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${isMobile ? "column" : "row"};
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  max-width: 100%;
  padding-top: 40px;
  margin-left: ${isMobile ? "auto" : "50px;"};
  margin-right: ${isMobile ? "auto" : "100px;"};
`;
const ContactSection = styled.div`
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
  justify-content: center;
  align-items: ${isMobile ? "center" : "center"};
  margin-top: 30px;

  text-align: center;
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

const TextClemenceContainer = styled.div`
  font-weight: 700;
  font-size: 28px;
  margin: 30px;
  paddding: 0px;
  width: ${isMobile ? "" : "400px"};
  max-width: 100%;
  padding: ${isMobile ? "20px" : ""};
`;

const ContactInfoContainer = styled.div`
  text-align: center;
  margin: 0 60px 30px 60px;
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
      contactInfo: "",
      isEditingContactMode: false,
      isEditingTitleMode: false,
      isEditingParagrapheMode: false,
    };
  }
  componentDidMount() {
    getTextById(15).then((res) => {
      this.setState({ subtitle: res.text.text });
    });
    getTextById(35).then((res) => {
      this.setState({ paragraphe: res.text.text });
    });
    getTextById(5).then((res) => {
      this.setState({ contactInfo: res.text.text });
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
  handleToggleEditContactMode = () => {
    this.setState({
      isEditingContactMode: !this.state.isEditingContactMode,
    });
  };

  render() {
    return (
      <div className="main">
        <MainContainer>
          <ImageContainer></ImageContainer>
          <Title>Collemavie🎨</Title>
          {this.state.isEditingTitleMode ? (
            <TextEditor
              id={15}
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
              id={35}
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
          <h2 style={{ paddingTop: 40 }}>Mes oeuvres</h2>
          <ProductBanner products={this.props.products} />
          <ClemenceSection>
            <img style={{ height: isMobile ? "200px" : "500px" }} src={Clem} />

            <TextClemenceContainer>
              <p>Sourions, rions et collons la vie à notre image...</p>
              <p>
                Apparemment le rire est communicatif, je ne comprends pas
                pourquoi. Et vous?
              </p>
            </TextClemenceContainer>
          </ClemenceSection>

          <ContactSection>
            <h2>Me contacter</h2>
            <ContactInfoContainer>
              {this.state.isEditingContactMode ? (
                <TextEditor
                  id={5}
                  toggle={this.handleToggleEditContactMode}
                  text={this.state.contactInfo}
                />
              ) : (
                <ContactInfoContainer>
                  <div
                    className="preview"
                    dangerouslySetInnerHTML={createMarkup(
                      this.state.contactInfo
                    )}
                  ></div>
                </ContactInfoContainer>
              )}
              {!this.state.isEditingContactMode && this.props.user.isLogged && (
                <EditButton onClick={this.handleToggleEditContactMode}>
                  Modifier les infos
                </EditButton>
              )}
            </ContactInfoContainer>

            <form
              style={isMobile ? { textAlign: "center" } : {}}
              className="contactform"
            >
              <div className="contactdiv">
                <input
                  type="text"
                  placeholder="Nom"
                  onChange={(e) => {}}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#c8c8c8",
                  }}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  onChange={(e) => {}}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#c8c8c8",
                  }}
                />
              </div>
              <div className="contactdiv">
                <input
                  type="text"
                  placeholder="Téléphone"
                  onChange={(e) => {}}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#c8c8c8",
                  }}
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  style={{
                    borderWidth: "1px",
                    borderColor: "#c8c8c8",
                  }}
                  onChange={(e) => {}}
                />
              </div>
              <input
                type="text"
                className="contactTextarea"
                placeholder="Votre message"
                onChange={(e) => {}}
                style={{
                  borderWidth: "1px",
                  borderColor: "#c8c8c8",
                }}
              />
              <div>
                <input
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "1px 1px 3px black",
                  }}
                  type="submit"
                  value="Envoyer"
                />
              </div>
            </form>
          </ContactSection>
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    products: store.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
