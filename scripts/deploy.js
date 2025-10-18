const hre = require("hardhat");

// Minimal contract source (in-memory) for a quick test
// If you already have contracts, skip this and deploy yours instead.
const SOURCE = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.24;
  contract Ping { function ping() external pure returns (string memory){ return "pong"; } }
`;

async function main() {
  // If you already have a Ping.sol file in /contracts, remove this block.
  const fs = require("fs");
  const path = require("path");
  const cdir = path.join(process.cwd(), "contracts");
  if (!fs.existsSync(cdir)) fs.mkdirSync(cdir);
  const pingPath = path.join(cdir, "Ping.sol");
  if (!fs.existsSync(pingPath)) fs.writeFileSync(pingPath, SOURCE);

  console.log("🛠  Compiling…");
  await hre.run("compile");

  console.log("🚀 Deploying Ping…");
  const Factory = await hre.ethers.getContractFactory("Ping");
  const instance = await Factory.deploy();
  const tx = instance.deploymentTransaction();
  if (tx && tx.hash) console.log("   tx:", tx.hash);
  await instance.waitForDeployment();
  const addr = await instance.getAddress();

  console.log("🎉 Deployed Ping at:", addr);
}

// Run main
main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exitCode = 1;
});