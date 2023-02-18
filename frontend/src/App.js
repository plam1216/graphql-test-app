import { ApolloClient, ApolloProvider } from '@apollo/client'

// Components
import BookList from "./BookList/BookList";


// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;