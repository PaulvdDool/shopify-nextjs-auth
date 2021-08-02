import React from 'react';
import '../styles/globals.css'
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { useShopOrigin } from 'shopify-nextjs-toolbox';
import PolarisProvider from "@components/PolarisProvider";
import RoutePropagator from "@components/RoutePropagator";

import "@shopify/polaris/dist/styles.css";
import ApolloProvider from "@components/ApolloProvider";

export default function MyApp({ Component, pageProps }) {
  const shopOrigin = useShopOrigin();
  if (typeof window == "undefined" || !window.location || !shopOrigin) {
    return (
      <></>
    );
  }

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    forceRedirect: true,
    shopOrigin
  };

  return (
    <PolarisProvider>
      <AppBridgeProvider config={config}>
        <RoutePropagator />
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}