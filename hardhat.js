import dotenv, { configDotenv } from "dotenv";
configDotenv();

export default {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.RPC_KEY}`,
      chainId: 11155111,
    },
  },
};
