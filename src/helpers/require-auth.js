/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Redirect } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import { setAllProduct } from "./function";
import { loadUserInfo } from "../actions/user/userActions";
import { loadProductInfo } from "../actions/product/productActions";
import { loadCatInfo } from "../actions/category/catActions";
import { getProductAll } from "../api/productApi";
import { getCatAll } from "../api/catApi";

export default function (ChildComponent, withAuth = false) {
  class RequireAuth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        redirectNoAdmin: false,
      };
    }

    componentDidMount = async () => {
      const token = window.localStorage.getItem("collemavie");
      if (token === null) {
        if (withAuth) {
          this.setState({ redirect: true });
        }
      } else {
        if (this.props.user.isLogged === false) {
          axios
            .get(config.api_url + "/api/v1/checkToken", {
              headers: { "x-access-token": token },
            })
            .then((response) => {
              if (response.data.status !== 200) {
                if (withAuth) {
                  this.setState({ redirect: true });
                }
              } else {
                this.props.loadUserInfo(response.data.user);
              }
            });
        }
      }
      if (this.props.products.list.length == 0) {
        getProductAll().then((res) => {
          if (res.status === 200) {
            const newProduct = setAllProduct(res);
            console.log(newProduct);
            this.props.loadProductInfo(newProduct);
          }
        });
      }
      if (this.props.category.list.length == 0) {
        getCatAll().then((res) => {
          if (res.status === 200) {
            this.props.loadCatInfo(res.cat);
          }
        });
      }
    };

    render() {
      if (this.state.redirect) {
        return <Redirect to="/login" />;
      }
      return <ChildComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = {
    loadUserInfo,
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

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
