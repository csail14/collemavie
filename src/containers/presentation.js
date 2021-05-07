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
          <SubTitle>Bienvenue dans l'envers du décor</SubTitle>
          <Paragraphe>
            Pour ceux, qui ne me connaissent pas bien encore, je m'appelle
            Clémence, j'ai 26 ans et je m'apprête à vous raconter aussi
            brièvement que possible la genèse de @collemavie et mon histoire.
          </Paragraphe>
          <Paragraphe>
            J'ai grandi dans un petit village des Yvelines entourée par mes
            parents et ma soeur jumelle. Et oui, nous sommes arrivées à deux
            pour embellir ce monde à 5 minutes d'intervalle. Evidemment, Amélie
            est arrivée la première, conquérante, déterminée, mais surtout la
            plus attentionnée que je connaisse.
          </Paragraphe>
          <Paragraphe>
            Niveau études, rien de très créatif je dirais, après un IUT, j'ai
            passé trois années à étudier afin d'obtenir un Master en Business
            avec une belle touche internationale (passionnée par l'anglais que
            je suis)... C'est à la fin de ce cursus, que beaucoup de choses ont
            commencé à bouger en moi, une envie d'aller découvrir le monde et
            surtout de sortir de ce cocon que je connaissais depuis tant
            d'années.
          </Paragraphe>
          <Paragraphe>
            Et hop, me voilà émigrée à l'autre de bout de la terre en Australie.{" "}
          </Paragraphe>
          <Paragraphe>
            J'y ai passé deux années incroyables, remplies d'expériences
            humaines, de challenges, de remises en question et surtout de prise
            de recul sur bons nombres de croyances que j'avais lié à
            l'environnement dans lequel je me trouvais depuis toujours.{" "}
          </Paragraphe>
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
