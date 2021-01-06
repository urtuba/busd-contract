var HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "";
const walletChildNum = 0;
const networkAddress = "https://mainnet.infura.io/v3/<your-api-key>";

const PrivateKeyProvider = require('@truffle/hdwallet-provider');
const PrivateKeys = [
  '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63',
  '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
  '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'
]
const privateKeyProvider = new PrivateKeyProvider(PrivateKeys,'http://127.0.0.1:8545', 0, 3);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545, // ganache-cli
      network_id: '*', // Match any network id
      gas: 6700000,
      gasPrice: 0x01
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8321,
      gas: 10000000000000,
      gasPrice: 0x01
    },
    mainnet: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(mnemonic, networkAddress, walletChildNum)
      },
    },
    besu: {
      network_id: "*",
      provider: privateKeyProvider,
      gas: 6700000,   // <--- Twice as much
      gasPrice: 0x35
    }
  },
  compilers: {
    solc: {
      version: "v0.4.24+commit.e67f0147"  // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
