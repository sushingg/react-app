import React, { Component } from "react";
import { CartContext } from "./CartContext";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
const MY_QUERY = gql`
  query MY_QUERY {
    me {
      id
      name
      email
      type
    }
  }
`;

const AUTH_TOKEN = "auth-token";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("items") || "[]"),
      price: localStorage.getItem("price") || "0",
      itemSum: localStorage.getItem("itemSum") || "0",
      user: undefined,
      token: localStorage.getItem(AUTH_TOKEN) || undefined
    };
    this.pitem = [];
  }
  checklogin = () => {
    if (!this.state.user && this.state.token) {
      this.runQuery();
    }
  };
  async runQuery() {
    try {
      const res = await this.props.client.query({
        query: MY_QUERY
      });
      if (!res) {
        localStorage.removeItem(AUTH_TOKEN);
      }
      this.setState({
        user: res.data.me
      });
      this.updatesum();
    } catch (e) {
      console.log("Unexpected error occurred");
      localStorage.removeItem(AUTH_TOKEN);
      this.setState({
        user: undefined,
        token: undefined
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  updatesum() {
    this.setState({
      price:
        this.state.items.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0
        ) || "0",
      itemSum:
        this.state.items.reduce((acc, { quantity }) => acc + quantity, 0) || "0"
    });
    localStorage.setItem("price", this.state.price);
    localStorage.setItem("itemSum", this.state.itemSum);
  }
  onAddToCart = this.onAddToCart.bind(this);
  async onAddToCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    if (index >= 0) {
      var newArray = [...this.state.items];
      newArray[index].quantity += 1;
      this.setState({
        items: newArray
      });
    } else {
      p.quantity = 1;
      await this.setState({
        items: [...this.state.items, p]
      });
    }
    this.pitem = JSON.parse(localStorage.getItem("items") || "[]");
    this.pitem = [...this.pitem, p];
    await localStorage.setItem("items", JSON.stringify(this.state.items));
    this.updatesum();
  }
  onSetCartValue = this.onSetCartValue.bind(this);
  async onSetCartValue(p, value) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    value = parseInt(value, 10);
    if (!value || value < 1) {
      value = 1;
    }

    if (index >= 0) {
      var newArray = [...this.state.items];
      newArray[index].quantity = value;
      this.setState({
        items: newArray
      });
    }
    this.pitem = JSON.parse(localStorage.getItem("items") || "[]");
    this.pitem = [...this.pitem, p];
    await localStorage.setItem("items", JSON.stringify(this.state.items));
    this.updatesum();
  }
  onDeleteFromCart = this.onDeleteFromCart.bind(this);
  async onDeleteFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    var newArray = [...this.state.items];
    newArray.splice(index, 1);
    this.setState({
      items: newArray
    });
    await localStorage.setItem("items", JSON.stringify(newArray));
    await this.updatesum();
  }
  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  async onRemoveFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    var newArray = [...this.state.items];
    if (this.state.items[index].quantity > 1) {
      newArray[index].quantity -= 1;
      this.setState({
        items: newArray
      });
    } else {
      newArray.splice(index, 1);
      this.setState({
        items: newArray
      });
    }
    await localStorage.setItem("items", JSON.stringify(newArray));
    await this.updatesum();
  }
  onClearCart = this.onClearCart.bind(this);
  onClearCart() {
    this.setState({
      items: []
    });
    localStorage.setItem("items", []);
    localStorage.setItem("price", 0);
    localStorage.setItem("itemSum", 0);
    this.updatesum();
  }
  onLogout = this.onLogout.bind(this);
  onLogout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.clear();
    this.setState({
      token: localStorage.getItem(AUTH_TOKEN) || undefined,
      user: undefined
    });
    this.updatesum();
    this.forceUpdate();
  }
  onLogin = this.onLogin.bind(this);
  onLogin() {
    this.runQuery();
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          items: this.state.items,
          price: this.state.price,
          itemSum: this.state.itemSum,
          user: this.state.user,
          onLogout: this.onLogout,
          onLogin: this.onLogin,
          onAddToCart: this.onAddToCart,
          onRemoveFromCart: this.onRemoveFromCart,
          onDeleteFromCart: this.onDeleteFromCart,
          onSetCartValue: this.onSetCartValue,
          onEditCartItem: this.onEditCartItem,
          onEditCart: this.onEditCart,
          onClearCart: this.onClearCart
        }}
      >
        <>
          {this.checklogin()}
          {this.props.children}
        </>
      </CartContext.Provider>
    );
  }
}

export default withApollo(Inventory);
