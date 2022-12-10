//@ts-nocheck
import web3 from './web3';

const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minimum',
        type: 'uint256',
      },
    ],
    name: 'CreateCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deployedCampaigns',
    outputs: [
      {
        internalType: 'contract Campaign',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDeployedCampaigns',
    outputs: [
      {
        internalType: 'contract Campaign[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const instance = new web3.eth.Contract(
  abi,
  '0x339e7091473F94ec1dB031Cb5b175932eC057a94'
);

export default instance;
