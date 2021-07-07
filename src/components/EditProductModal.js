import React, { useState, useEffect } from "react";
import { loadProductInfo } from "../actions/product/productActions";
import { connect } from "react-redux";
import styled from "styled-components";
import { addMedia } from "../api/mediaApi";
import Modal from "@material-ui/core/Modal";
import { addProduct, getProductAll, editProductById } from "../api/productApi";
import { getAllMedia } from "../api/mediaApi";
import { loadCatInfo } from "../actions/category/catActions";

const MainContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 35%;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
`;
const Title = styled.div`
  color: black;
  font-size: 30px;
  padding: 10px;
`;

const EditProductModal = (props) => {
  const [addError, setAddError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cat_id, setCat_id] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      price: price,
      state: props.productSelected.state,
      cat_id: cat_id,
    };
    if (title !== "" && (description !== "") & (price !== "")) {
      editProductById(props.productSelected.id, data).then((res) => {
        if (res.status !== 200) {
          setAddError("Une erreur s'est produite, veuillez reessayer");
        } else {
          getProductAll().then((res) => {
            if (res.status === 200) {
              getAllMedia().then((resp) => {
                props.loadProductInfo(res.products, resp.media);
                props.handleOpen();
              });
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (props.productSelected) {
      setTitle(props.productSelected.title);
      setDescription(props.productSelected.description);
      setPrice(props.productSelected.price);
      setCat_id(props.productSelected.cat_id);
    }
  }, [props.productSelected]);

  return (
    <Modal open={props.isOpen} onClose={props.handleOpen}>
      <MainContainer>
        <Title>Modifier un produit</Title>
        {addError !== null && <p style={{ color: "red" }}>{addError}</p>}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            onSubmitForm(e);
          }}
        >
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            style={{ width: "fit-content" }}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
          />
          <div style={{ display: "flex", margin: "10px" }}>
            Catégorie :
            <select
              value={cat_id}
              onChange={(e) => {
                setCat_id(e.currentTarget.value);
              }}
            >
              {props.category.list.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <input
            type="text"
            placeholder="prix €"
            value={price}
            onChange={(e) => {
              setPrice(e.currentTarget.value);
            }}
          />{" "}
          <input type="submit" value="Enregistrer" name="Enregistrer" />
        </form>
      </MainContainer>
    </Modal>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
