import React from "react";
import { loadProductInfo } from "../actions/product/productActions";
import { connect } from "react-redux";
import styled from "styled-components";
import PhotosUploader from "../components/uploadVideo";
import { addMedia } from "../api/mediaApi";
import { deleteCatById } from "../api/catApi";
import EditProductModal from "../components/EditProductModal";
import { isMobile } from "react-device-detect";

import {
  addProduct,
  deleteProductById,
  getProductAll,
  editProductById,
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
  font-weight: 700;
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
      modalStyle: this.getModalStyle,
      isOpen: false,
      productSelected: null,
    };
    this.title = "";
    this.description = "";
    this.price = "";
    this.titreCat = "";
    this.cat_id = 5;
    this.mediaURL = [];
  }

  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  getModalStyle() {
    const top = 50 + this.rand();
    const left = 50 + this.rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
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
              url: this.mediaURL[i],
              product_id: res.result.insertId,
            };
            addMedia(dataMedia).then((resMedia) => {});
          }
        }
      });
    } else {
      this.setState({
        addError: "Veuillez remplir tous les champs",
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

  handleSelectProduct = (item) => {
    this.setState({ productSelected: item });
  };
  deleteCat(id) {
    deleteCatById(id).then((res) => {
      if (res.status === 200) {
        getCatAll().then((resp) => {
          this.props.loadCatInfo(resp.cat);
        });
      }
    });
  }

  onStateProductChange(id, item, state) {
    item.state = state;
    editProductById(id, item).then((res) => {
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
    console.log(isMobile);
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
        <Title>Vos produits</Title>{" "}
        <ProductContainer>
          {this.props.products.list.map((item) => {
            return (
              <Product>
                {item.title}
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Etes-vous sur de vouloir supprimer ce produit ?"
                      )
                    ) {
                      this.deleteProduct(item.id);
                    } else {
                    }
                  }}
                >
                  Supprimer
                </Button>
                <Button
                  onClick={() => {
                    this.handleSelectProduct(item);
                    this.handleOpen();
                  }}
                >
                  Modifier
                </Button>
                <select
                  value={item.state}
                  onChange={(e) =>
                    this.onStateProductChange(
                      item.id,
                      item,
                      e.currentTarget.value
                    )
                  }
                >
                  <option value="available">A vendre</option>
                  <option value="sold">Vendu</option>
                </select>
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
        <EditProductModal
          isOpen={this.state.isOpen}
          handleOpen={this.handleOpen}
          productSelected={this.state.productSelected}
        />
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
