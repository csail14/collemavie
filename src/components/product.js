import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { config } from "../config";
import { Link } from "react-router-dom";

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
  white-space: nowrap;
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
  border: solid grey 1px;
  color: grey;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  &:hover {
    color: white;
    background-color: grey;
  }
`;

const Product = (props) => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (props.product) {
      setMedia(
        props.allMedia.filter((item) => item.product_id == props.product.id)
      );
    }
  }, [props.product]);

  return (
    <MainContainer>
      <>
        <TitleContainer>{props.product.title}</TitleContainer>
        <img
          style={{ maxHeight: "200px" }}
          src={media.length > 0 ? config.video_url + media[0].url : null}
          alt="product"
        />

        <PriceContainer>Prix: {props.product.price} euros</PriceContainer>
        <a href="#mainproduct" style={{ textAlign: "center" }}>
          <Link className="link-product" to={"/product/" + props.product.id}>
            <Button onCick={() => {}}> Plus d'informations</Button>{" "}
          </Link>
        </a>
        <a>
          <Button>Ajouter au panier</Button>
        </a>
      </>
    </MainContainer>
  );
};

export default Product;
