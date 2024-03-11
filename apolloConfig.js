import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
  } from "@apollo/client";
import { getAccessToken } from "./utils/localstorageHelper";
  
  
  const httpLink = new HttpLink({ uri: process.env.NEXT_APP_GRAPHQL_URI });
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: getAccessToken(),
      },
    }));
  
    return forward(operation);
  });
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authMiddleware, httpLink]),
  });
  
  export default client;
  