// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

pragma experimental ABIEncoderV2; // Enable ABIEncoderV2

contract PurchaseBook {
    struct Purchase {
        string ISBN;
        uint256 price;
        string purchasedBy;
        string purchaseEmail;
        string purchaseDate;
    }

    mapping(uint256 => Purchase) public purchases;
    uint256 public purchaseCount;

    event ItemPurchased(
        string indexed ISBN,
        uint256 price,
        string purchasedBy,
        string purchaseEmail,
        string purchaseDate
    );

    constructor() public {
        purchaseCount = 0;
    }

    function purchaseItem(
        string memory _ISBN,
        uint256 _price,
        string memory _purchasedBy,
        string memory _purchaseEmail,
        string memory _purchaseDate
    ) public {
        require(bytes(_ISBN).length > 0, "ISBN cannot be empty");
        require(_price > 0, "Price must be greater than zero");
        require(bytes(_purchasedBy).length > 0, "PurchasedBy cannot be empty");
        require(bytes(_purchaseEmail).length > 0, "PurchaseEmail cannot be empty");
        require(bytes(_purchaseDate).length > 0, "PurchaseDate cannot be empty");

        purchaseCount++;
        purchases[purchaseCount] = Purchase({
            ISBN: _ISBN,
            price: _price,
            purchasedBy: _purchasedBy,
            purchaseEmail: _purchaseEmail,
            purchaseDate: _purchaseDate
        });

        emit ItemPurchased(_ISBN, _price, _purchasedBy, _purchaseEmail, _purchaseDate);
    }
}