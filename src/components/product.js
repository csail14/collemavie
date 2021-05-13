import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px;
`;

const TitleContainer = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PriceContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  justify-content: center;
`;

const Button = styled.div`
  margin-top: 10px;
  background-color: grey;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
`;
class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <TitleContainer>Produit 1</TitleContainer>

        <img style={{ maxHeight: "200px" }} src={image1} alt="product-image" />
        <PriceContainer>Prix: 120 euros</PriceContainer>
        <Button>Plus d'informations</Button>
        <Button>Ajouter au panier</Button>
      </MainContainer>
    );
  }
}

export default Product;
