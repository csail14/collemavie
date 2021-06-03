import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Product from "../components/product";
import MainProduct from "../components/mainProduct";

const MainProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubTitle = styled.p`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
`;

const Category = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: ${(props) =>
    props.color ? "red" : props.selected ? "black" : "grey"};
  cursor: pointer;
`;
const Banner = styled.div`
  display: flex;
  padding-top: 100px;
  flex-direction: column;
  font-size: 32px;
  background-color: #80808036;

  width: 20%;
`;
const ProductsContainer = styled.p`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
let product = {
  id: "5",
};

export default function Products(props) {
  const [filter, setFilter] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (filter == 0 && productList.length == 0) {
      setProductList(props.products.list);
    }
  }, [props.products]);

  const filterResult = (newFilter) => {
    setFilter(newFilter);
    if (newFilter !== 0) {
      let productSelected = props.products.list.filter(
        (item) => item.cat_id === newFilter
      );

      setProductList(productSelected);
    } else {
      setProductList(props.products.list);
    }
  };

  return (
    <div className="main">
      {/* <p className="title">Bienvenue sur le site de l'application 4b</p> */}
      <MainContainer>
        <Banner>
          {filter !== 0 && (
            <Category color="red" onClick={() => filterResult(0)}>
              Supprimer filtre
            </Category>
          )}
          {props.category.list.map((item) => {
            return (
              <Category
                selected={filter == item.id ? true : false}
                onClick={() => filterResult(item.id)}
              >
                {item.name}
              </Category>
            );
          })}
        </Banner>
        <MainProductContainer>
          <SubTitle>Tous les produits </SubTitle>
          <ProductsContainer>
            {productList.map((item) => {
              return <Product product={item} />;
            })}
          </ProductsContainer>
          {/* <div id="mainproduct" style={{ marginBottom: "50px" }}></div>
          <hr style={{ border: "grey solid 1px", width: "80%" }} />
          <MainProduct /> */}
        </MainProductContainer>
      </MainContainer>
    </div>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    products: store.products,
    category: store.category,
  };
};
