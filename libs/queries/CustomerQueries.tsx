import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query getCustomers( $firstNum: Int, $lastNum: Int, $afterCursor: String, $beforeCursor: String ) {
      customers( first: $firstNum, last: $lastNum, after: $afterCursor, before: $beforeCursor ) {
          edges {
              cursor
              node {
                  id
                  displayName
                  tags
              }
          }
          pageInfo {
              hasNextPage
              hasPreviousPage
          }
      }
  }
  `;