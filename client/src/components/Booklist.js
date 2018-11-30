import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Collection, CollectionItem } from "react-materialize";

const getBooksQuery = gql`
  {
    books {
      name
    }
  }
`;
class Booklist extends React.Component {
  componentWillMount() {}
  render() {
    const { books } = this.props.data;
    console.log(books);
    return (
      <div>
        <Collection>
          {books &&
            books.map(book => (
              <CollectionItem href="#">{book.name}</CollectionItem>
            ))}
        </Collection>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(Booklist);
