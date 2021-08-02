import { gql } from "@apollo/client";

export const MARK_AS_VIP = gql`
    mutation markAsVIP( $id: ID!, $tags: [String!]! ) {
        tagsAdd( id: $id, tags: $tags ) {
            node {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

export const REMOVE_VIP = gql`
    mutation removeVip( $id: ID!, $tags: [String!]! ) {
        tagsRemove( id: $id, tags: $tags ) {
            node {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

/**
 * This is how a normal mutation on the customer would look like
 * But this would overwrite all tags already currently on the customer and we want to append to it
 * More info on customerUpdate: https://shopify.dev/api/admin/graphql/reference/customers/customerupdate
 * More info on tagsAdd: https://shopify.dev/api/admin/graphql/reference/common-objects/tagsadd
 */
export const NORMAL_CUSTOMER_UPDATE = gql`
    mutation markAsVIP( $id: ID!, $tags: [String!]! ) {
        customerUpdate( input: { id: $id, tags: $tags } ) {
            customer {
                id
                tags
            }
            userErrors {
                field
                message
            }
        }
    }
`;