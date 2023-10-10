const PurchaseBook = artifacts.require("PurchaseBook");

module.exports = function (deployer) {
  deployer.deploy(PurchaseBook);
};
