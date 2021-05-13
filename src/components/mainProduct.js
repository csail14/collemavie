import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px;
  text-align: center;
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
const DescriptionContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  justify-content: center;
`;
const Button = styled.div`
  margin-top: 10px;
  background-color: grey;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  max-width: 500px;
  margin: auto;
`;
class MainProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainContainer>
        <TitleContainer>Produit 1</TitleContainer>

        <img
          style={{ maxHeight: "60%", maxWidth: "60%", margin: "auto" }}
          src={image1}
          alt="product-image"
        />
        <DescriptionContainer>
          blablablbalbalbalablalala ablbalbalb blablablbalbalbalablalala
          vlvlajkehflkehfkln rlzkehf iefhka{" "}
        </DescriptionContainer>
        <PriceContainer>Prix: 120 euros</PriceContainer>

        <Button>Ajouter au panier</Button>
      </MainContainer>
    );
  }
}

export default MainProduct;
