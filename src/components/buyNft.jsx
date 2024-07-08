import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Swal from 'sweetalert2';


const ContractAddress = '0x2a0889cb39d7f2452c21760D8967E6f3978f1b4f';
const abi =  [
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
function BuyNft() {
    const [nfts, setNfts] = useState([]);
 

    useEffect(() => {
        const getAllLandNfts = async () => {
            if (typeof window.ethereum === 'undefined') {
                console.error("MetaMask is not installed");
                return;
            }
            try {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const connectedAddress = accounts[1];
                const marketContract = new web3.eth.Contract(abi, ContractAddress);

                if (typeof marketContract.methods.getAllLandListedNfts !== 'function') {
                    throw new Error('Method getAllLandListedNfts not found in ABI');
                }
                console.log(connectedAddress)
                const GetAllLandNfts = await marketContract.methods.getAllLandListedNfts().call();
                console.log(GetAllLandNfts);
                const processedNfts = await Promise.all(GetAllLandNfts.map(async (nft) => {
                    try {
                        const response = await fetch(nft.uriData);
                        const metadata = await response.json();
                        return {
                            price: web3.utils.fromWei(nft.listedData.price, 'ether'),
                            tokenId: nft.listedData.tokenId,
                            listCount:nft.listCount,
                            ...metadata
                        };
                    } catch (error) {
                        console.error('Error fetching or parsing metadata:', error);
                        return null;
                    }
                }));
                const validNfts = processedNfts.filter(nft => nft !== null);
                setNfts(validNfts);

            } catch (error) {
                console.error('Error fetching NFTs:', error);
            }
        };

        getAllLandNfts();
    }, []);

    const handlebuyLandNft = async (totalPrice,token) => {
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const connectedAddress = accounts[0];
            const marketContract = new web3.eth.Contract(abi, ContractAddress);
            const correctToken = (Number(token));
            const weiPrice = web3.utils.toWei(totalPrice, 'ether');
            console.log(correctToken,weiPrice,connectedAddress)
           const buyNft= await marketContract.methods.buyLandNft(correctToken, weiPrice).send({
                from: connectedAddress,
                value: weiPrice
            });

            if (buyNft) {
                Swal.fire(
                    'Success!',
                    'Your NFT was Buy successfully.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to Buy your NFT.',
                    'error'
                );
            }        } catch (error) {
            console.error('Error purchasing NFT:', error);
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                      <div class="container-fluid">
                        <a class="navbar-brand" href="#">NftMarketPlace</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                              <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">Mint and Approve</a>
                            </li>
                           
                          </ul>
                         
                        </div>
                      </div>
                    </nav>
                    <h1 className='m-3'>Buy NFT</h1>

                    {nfts.length > 0 ? (

                        nfts.map(nft => (
                            <div className="col-sm-3 mt-2 mb-2" key={nft.tokenId}>
                                <div className="card">
                                    <img height={300} width={'100%'} src={nft.image} alt={nft.name} />
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="card-title"> {nft.tokenId}{nft.name}</p>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="card-text">Price: {nft.price} ETH</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={() => handlebuyLandNft(nft.price,nft.listCount)}>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No NFTs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BuyNft;
