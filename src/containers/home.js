import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";

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
