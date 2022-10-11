import React from "react";
import Product from "./product";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { connect } from "react-redux";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const ProductBanner = (props) => {
  console.log(props.products && props.products.media_list);

  const carouselItems =
    props.products &&
    props.products.list &&
    props.products.list.map((item) => {
      return (
        <div className="item" data-value="1">
          <Product allMedia={props.products.media_list} product={item} />
        </div>
      );
    });
  return (
    <div>
      {props.products && props.products.list && (
        <AliceCarousel
          autoPlay
          autoPlayControls
          autoPlayStrategy="none"
          autoPlayInterval={2000}
          animationDuration={1000}
          animationType="fadeout"
          infinite
          mouseTracking
          items={carouselItems}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      )}
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
