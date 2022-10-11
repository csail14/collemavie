import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Product from "../components/product";
import { isMobile } from "react-device-detect";
import Grid from "@mui/material/Grid";

const MainProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: -webkit-fill-available;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
`;

const SubTitle = styled.div`
  font-size: 32px;
  padding-left: 20%;
  padding-right: 20%;
  margin-top: 50px;
  font-weight: 700;
`;

const Category = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: ${(props) =>
    props.color ? props.color : props.selected ? "black" : "grey"};
  cursor: pointer;
`;
const Banner = styled.div`
  display: ${isMobile ? "none" : "flex"};
  padding-top: 30px;
  flex-direction: column;
  font-size: 32px;
  background-color: #80808036;
  box-shadow: 2px 3px 5px #a59d9d;
  margin-top: 90px;
  width: 250px;
  text-align: left;
  padding-left: 20px;
`;
const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 100vh;
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
        {/* <Stack direction="row" spacing={2}>
          <Button disabled>Filtrer par type</Button>

          {props.category.list.map((item) => {
            return (
              <Button
                selected={filter == item.id ? true : false}
                onClick={() => filterResult(item.id)}
              >
                {item.name}
              </Button>
            );
          })}
          {filter !== 0 && (
            <Button color="red" onClick={() => filterResult(0)}>
              Tous les produits
            </Button>
          )}
        </Stack> */}
        <MainProductContainer>
          <SubTitle>
            {" "}
            {filterName === "" ? "Les Oeuvres" : filterName}{" "}
          </SubTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {productList.map((item) => {
              return (
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  sx={{
                    "&:hover": {
                      color: "red",
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Product
                    allMedia={props.products.media_list}
                    product={item}
                  />
                </Grid>
              );
            })}
            -
          </Grid>
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
