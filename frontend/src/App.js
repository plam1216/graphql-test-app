import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// Components
import BookList from "./BookList/BookList";


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
      </div>
    </ApolloProvider>
  );
}

export default App;