import { NextApiRequest, NextApiResponse } from 'next';
import { handleAuthCallback } from 'shopify-nextjs-toolbox'
import { storeSession } from "@libs/firebase";

const afterAuth = async( req: NextApiRequest, res: NextApiResponse, accessToken: any ) => {
  // save accessToken with the shop
  storeSession( { query: req.query as any, accessToken } );
  // redirect is handled by handleAuthCallback
};

export default handleAuthCallback(afterAuth);
