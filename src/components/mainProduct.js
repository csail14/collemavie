import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import ProductBanner from "./productBanner";
import { config } from "../config";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px;
  text-align: center;
`;

const TitleContainer = styled.div`
  margin-top: 80px;
  font-size: 40px;
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
  font-size: 20px;
  margin-left: 200px;
  margin-right: 200px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;
const Button = styled.div`
  background-color: grey;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  max-width: 500px;
  margin: 10px auto;
`;

const ProductContainer = styled.div`
  display: flex;
  alignitems: center;
  margin: 20px;
`;

const MainProduct = (props) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let index = props.match.params.id;
    let product = props.products.list.filter((item) => item.id == index)[0];
    setProduct(product);
  }, [props.products, props.match.params.id]);
  return (
    <MainContainer>
      {product && (
        <>
          <ProductContainer>
            {product.media && (
              <img
                style={{ maxHeight: "40%", maxWidth: "40%", margin: "auto" }}
                src={config.video_url + product.media[0]}
                alt="product-image"
              />
            )}
            <InfoContainer>
              <TitleContainer>{product.title}</TitleContainer>
              <DescriptionContainer>{product.description}</DescriptionContainer>
              <PriceContainer>Prix: {product.price} euros</PriceContainer>

              <Button>Ajouter au panier</Button>
            </InfoContainer>
          </ProductContainer>
          <ProductBanner />
        </>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    products: store.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainProduct);
