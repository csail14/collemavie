import React from "react";
import { Link } from "react-router-dom";
import { loadProductInfo } from "../actions/product/productActions";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  addProduct,
  deleteProductById,
  getProductAll,
} from "../api/productApi";
import { addCat, getCatAll } from "../api/catApi";
import { loadCatInfo } from "../actions/category/catActions";

const Title = styled.div`
  color: black;
  font-size: 30px;
  padding: 10px;
`;
const MainContainer = styled.div`
  margin-top: 100px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Button = styled.div`
  border-radius: 12px;
  background-color: grey;
  color: white;
  padding: 5px;
  margin: 10px;
  cursor: pointer;
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addError: null,
      addCatError: null,
    };
    this.title = "";
    this.description = "";
    this.price = "";
    this.titreCat = "";
  }
  componentDidMount = () => {};
  componentDidUpdate = () => {};
  onSubmitForm = (e) => {
    e.preventDefault();
    let data = {
      title: this.title,
      description: this.description,
      price: this.price,
      state: "available",
      cat_id: "",
    };
    if (this.title !== "" && (this.description !== "") & (this.price !== "")) {
      addProduct(data).then((res) => {
        if (res.status !== 200) {
          this.setState({
            addError: "Une erreur s'est produite, veuillez reessayer",
          });
        } else {
          this.setState({ addError: "Produit ajouté avec succes" });
          getProductAll().then((resp) => {
            this.props.loadProductInfo(resp.products);
          });
        }
      });
    }
  };
  onSubmitcatForm = (e) => {
    e.preventDefault();
    let data = {
      name: this.titreCat,
    };
    if (this.titreCat !== "") {
      addCat(data).then((res) => {
        if (res.status !== 200) {
          this.setState({
            addError: "Une erreur s'est produite, veuillez reessayer",
          });
        } else {
          this.setState({ addError: "Produit ajouté avec succes" });
          getCatAll().then((resp) => {
            this.props.loadCatInfo(resp.products);
          });
        }
      });
    }
  };

  onChangeText(type, text) {
    this[type] = text;
  }

  deleteProduct(id) {
    deleteProductById(id).then((res) => {
      if (res.status === 200) {
        getProductAll().then((resp) => {
          this.props.loadProductInfo(resp.products);
        });
      }
    });
  }

  render() {
    return (
      <MainContainer>
        <Title>Ajouter un produit</Title>
        {this.state.addError !== null && (
          <p style={{ color: "red" }}>{this.state.addError}</p>
        )}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            this.onSubmitForm(e);
          }}
        >
          <input
            type="text"
            placeholder="Titre"
            onChange={(e) => {
              this.onChangeText("title", e.currentTarget.value);
            }}
          />
          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => {
              this.onChangeText("description", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="prix €"
            onChange={(e) => {
              this.onChangeText("price", e.currentTarget.value);
            }}
          />{" "}
          <input type="submit" value="Enregistrer" name="Enregistrer" />
        </form>
        <Title>Supprimer un produit</Title>{" "}
        <ProductContainer>
          {this.props.products.list.map((item) => {
            return (
              <Product>
                {item.title}
                <Button
                  onClick={() => {
                    this.deleteProduct(item.id);
                  }}
                >
                  Supprimer
                </Button>
              </Product>
            );
          })}
        </ProductContainer>
        <Title>Ajouter une catégorie</Title>
        {this.state.addCatError !== null && (
          <p style={{ color: "red" }}>{this.state.addCatError}</p>
        )}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            this.onSubmitCatForm(e);
          }}
        >
          <input
            type="text"
            placeholder="Titre"
            onChange={(e) => {
              this.onChangeText("titleCat", e.currentTarget.value);
            }}
          />

          <input type="submit" value="Enregistrer" name="Enregistrer" />
        </form>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = {
  loadProductInfo,
  loadCatInfo,
};
const mapStateToProps = (store) => {
  return {
    user: store.user,
    products: store.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
