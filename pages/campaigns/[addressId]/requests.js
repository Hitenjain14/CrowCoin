import React from 'react';
import { Button, Icon, Label, Menu, Table } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import createCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';
import { useRouter } from 'next/router';

function ReqIndex(props) {
  const router = useRouter();
  const { addressId } = router.query;
  console.log(props.approversCount);
  const getRows = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          address={addressId}
          id={index}
          approversCount={props.approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <div>
        <h3>Requests</h3>
        <Link href={`/campaigns/${addressId}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: '10px' }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>

              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{getRows()}</Table.Body>
        </Table>
        <div>Found {props.requests.length} requests</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { addressId } = context.query;

  const campaign = createCampaign(addressId);

  const requestCount = await campaign.methods.numRequests().call();

  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(requestCount)
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    props: { requests: JSON.parse(JSON.stringify(requests)), approversCount },
  };
}

export default ReqIndex;
