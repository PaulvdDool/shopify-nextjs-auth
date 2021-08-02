import { SessionInterface } from "@shopify/shopify-api";
import { Session } from "@shopify/shopify-api/dist/auth/session";
import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "shopify-nextjs-app.firebaseapp.com",
  projectId: "shopify-nextjs-app",
  storageBucket: "shopify-nextjs-app.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

if ( !firebase.apps.length ) {
  firebase.initializeApp( config );
}

const firestore = firebase.firestore();

export { firestore };

export const storeSession = async ( { query, accessToken }: { query: { code: string, hmac: string, host: string, shop: string, state: string, timestamp: string }, accessToken: { access_token: string, scope: string } } ) => {
  const resp = await firestore.collection( 'sessions' ).doc( query.shop ).set( { ...query, accessToken: accessToken.access_token, scope: accessToken.scope } )
  return true;
}

export const getSession = async ( shop: string ) => {
  const snapshot = await firestore.collection( 'sessions' ).doc( shop ).get();
  return snapshot.data();
}

export const deleteSession = async ( shop: string ) => {
  const resp = await firestore.collection( 'sessions' ).doc( shop ).delete();
  return true;
}