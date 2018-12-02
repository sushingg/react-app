import React from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Logout from './Logout';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Product from './components/Product/Products';
import Cart from './components/cartside';
import Home from './components/HomepageLayout';
const AUTH_TOKEN = 'auth-token'
//uri: 'https://sushingg-api.herokuapp.com/graphql',http://localhost:4000/graphql
const client = new ApolloClient({
	uri: 'https://sushingg-api.herokuapp.com/graphql',
	request: async (operation) => {
		const token = localStorage.getItem(AUTH_TOKEN)
		operation.setContext({
		  headers: {
			'x-access-token': token
		  }
		});
	}
});

const App = () => (
  <ApolloProvider client={client}>

	<Home>
	<Route exact path='/login' component={Login} />
	<Route exact path="/" component={Products}/>
	<Route path='/logout' component={Logout} />
	<Route path="/p/:slug" component={Product}/>
	</Home>
	<Footer/>

  </ApolloProvider>

);

export default App;
