import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BookList from "./components/Booklist";
import NavbarComponent from "./components/NavbarComponent";

const client = new ApolloClient({
  uri: `http://localhost:3000/graphql`
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div >
        <NavbarComponent/>
        <div className="container">
          <BookList />
        </div>
         
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
