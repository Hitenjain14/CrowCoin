import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import createCampaign from '../ethereum/campaign';
import { useRouter } from 'next/router';

function RequestRow(props) {
  const { Row, Cell } = Table;
  const router = useRouter();

  const onApprove = async () => {
    const accounts = web3.eth.getAccounts();
    const campaign = createCampaign(props.address);
    try {
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });
      router.replace(router.asPath);
    } catch (err) {}
  };

  const onFinalize = async () => {
    const accounts = web3.eth.getAccounts();
    const campaign = createCampaign(props.address);
    try {
      const manager = await campaign.methods.manager().call();
      if (manager !== accounts[0]) {
        throw { message: 'You are not the manager' };
      }
      await campaign.methods.finalizeRequest(props.id).send({
        from: accounts[0],
      });
      router.replace(router.asPath);
    } catch (err) {}
  };

  const readyToFinalize =
    props.request.approvalCount >= props.approversCount / 2;

  return (
    <Row
      disabled={props.request.complete}
      positive={readyToFinalize && !props.request.complete}
    >
      <Cell>{props.id}</Cell>
      <Cell>{props.request.description}</Cell>
      <Cell>{web3.utils.fromWei(props.request.value, 'ether')}</Cell>
      <Cell>{props.request.recipient}</Cell>
      <Cell>
        {props.request.approvalCount} / {props.approversCount}
      </Cell>
      <Cell>
        {!props.request.complete && (
          <Button color="green" basic onClick={() => onApprove()}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!props.request.complete && (
          <Button color="teal" basic onClick={() => onFinalize()}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
