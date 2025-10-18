// check-env.js
require("dotenv").config();

function mask(str) {
  return str ? str.slice(0, 38) + "…" : "<missing>";
}

console.log("✅ Environment Status Check");
console.log("---------------------------");
console.log("MAINNET_RPC_URL:", mask(process.env.MAINNET_RPC_URL));
console.log("SEPOLIA_RPC_URL:", mask(process.env.SEPOLIA_RPC_URL));
console.log("PRIVATE_KEY length:", (process.env.PRIVATE_KEY || "").length);
console.log("PRIVATE_KEY startsWith 0x:", (process.env.PRIVATE_KEY || "").startsWith("0x"));
console.log("ETHERSCAN_API_KEY length:", (process.env.ETHERSCAN_API_KEY || "").length);