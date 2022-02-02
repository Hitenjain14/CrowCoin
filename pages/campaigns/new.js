import React, { useState } from 'react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useRouter } from 'next/router';

function New() {
  const router = useRouter();
  const [contri, setContri] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getContri = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      if (contri === '') {
        throw { message: 'enter some amount' };
      }
      await factory.methods.CreateCampaign(contri).send({
        from: accounts[0],
      });
      router.push('/');
    } catch (err) {
      setContri('');
      setErrMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <h3>Create Campaign</h3>
        <Form onSubmit={getContri} error={errMessage ? true : false}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              value={contri}
              onChange={(e) => {
                setContri(e.target.value);
              }}
              label="wei"
              labelPosition="right"
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

export default New;
