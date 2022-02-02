//@ts-nocheck
import factory from '../ethereum/factory';
import { useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home(props) {
  const campaigns = props.campaigns;

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${encodeURIComponent(address)}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h1>Open Campaigns</h1>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {campaigns.length > 0 && <>{renderCampaigns()}</>}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: { campaigns },
  };
}
