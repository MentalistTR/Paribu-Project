# Paribu Hub & Rise In Final Project
This project is a final case project for Rise In Solidity & BNB Paribu Hub Bootcamp.

## Table of Contents 

- [Overview](#başlık-1)
- [Features](#başlık-2)
  - [Prerequisites](#alt-başlık-1)
  - [Installation](#alt-başlık-2)
    
- [Testing](#başlık-1)
- [Contributing](#başlık-2)
- [License](#başlık-2)

## Overview

In this smart contract, users can register two types of assets, house or shop, into the system, and they can register assets other than themselves and the owner of this contract.
addresses can come and rent for a maximum of 1 year.  You can analyze contract on SepoliaTestnet:

https://sepolia.etherscan.io/address/0xA30c2902e6fBD887f5F0F7B9130b17ed14Ff4994#code

## Features

- There are 6 mappings for keep contracts in struct (leaser and owner), property(struct) and balances(uint).

- Sethouseshop allows users to log into the system at their homes or stores. Here property owners enter a monthly rental fee.

- SendEtherToContract function requires users to send money to the contract. In this way, they can rent the assets of others.

- Only the address that deploys the contract can use the withdraw function. Contract is a function for those who forget their money or send too much money.

- getRent function allows renting assets of others. Since it is calculated monthly. The specified number of months is converted to days and added to block.timestamp and this number becomes rentEnd.

- EndRent function allows asset owners to reactivate their assets from expired contracts, that is, to turn the bool expression in the property into false. In this way, it can be rented again.

- removeHouseShop function allows asset owners to delete that asset if it is not rented.

- Createcomplain cuntion allows to leasers that can create any complain in house. Then owner of this contract will response.

- Internal functions were used for our requires in other main functions.

## Getting Started 

Follow these steps to set up the project locally and start participating in web3 auctions.

### Prerequisites

1- Clone the repository:

git clone https://github.com/MentalistTR/Paribu-Project

2- Navigate to the project directory: 
- Open folder in Your Code Editor
- cd Paribu-Project

3- Install hardhat: 
-  npx hardhat

## Testing 

![Ekran Görüntüsü (33)](https://github.com/MentalistTR/Paribu-Project/assets/100069341/4ab1e74d-80f6-4151-9383-5f1248245ade)


## License

This project is licensed under the MIT License.































