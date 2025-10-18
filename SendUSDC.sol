// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract SendUSDC {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function sendUSDC(address _token, address _to, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can send");
        IERC20(_token).transfer(_to, _amount);
    }
}