import { ethers } from "ethers";
import fs from "node:fs";
import path from "node:path";
import config from "../hardhat.js";

async function main() {
  console.log("deploying...");
  const contract_json_abi = path.resolve(
    process.cwd(),
    "artifacts/contracts_NFT_sol_NFTs.abi"
  );

  const contract_json_bin = path.resolve(
    process.cwd(),
    "artifacts/contracts_NFT_sol_NFTs.bin"
  );

  const data_abi = JSON.parse(fs.readFileSync(contract_json_abi, "utf-8"));
  const data_bin = fs.readFileSync(contract_json_bin, "utf-8").trim();
  const provider = new ethers.JsonRpcProvider(config.networks.sepolia.url);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const NFTFactory = new ethers.ContractFactory(data_abi, data_bin, signer);
  const factory = await NFTFactory.deploy();
  await factory.waitForDeployment();

  const buildPath = path.join(process.cwd(), "scripts", "build");
  const filePath = path.join(buildPath, "deployment.json");

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, { recursive: true });
  }

  const deploymentData = {
    address: factory.target,
    chain: config.networks.sepolia.chainId,
  };
  fs.writeFileSync(filePath, JSON.stringify(deploymentData, null, 2));
  console.log("NFTFactory deployed to:", factory.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
