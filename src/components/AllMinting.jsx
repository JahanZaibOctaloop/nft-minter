import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import CheckBlance from './Checkblance';

const contractAddress = '0x43d42f23E3285124056eea119b2bB64a374a586b';
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function AllMinting() {
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(0);
  const [to,setTo] = useState(null);
  const[amount,setAmount] =useState(null)
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const initWeb3 = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const instanceWeb3 = new Web3(provider);
      setWeb3(instanceWeb3);
      const accounts = await instanceWeb3.eth.requestAccounts();
      setAccount(accounts[0]);
      const contractInstance = new instanceWeb3.eth.Contract(abi, contractAddress);
      setContract(contractInstance);
    } else {
      console.error('MetaMask Not Install');
    }
  };

  const checkBalance = async (address) => {
    if (contract) {
      try {
        const totalBalance = await contract.methods.balanceOf(address).call();
        const balanceInEther = Web3.utils.fromWei(totalBalance, 'ether');
        setBalance(balanceInEther);
        alert(`Your Total Balance ${balanceInEther}`)
        console.log(`Balance of ${address}: ${balanceInEther}`);
      } catch (error) {
        console.error('Error Checking Balance', error);
      }
    }
  };

  const MintToken = async()=>{
    if(contract){
        try {
             await contract.methods.mint().send({from:account})
             alert(`Token Minted Your Total Blance ${balance}`)
             CheckBlance(account)
        } catch (error) {
            console.error('Error Token Minting',error)
        }
    }
  }

  const sendToken = async (to, amount) => {
    if (contract) {
      try {
        const amountInWei = Web3.utils.toWei(amount, 'ether');
        await contract.methods.transfer(to, amountInWei).send({ from: account });
        alert(`Transferred ${amount} tokens to ${to}`);
        setTo('');
        setAmount('');
        checkBalance(account);
      } catch (error) {
        console.error('Error Sending Token', error);
      }
    }
  };

  useEffect(() => {
    if (web3 && account && contract) {
      checkBalance(account);
    }
  }, [web3, account, contract]);

  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="text-center m-3">Decentralized Application</h1>
        <div className="row">
          <div className="col-sm-4 mt-3">Connected Account</div>
          <div className="col-sm-4 mt-3">{account}</div>
          <div className="col-sm-4 mt-3">Balance: {balance}</div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-3">
            <button className="btn btn-primary" onClick={() => checkBalance(account)}>
              Check Balance
            </button>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-secondary " onClick={() => MintToken(account)}>Mint Token</button>
          </div>
          <div className="col-sm-6">
          <input
              className='form-control'
              placeholder='Enter Receiver Address'
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="text"
            />
            <input
              className='form-control mt-2'
              placeholder='Enter Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="text"
            />
            <button className="btn btn-success mt-2" onClick={() => sendToken(to, amount)}>Send Token</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMinting;
