import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ProductBanner from "./productBanner";
import { config } from "../config";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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
  color: ${(props) => (props.state !== "available" ? "red" : "")};s
`;
const DescriptionContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  justify-content: center;
  font-size: 20px;
  margin-left: 100px;
  margin-right: 100px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const Button = styled.div`
  margin-top: 10px;
  border: solid grey 1px;
  color: grey;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  width: fit-content;
`;

const ProductContainer = styled.div`
  display: flex;
  alignitems: center;
  margin: 20px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MainProduct = (props) => {
  const [product, setProduct] = useState(null);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    let index = props.match.params.id;
    let product = props.products.list.filter((item) => item.id == index)[0];
    setProduct(product);
    if (product) {
      let gallery_media = [];
      props.products.media_list
        .filter((item) => item.product_id == product.id)
        .map((el) => {
          let element = {};
          element.original = config.video_url + el.url;
          element.thumbnail = config.video_url + el.url;
          gallery_media.push(element);
        });
      setMedia(gallery_media);
    }
  }, [props.products, props.match.params.id]);

  return (
    <MainContainer>
      {product && (
        <>
          <ProductContainer>
            {media && media.length > 0 && <ImageGallery items={media} />}
            <InfoContainer>
              <TitleContainer>{product.title}</TitleContainer>
              <DescriptionContainer>{product.description}</DescriptionContainer>
              <PriceContainer state={product.state}>
                {product.state === "available"
                  ? "Prix: " + product.price + " euros"
                  : "Vendu"}
              </PriceContainer>

              {/* <Button>Ajouter au panier</Button> */}
            </InfoContainer>
          </ProductContainer>
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
