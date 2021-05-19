import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import Clem from "../assets/clem1.webp";

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

const Title = styled.p`
  font-size: 62px;
  font-weight: 700;
  padding-left: 20%;
  padding-right: 20%;
`;
const SubTitle = styled.p`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
`;
const Paragraphe = styled.p`
  font-size: 22px;
  padding-left: 20%;
  padding-right: 20%;
`;

const ClemenceSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        {/* <p className="title">Bienvenue sur le site de l'application 4b</p> */}
        <MainContainer>
          <ImageContainer></ImageContainer>
          <Title>Collemavie🎨</Title>
          <SubTitle>
            Une artiste indépendante, solaire, aventurière qui aime le
            street-art et s'en inspire !
          </SubTitle>
          <Paragraphe>
            Collemavie🎨 est un né suite à plusieurs après-midi et soirées de
            joie, de relaxation en musique, de calme et silence, mais aussi en
            collaboration avec quelques set Techno endiablés (fan de musique
            électronique que je suis) afin de me retrouver et de me faire
            plaisir.{" "}
          </Paragraphe>
          <Paragraphe>
            Le collage sur toile me procure une telle évasion que j'ai décidé de
            vous en faire profiter.
          </Paragraphe>
          <Paragraphe>
            Au-delà de la beauté du résultat, car oui, je suis toujours fière de
            mes œuvres, je me suis rendue compte que l'art et la créativité sont
            d'excellents moteurs de développement personnel:
            <ul>
              <li>Source d'évasion et d'entrainement doux pour le cerveau</li>
              <li>Permet de développer l'imagination et la créativité </li>
              <li>Boost l'égo et les pensées positives</li>
              <li>Permet de se recentrer sur ses valeurs</li>
              <li>
                Repose uniquement sur de bonnes intentions, pour soi et autrui{" "}
              </li>
              <li>Se pratique seul ou à plusieurs</li>
            </ul>
          </Paragraphe>
          <Paragraphe>Bienvenue et si vous souhaitez échanger :</Paragraphe>
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
