# Shopify App Example

## Tech Stack
NextJS
GraphQL
Shopify Node API
Firebase
TypeScript

This Shopify example app has been build using NextJS. It does requests to the Shopify API with GraphQL. It uses [Shopify NextJS Toolbox](https://github.com/ctrlaltdylan/shopify-nextjs-toolbox) that leverages the Shopify Node API for authorization and adds the _new_ session tokens to every request for validation.

## Getting Started
Shopify Partner account and Shopify dev store required.

### Setup
Change the name for the `.env.example` file to `.env.local` and fill in the value for each variable. The ngrok callback URL can be set up in the next step.
```
SHOPIFY_API_PUBLIC_KEY='Get the Shopify API from your Partner Dashboard'
SHOPIFY_API_PRIVATE_KEY='Get the Shopify private key from your Partner Dashboard'
NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY='Same as SHOPIFY_API_PUBLIC_KEY but available for NextJS'
SHOPIFY_AUTH_CALLBACK_URL='https://unique-string.ngrok.io/api/auth/callback'
SHOPIFY_AUTH_SCOPES='read_customers,write_customers,read_orders'
HOME_PATH = '/customers'
NEXT_PUBLIC_FIREBASE_API_KEY='Firebase API key'
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=Firebase sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=Firebase app ID
```

### Expose dev environment
To develop locally you need to expose your localhost port with a tunnel. We do this with [ngrok](https://ngrok.io) in this case.  
In `package.json` has a script to run ngrok. It includes a flag for the Europe region which makes it a bit faster when you're in Europe. Remove it if you want to use the US region.
```
npm run ngrok
```

### Launch the NextJS app
```
npm run dev
```