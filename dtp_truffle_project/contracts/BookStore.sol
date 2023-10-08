// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookStore {

    struct Purchase {
        string ISBN;
        string bookName;
        uint256 price;
        uint256 purchasedTime;
        string userEmail;
        string userName;
    }

    mapping(uint256 => Purchase) public purchases;
    mapping(string => uint256) public purchaseTime;

    event BookPurchased(string ISBN, string bookName, string userName, string userEmail, uint256 timestamp);


    //purchase IDs
    uint256 public purchaseCount;

    function purchaseBook(
        string memory _ISBN,
        string memory _bookName,
        uint256 _price, 
        string memory _userEmail, 
        string memory _userName
    ) public {
        purchaseCount++;
        purchases[purchaseCount] = Purchase({
            bookName: _bookName,
            ISBN: _ISBN,
            price: _price,
            purchasedTime: block.timestamp,
            userEmail: _userEmail,
            userName: _userName
        });

        // Emit the Book Purchased event
        emit BookPurchased(_ISBN, _bookName, _userName, _userEmail, block.timestamp);
    }

    function getPurchaseDetails(uint256 _purchaseId) public view returns (Purchase memory) {
        return purchases[_purchaseId];
    }

    function getPurchaseTime(string memory _ISBN) public view returns (uint256) {
    return purchaseTime[_ISBN];
}

}
