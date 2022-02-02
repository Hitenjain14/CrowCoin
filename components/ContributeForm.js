import React, { useState, useEffect } from 'react';
import { Form, Message, Input, Button } from 'semantic-ui-react';
import createCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Router, { useRouter } from 'next/router';

function ContributeForm({ address, minContri }) {
  const [contri, setContri] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getContri = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrMessage('');
    const campaign = createCampaign(address);
    try {
      const inWei = web3.utils.toWei(contri, 'ether');
      if (inWei < minContri) {
        throw { message: 'Value less than minimum contribution' };
      }
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contri, 'ether'),
      });
      router.replace(router.asPath);
    } catch (err) {
      setContri('');
      setErrMessage(err.message);
      //   setTimeout(() => setErrMessage(''), 2400);
    }
    setContri('');
    setLoading(false);
  };

  return (
    <div>
      <Form onSubmit={getContri} error={errMessage ? true : false}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={contri}
            onChange={(e) => {
              setContri(e.target.value);
            }}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={errMessage} />
        <Button loading={loading} primary type="submit">
          Contribute!
        </Button>
      </Form>
    </div>
  );
}

export default ContributeForm;
