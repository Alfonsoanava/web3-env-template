const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying SendUSDC contract...");

  const SendUSDC = await hre.ethers.getContractFactory("SendUSDC");
  const sendUSDC = await SendUSDC.deploy();

  await sendUSDC.waitForDeployment();
  const address = await sendUSDC.getAddress();

  console.log(`✅ SendUSDC deployed to: ${address}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});