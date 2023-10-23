require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  
  hardhat: {
    gas:20000000,
    gasPrice: 1000000000,
  },

};
