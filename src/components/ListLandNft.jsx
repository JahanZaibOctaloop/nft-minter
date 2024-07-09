import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Web3 from 'web3';

const contractAddress = '0x2e4B2f297b751EaB274e06A7a307d23c54AE23D5';
const marketContract = '0x2a0889cb39d7f2452c21760D8967E6f3978f1b4f'
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            },
            {
                "internalType": "contract IERC721",
                "name": "_landMinting",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_USDCAddress",
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
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
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
        "name": "AddressInsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
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
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
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
        "inputs": [
            {
                "internalType": "address",
                "name": "mintAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokedId",
                "type": "uint256"
            }
        ],
        "name": "NftSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "TokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "stakerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "currentOwnerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "userWithdrawToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "withdrawMonth",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stakeTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "adminAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenDeposit",
                "type": "uint256"
            }
        ],
        "name": "adminDepositToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "adminAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenDeposit",
                "type": "uint256"
            }
        ],
        "name": "adminWithdrawToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "auctionListCount",
        "outputs": [
            {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "listIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "buyLandNft",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endTime",
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
        "name": "getAllLandListedNfts",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "seller",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "count",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "listed",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct NFTMarketplace.ListLand",
                        "name": "listedData",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "listCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "uriData",
                        "type": "string"
                    }
                ],
                "internalType": "struct NFTMarketplace.ListedLandNftTokenId[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "landContract",
        "outputs": [
            {
                "internalType": "contract IERC721",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "listCount",
        "outputs": [
            {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
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
                "name": "_mintContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "listLandNft",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "lockedNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "TokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "stakerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "currentOwnerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "userWithdrawToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "withdrawMonth",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stakeTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextLandListId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
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
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardAmount",
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
                "name": "mintContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "stakerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "stakeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "name": "stakingPeriod",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startTime",
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
        "name": "tokenAddress",
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
        "name": "totalLockedNft",
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
                "name": "mintContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "stakerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "unStakeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "userClaimFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userCount",
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
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userLandListings",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "listed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userListCount",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "user_Staking_Rewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewards",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "month",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
function ListLandNft(props) {
    const [price, setPrice] = useState('');
    const [tokenId, setTokenId] = useState(null);

    const { id } = props;

    useEffect(() => {
        if (id) {
            setTokenId(id);
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const connectedAddress = accounts[0];
            const Contract = new web3.eth.Contract(abi, marketContract);
            const token = Number(tokenId);
            const transaction = Contract.methods.listLandNft(contractAddress, price, token);

            const gas = await transaction.estimateGas({ from: connectedAddress });

            const receipt = await transaction.send({ from: connectedAddress, gas });

            if (receipt.status) {
                Swal.fire(
                    'Success!',
                    'Your NFT was listed successfully.',
                    'success'
                );
                const closeButton = document.querySelector('#ListLandNft .btn-close');
                closeButton.click();
                setPrice('');
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to list your NFT.',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error listing NFT', error);
            Swal.fire(
                'Error!',
                `Error listing NFT: ${error.message}`,
                'error'
            );
        }
    };

    return (
        <div>
            <div className="modal fade" id="ListLandNft" tabIndex="-1" aria-labelledby="ListLandNftLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">List Your Land NFT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <form onSubmit={handleSubmit} className='m-2'>
                                    <input type="text" className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter the price in ETH' />
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">ListLandNft</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListLandNft;
