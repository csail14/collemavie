import React from "react";
import styled from "styled-components";
import image1 from "../assets/image1.webp";
import Product from "./product";
import Carousel from "react-grid-carousel";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flew-wrap: no-wrap;
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
  width: 100%;
`;
class ProductBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel cols={4} rows={1} gap={10} loop>
        {this.props.products.list.map((item) => {
          return (
            <Carousel.Item>
              <Product product={item} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default ProductBanner;
