import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Product from "../components/product";

const MainProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
  width: -webkit-fill-available;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubTitle = styled.p`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
  color: grey;
  font-weight: 700;
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
  border-radius: 12px;
  margin-top: 90px;
  width: 250px;
`;
const ProductsContainer = styled.p`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Products = (props) => {
  const [filter, setFilter] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (filter == 0 && productList.length == 0) {
      setProductList(props.products.list);
    }
  });

  const filterResult = (newFilter) => {
    setFilter(newFilter);
    if (newFilter !== 0) {
      let productSelected = props.products.list.filter(
        (item) => item.cat_id === newFilter
      );

      setProductList(productSelected);
      let filterName = props.category.list.filter(
        (item) => item.id === newFilter
      )[0].name;
      setFilterName(filterName);
    } else {
      setProductList(props.products.list);
      setFilterName("");
    }
  };

  return (
    <div className="main">
      {/* <p className="title">Bienvenue sur le site de l'application 4b</p> */}
      <MainContainer>
        <Banner>
          {filter !== 0 && (
            <Category color="red" onClick={() => filterResult(0)}>
              Tous les produits
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
          <SubTitle> {filterName == "" ? "Les Oeuvres" : filterName} </SubTitle>
          <ProductsContainer>
            {productList.map((item) => {
              return (
                <Product allMedia={props.products.media_list} product={item} />
              );
              // return <div>Hello</div>
            })}
          </ProductsContainer>
        </MainProductContainer>
      </MainContainer>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    products: store.products,
    cat: store.category,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
