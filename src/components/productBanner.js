import React, { useState, useEffect } from "react";
import Product from "./product";
import Carousel from "react-grid-carousel";
import { connect } from "react-redux";

const ProductBanner = (props) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (props.oeuvre) {
      setProduct(props.oeuvre.list);
    }
  }, [props.oeuvre]);

  useEffect(() => {
    console.log("products dans banner", props.oeuvre);
  }, []);

  return (
    <div>
      <Carousel style={{ alignItems: "end" }} cols={4} rows={1} gap={10} loop>
        {product.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <Product product={item} />
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
    oeuvre: store.products,
    category: store.category,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBanner);
