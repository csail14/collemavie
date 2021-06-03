import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import ProductBanner from "./productBanner";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px;
  text-align: center;
`;

const TitleContainer = styled.div`
  margin-top: 80px;
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

const MainProduct = (props) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let index = props.match.params.id;

    console.log("allproduct", props.products.list);
    let product = props.products.list.filter((item) => item.id == index)[0];
    setProduct(product);
  }, [props.products, props.match.params.id]);

  return (
    <MainContainer>
      {product && (
        <>
          <TitleContainer>{product.title}</TitleContainer>

          <img
            style={{ maxHeight: "40%", maxWidth: "40%", margin: "auto" }}
            src={image1}
            alt="product-image"
          />
          <DescriptionContainer>{product.description}</DescriptionContainer>
          <PriceContainer>Prix: {product.price} euros</PriceContainer>

          <Button>Ajouter au panier</Button>
          <ProductBanner products={props.products} />
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
