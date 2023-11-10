export const Project_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_leaser",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            }
        ],
        "name": "endRet1",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_leaser",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_ProportName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_RentEnd",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_leaserAmount",
                "type": "uint256"
            }
        ],
        "name": "getRent1",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "_houseShopNumber",
                "type": "uint16"
            }
        ],
        "name": "removeHouseShopEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_AssetName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "types1",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "setHouseShop1",
        "type": "event"
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
        "name": "EndRentEarly",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "leaser",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "HouseShopNumber",
                "type": "uint16"
            },
            {
                "internalType": "bool",
                "name": "leaserActive",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "ownerActive",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "active",
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
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "PropertyMap",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "AssetName",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "MonthPrice",
                "type": "uint256"
            },
            {
                "internalType": "enum Project.HouseShop",
                "name": "types",
                "type": "uint8"
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
            }
        ],
        "name": "balances",
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
            }
        ],
        "name": "blackList",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
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
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "complains",
        "outputs": [
            {
                "internalType": "address",
                "name": "leaser",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "HouseShopNumber",
                "type": "uint16"
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "decision",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "rightful",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "active",
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
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contracts",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "leaser",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "ProportName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "RentPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "RentStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "RentEnd",
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
                "name": "_leaser",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            },
            {
                "internalType": "string",
                "name": "_reason",
                "type": "string"
            }
        ],
        "name": "createComplain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_complainant",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_compNumber",
                "type": "uint16"
            },
            {
                "internalType": "string",
                "name": "_decision",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "_rightful",
                "type": "bool"
            }
        ],
        "name": "decisionOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_leaser",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            }
        ],
        "name": "endRent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_leaser",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_contractMappingOwnerNumber",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            }
        ],
        "name": "endRentEarly1",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_leaser",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_HouseShopNumber",
                "type": "uint16"
            },
            {
                "internalType": "string",
                "name": "_PropertyName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_RentEnd",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_leaserAmount",
                "type": "uint256"
            }
        ],
        "name": "getRent",
        "outputs": [],
        "stateMutability": "payable",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_EndRentEarlyMappingNumber",
                "type": "uint16"
            },
            {
                "internalType": "bool",
                "name": "_active",
                "type": "bool"
            }
        ],
        "name": "ownerLeaserResponseEarlyEnd",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_houseShopNumber",
                "type": "uint16"
            }
        ],
        "name": "removeHouseShop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_AssetName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "types1",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "setHouseShop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];