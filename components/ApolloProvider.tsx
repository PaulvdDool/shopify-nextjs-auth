import { ApolloClient, ApolloProvider as Provider, HttpLink, InMemoryCache } from "@apollo/client";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { useShopOrigin } from "shopify-nextjs-toolbox";

export default function ApolloProvider( { children }: { children: any } ) {
  const app = useAppBridge();
  const shopName = useShopOrigin();
  const client = new ApolloClient( {
    link: new HttpLink( {
      credentials: 'same-origin',
      fetch: authenticatedFetch( app ),
      uri: `api/graphql?shop=${shopName}`,
    } ),
    cache: new InMemoryCache(),
  } );

  return <Provider client={ client }>{ children }</Provider>;
}