import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import createCampaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';

function CreateReq() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [val, setVal] = useState('');
  const [address, setAddress] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { addressId } = router.query;

  const sendReq = async (event) => {
    event.preventDefault();
    event.preventDefault();
    setLoading(true);
    setErrMessage('');
    const campaign = createCampaign(addressId);
    try {
      if (!web3.utils.isAddress(address)) {
        throw { message: 'Recipient Address is invalid' };
      }
      const accounts = await web3.eth.getAccounts();
      const manager = await campaign.methods.manager().call();
      console.log(manager);
      if (manager !== accounts[0]) {
        throw {
          message: 'Please use the address from which u created the campaign',
        };
      }

      await campaign.methods
        .createRequest(description, web3.utils.toWei(val, 'ether'), address)
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${addressId}/requests`);
    } catch (err) {
      setErrMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <Link href={`/campaigns/${addressId}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={sendReq} error={errMessage ? true : false}>
          <Form.Field>
            <label>Description</label>
            <Input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Field>
          <Message error header="Oops!" content={errMessage} />
          <Button loading={loading} type="submit" primary>
            Create!
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default CreateReq;
