require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Check if PRIVATE_KEY is defined
if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat network
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/EDwoRElEAOG9sl_ODELQY__LldydlAZj", // Alchemy RPC URL
      accounts: [process.env.PRIVATE_KEY], // Wallet private key (no quotes or "0x")
    },
  },
};