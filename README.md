# Paribu-Project
Smart Contract

Hello, in this agreement people can rent their houses or shops among themselves.

There are 4 mappings for keep contracts in struct (leaser and owner), property(struct) and balances(uint).

Sethouseshop allows users to log into the system at their homes or stores. Here property owners enter a monthly rental fee.

SendEtherToContract function requires users to send money to the contract. In this way, they can rent the assets of others.

Only the address that deploys the contract can use the withdraw function. Contract is a function for those who forget their money or send too much money.

getRent function allows renting assets of others. Since it is calculated monthly. The specified number of months is converted to days and added to block.timestamp and this number becomes rentEnd.

EndRent function allows asset owners to reactivate their assets from expired contracts, that is, to turn the bool expression in the property into false. In this way, it can be rented again.

removeHouseShop function allows asset owners to delete that asset if it is not rented.

Internal functions were used for our requires in other main functions.


