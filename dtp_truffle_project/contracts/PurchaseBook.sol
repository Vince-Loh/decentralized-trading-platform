// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

pragma experimental ABIEncoderV2; // Enable ABIEncoderV2

contract PurchaseBook {
    struct Purchase {
        string ISBN;
        uint256 price;
        string purchaseEmail;
        string purchaseDate;
    }

    mapping(uint256 => Purchase) public purchases;
    uint256 public purchaseCount;

    event ItemPurchased(
        string ISBN,
        uint256 price,
        string purchaseEmail,
        string purchaseDate
    );

    constructor() public {
        purchaseCount = 0;
    }

    receive() external payable {
        // Allows receiving Ethereum
    }

    function purchaseItem(
        string memory _ISBN,
        uint256 _price,
        string memory _purchaseEmail,
        string memory _purchaseDate
    ) public payable {
        require(bytes(_ISBN).length > 0, "ISBN cannot be empty");
        require(_price > 0, "Price must be greater than zero");
        require(bytes(_purchaseEmail).length > 0, "PurchaseEmail cannot be empty");
        require(bytes(_purchaseDate).length > 0, "PurchaseDate cannot be empty");

        purchaseCount++;
        purchases[purchaseCount] = Purchase({
            ISBN: _ISBN,
            price: _price,
            purchaseEmail: _purchaseEmail,
            purchaseDate: _purchaseDate
        });

        emit ItemPurchased(_ISBN, _price, _purchaseEmail, _purchaseDate);
    }

    function getTotalPurchaseCount() public view returns (uint256) {
        return purchaseCount;
    }

    function getPurchase(uint256 _index) public view returns (Purchase memory) {
        require(_index > 0 && _index <= purchaseCount, "Invalid index");
        return purchases[_index];
    }
}