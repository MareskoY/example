module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/QeOGcSZu6HDP84HhEamNbnASABqi5li-',
        blockNumber: 12016700,
      }
    }
  }
};
