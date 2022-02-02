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
  '0xE050C47Ab22FB36f7779c5Ca1B4ae6D5d379Fda3'
);

export default instance;
