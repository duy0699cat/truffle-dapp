const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
 // Configure your compilers
 compilers: {
  solc: {
    version: "0.5.4"
  }
}
var mnemonic = "oil expect puppy prevent rib innocent alpha excess ocean must device autumn"
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      provider: () =>
        new HDWalletProvider(mnemonic,"https://test.vbchain.vn"),
      network_id: '4444',
    }
  }
};