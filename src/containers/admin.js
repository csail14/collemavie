import React from "react";
import { Link } from "react-router-dom";
import { loadProductInfo } from "../actions/product/productActions";
import { connect } from "react-redux";
import styled from "styled-components";
import PhotosUploader from "../components/uploadVideo";
import { addMedia } from "../api/mediaApi";
import { setAllProduct } from "../helpers/function";

import {
  addProduct,
  deleteProductById,
  getProductAll,
} from "../api/productApi";
import { getAllMedia } from "../api/mediaApi";
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
    this.cat_id = 5;
    this.mediaURL = [];
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    let data = {
      title: this.title,
      description: this.description,
      price: this.price,
      state: "available",
      cat_id: this.cat_id,
    };
    if (this.title !== "" && (this.description !== "") & (this.price !== "")) {
      addProduct(data).then((res) => {
        if (res.status !== 200) {
          this.setState({
            addError: "Une erreur s'est produite, veuillez reessayer",
          });
        } else {
          this.setState({ addError: "Produit ajouté avec succes" });
          getProductAll().then((res) => {
            if (res.status === 200) {
              getAllMedia().then((resp) => {
                this.props.loadProductInfo(res.products, resp.media);
              });
            }
          });
          for (let i = 0; i < this.mediaURL.length; i++) {
            let dataMedia = {
              url: this.mediaURL[0],
              product_id: res.result.insertId,
            };
            addMedia(dataMedia).then((resMedia) => {});
          }
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
            this.props.loadCatInfo(resp.cat);
          });
        }
      });
    }
  };

  onChangeText(type, text) {
    this[type] = text;
  }
  onChangeCat(value) {
    this.cat_id = value;
  }

  setMediaUrl = (url) => {
    this.mediaURL.push(url);
  };
  deleteMediaUrl = (url) => {
    this.mediaURL = [];
  };

  deleteProduct(id) {
    deleteProductById(id).then((res) => {
      if (res.status === 200) {
        getProductAll().then((res) => {
          if (res.status === 200) {
            getAllMedia().then((resp) => {
              this.props.loadProductInfo(res.products, resp.media);
            });
          }
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
          <div style={{ display: "flex", margin: "10px" }}>
            Catégorie :
            <select
              onChange={(e) => {
                this.onChangeCat(e.currentTarget.value);
              }}
            >
              {this.props.category.list.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <input
            type="text"
            placeholder="prix €"
            onChange={(e) => {
              this.onChangeText("price", e.currentTarget.value);
            }}
          />{" "}
          <PhotosUploader
            name={this.state.name}
            changeVideoID={this.changeVideoID}
            setMediaUrl={this.setMediaUrl}
            deleteMediaUrl={this.deleteMediaUrl}
          />
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
            this.onSubmitcatForm(e);
          }}
        >
          <input
            type="text"
            placeholder="Titre"
            onChange={(e) => {
              this.onChangeText("titreCat", e.currentTarget.value);
            }}
          />

          <input type="submit" value="Enregistrer" name="Enregistrer" />
        </form>
        <ProductContainer>
          {this.props.category.list.map((item) => {
            return (
              <Product allMedia={this.props.products.media_list} product={item}>
                {item.name}
                <Button
                  onClick={() => {
                    this.deleteCat(item.id);
                  }}
                >
                  Supprimer
                </Button>
              </Product>
            );
          })}
        </ProductContainer>
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
    category: store.category,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
