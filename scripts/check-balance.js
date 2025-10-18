require('dotenv').config();
const { ethers } = require('ethers');

const RPC = process.env.SEPOLIA_RPC_URL || process.env.MAINNET_RPC_URL;
const ADDR = process.env.WALLET_ADDR;

if (!RPC)  { console.error('Missing RPC URL in .env'); process.exit(1); }
if (!ADDR) { console.error('Missing WALLET_ADDR in .env'); process.exit(1); }

(async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const balWei = await provider.getBalance(ADDR);
  console.log('RPC:', RPC.slice(0, 50) + '…');
  console.log('ADDR:', ADDR);
  console.log('ETH balance:', ethers.utils.formatEther(balWei));
})().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
