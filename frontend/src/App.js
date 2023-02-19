import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// Components
import BookList from "./Components/BookList/BookList";
import AddBook from "./Components/AddBook/AddBook";


// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;