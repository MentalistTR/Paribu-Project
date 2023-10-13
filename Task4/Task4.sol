//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract BootcampToken {
    // Some string type variables to identify the token.
    string public name = "Bootcamp Token";
    string public symbol = "BCT";
    uint256 public decimals = 0;

    // We create a boolean locked false here 
    bool internal locked;

    uint256 public totalSupply = 1000000;
    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

   
    constructor() {
      
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

 
    function transfer(address to, uint256 amount) external noReentrant {
  
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

   // this modifier is prevent re-entrancy attack
    modifier noReentrant() {
        require(!locked,"Re-entrancy detected!");
        locked = true;
        _;
        locked = false;
    }
}