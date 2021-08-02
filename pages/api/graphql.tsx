import Shopify from "@shopify/shopify-api";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@libs/firebase";

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
  const shop: string = req.query.shop as string;
  const session = await getSession( shop );
  const client = new Shopify.Clients.Graphql( session.shop, session.accessToken );

  const response = await client.query( {
    data: {
      query: req.body.query,
      variables: req.body.variables
    }
  } );
  res.status( 200 ).json( response.body );
}