import { useMutation, useQuery } from "@apollo/client";
import { Badge, Card, Page, Pagination, ResourceItem, ResourceList, Stack } from "@shopify/polaris";
import React, { useState } from "react";
import { GET_CUSTOMERS } from "@libs/queries/CustomerQueries";
import { CustomerModel } from "@libs/models/customer.model";
import { MARK_AS_VIP, REMOVE_VIP } from "@libs/mutations/CustomerMutations";

export default function Customers() {
  const [ selectedCustomers, setSelectedCustomers ] = useState<Array<string>>([]);
  const [ markAsVIP, { data: vips, loading: vipLoading, error: vipError } ] = useMutation( MARK_AS_VIP, {
    onCompleted: ( data: any ) => setSelectedCustomers( [] ),
  } );
  const [ removeVIP, { data: noVips, loading: noVipLoading, error: noVipError } ] = useMutation( REMOVE_VIP );
  let customerVariables = {
    firstNum: 50,
    lastNum: null,
    afterCursor: null,
    beforeCursor: null
  };
  const { loading, error, data: getCustomerResp, refetch } = useQuery( GET_CUSTOMERS, {
    variables: customerVariables
  } );

  const customers: Array<CustomerModel> = getCustomerResp ? getCustomerResp.customers.edges.map( edge => ( { cursor: edge.cursor, ...edge.node } ) ) : [];
  const hasNextPage: boolean = getCustomerResp ? getCustomerResp.customers.pageInfo.hasNextPage : false;
  const hasPreviousPage: boolean = getCustomerResp ? getCustomerResp.customers.pageInfo.hasPreviousPage : false;

  const handleSelectedCustomerChange = ( customers: Array<string> ) => {
    setSelectedCustomers( customers );
  }

  const markSelectedCustomersAsVIP = () => {
    selectedCustomers.forEach( ( customerId: string ) => {
      markAsVIP( {
        variables: { id: customerId, tags: [ 'VIP' ] },
        refetchQueries: [
          { query: GET_CUSTOMERS, variables: customerVariables },
          'getCustomerResp'
        ]
      } )
    } )
  }

  const handleNextPage = ( cursor: string ) => {
    customerVariables = {
      firstNum: 50,
      afterCursor: cursor,
      lastNum: null,
      beforeCursor: null
    }
    refetch( customerVariables );
  }

  const handlePreviousPage = ( cursor: string ) => {
    customerVariables = {
      firstNum: null,
      afterCursor: null,
      lastNum: 50,
      beforeCursor: cursor
    }
    refetch( customerVariables );
  }

  const RenderCustomer = ( customer: CustomerModel ) => {

    const shortCutActions = customer.tags.includes( 'VIP' ) ? [
      {
        content: 'Remove VIP status',
        accessibilityLabel: `Remove VIP status for ${customer.displayName}`,
        onAction: () => handleRemoveVIPStatus( customer.id )
      }
    ] : null;

    const handleRemoveVIPStatus = ( customerId: string ) => {
      removeVIP( {
        variables: { id: customerId, tags: [ 'VIP' ] },
        refetchQueries: [
          { query: GET_CUSTOMERS, variables: customerVariables },
          'getCustomerResp'
        ]
      } )
    }

    if ( loading ) return <p>Loading...</p>;
    if ( error ) return <p>Error</p>;
    return <ResourceItem id={customer.id} shortcutActions={shortCutActions} url="/">
      <Stack>
        <strong>{ customer.displayName }</strong>
        { customer.tags.filter( ( tag: string ) => tag === 'VIP' ).map( ( tag: string, index: number ) => (
          <Badge key={index} status="attention">{tag}</Badge>
        ) ) }
      </Stack>
    </ResourceItem>
  }

  return (
    <Page>
      <Card title="Customers">
        <ResourceList items={customers}
                      renderItem={RenderCustomer}
                      selectedItems={selectedCustomers}
                      onSelectionChange={handleSelectedCustomerChange}
                      promotedBulkActions={[
                        {
                          content: 'Mark as VIP',
                          onAction: () => markSelectedCustomersAsVIP()
                        }
                      ]}
        />
        { hasPreviousPage || hasNextPage ?
          <Stack vertical={true} alignment="center">
            <Pagination hasNext={hasNextPage}
                      onNext={ () => handleNextPage( customers[customers.length - 1].cursor ) }
                      hasPrevious={hasPreviousPage}
                      onPrevious={ () => handlePreviousPage( customers[0].cursor ) }
            />
          </Stack>
        : null }
      </Card>
    </Page>
  )
}