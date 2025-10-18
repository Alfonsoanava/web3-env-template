// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract SendUSDC {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // 🪙 Send $10 USDC to a recipient
    function sendUSDC(address tokenAddress, address recipient, uint256 amount) external {
        require(msg.sender == owner, "Not authorized");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");

        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= amount, "Not enough USDC in contract");

        bool success = token.transfer(recipient, amount);
        require(success, "Transfer failed");
    }

    // 💰 View how much USDC the contract holds
    function getBalance(address tokenAddress) external view returns (uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }
}