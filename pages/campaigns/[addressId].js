//@ts-nocheck
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import createCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Link from 'next/link';

function Show({ numRequests, manager, contri, approversCount, balance }) {
  const router = useRouter();
  const { addressId } = router.query;

  const getCards = () => {
    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description:
          'Manager created this campaign and will create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: contri,
        meta: 'Minimum Contribution(wei)',
        description:
          'You must contribute this much Wei to become a contributor',
      },
      {
        header: numRequests,
        meta: 'Number of requests',
        description:
          'A request tries to withdraw money from the contract. Requests have to be approved by majority of the approvers',
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance(eth)',
        description: 'The balance is how much money this campaign has left',
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h2>Campaign {addressId}</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{getCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={addressId} minContri={contri} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Link href={`/campaigns/${addressId}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { addressId } = context.query;

  const campaign = createCampaign(addressId);

  const numRequests = await campaign.methods.numRequests().call();
  const manager = await campaign.methods.manager().call();
  const contri = await campaign.methods.minimumContribution().call();
  const approversCount = await campaign.methods.approversCount().call();
  const balance = await web3.eth.getBalance(campaign.options.address);

  return {
    props: { numRequests, manager, contri, approversCount, balance },
  };
}

export default Show;
