import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import Clem from "../assets/clem1.webp";
import { getTextById } from "../api/textApi";
import TextEditor from "../components/textEditor";
import DOMPurify from "dompurify";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;
const ImageContainer = styled.div`
  display: flex;
  height: 400px;
  width: 100%;
  background-size: cover;
  background-image: url(${image1});
`;

const Title = styled.div`
  font-size: 62px;
  font-weight: 700;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 20px;
`;
const SubTitle = styled.div`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
`;
const Paragraphe = styled.div`
  font-size: 22px;
  padding-left: 20%;
  padding-right: 20%;
`;

const ClemenceSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 400px;
`;

const ContactInfoContainer = styled.div`
  text-align: left;
  margin: 30px;
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
    getTextById(15).then((res) => {
      this.setState({ subtitle: res.text.text });
    });
    getTextById(35).then((res) => {
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
          <ClemenceSection>
            <img style={{ height: "300px" }} src={Clem} />

            <TextClemenceContainer>
              <p>Sourions, rions et collons la vie à notre image...</p>
              <p>
                Apparemment le rire est communicatif, je ne comprends pas
                pourquoi. Et vous?
              </p>
            </TextClemenceContainer>
          </ClemenceSection>
          <ClemenceSection>
            <ContactInfoContainer>
              <h2>Me contacter</h2>
              <p>42 IMPASSE DU BOEUF COURONNE, 78550 BAZAINVILLE</p>
              <p>infoscollemavie@gmail.com</p>
              <p>0660740723</p>
              <p>Insta</p>
            </ContactInfoContainer>
            <form className="contactform">
              <div className="contactdiv">
                <input type="text" placeholder="Nom" onChange={(e) => {}} />
                <input type="text" placeholder="Prénom" onChange={(e) => {}} />
              </div>
              <div className="contactdiv">
                <input
                  type="text"
                  placeholder="Téléphone"
                  onChange={(e) => {}}
                />
                <input type="text" placeholder="Adresse" onChange={(e) => {}} />
              </div>
              <textarea
                className="contactTextarea"
                type="text"
                placeholder="Votre message"
                onChange={(e) => {}}
              />
              <div>
                <input type="submit" value="Envoyer" />
              </div>
            </form>
          </ClemenceSection>
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
