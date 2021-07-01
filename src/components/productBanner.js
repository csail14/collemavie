import React, { useState, useEffect } from "react";
import Product from "./product";
import Carousel from "react-grid-carousel";
import { connect } from "react-redux";

const ProductBanner = (props) => {
  return (
    <div>
      <Carousel style={{ alignItems: "end" }} cols={4} rows={1} gap={10} loop>
        {props.products &&
          props.products.list.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Product allMedia={props.products.media_list} product={item} />
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

const mapDispatchToProps = {};
const mapStateToProps = (store) => {
  return {
    user: store.user,
    category: store.category,
    products: store.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBanner);
