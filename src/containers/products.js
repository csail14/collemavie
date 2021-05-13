import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Product from "../components/product";
import MainProduct from "../components/mainProduct";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;

const SubTitle = styled.p`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
`;
const ProductsContainer = styled.p`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
let product = {
  id: "5",
};
class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        {/* <p className="title">Bienvenue sur le site de l'application 4b</p> */}
        <MainContainer>
          <SubTitle>Liste des produits :</SubTitle>
          <ProductsContainer>
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
          </ProductsContainer>
          <div id="mainproduct" style={{ marginBottom: "50px" }}></div>
          <hr style={{ border: "grey solid 1px", width: "80%" }} />
          <MainProduct />
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
