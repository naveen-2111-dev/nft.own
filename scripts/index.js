import { ethers } from "ethers";
import fs from "node:fs";
import path from "node:path";
import config from "../hardhat.js";

async function main() {
  console.log("deploying...");
  const contract_json = path.resolve(
    process.cwd(),
    "artifacts/contracts/NFT.sol/NFTs.json"
  );

  const data = JSON.parse(fs.readFileSync(contract_json, "utf-8"));
  const provider = new ethers.JsonRpcProvider(config.networks.sepolia.url);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const NFTFactory = new ethers.ContractFactory(
    data.abi,
    data.bytecode,
    signer
  );
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
