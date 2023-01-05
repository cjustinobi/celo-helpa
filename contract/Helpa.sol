// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Helpa {

  uint256 public vendorCount;

  enum Status {
    Cancelled,
    InProgress,
    Reviewing,
    Completed
  }

  struct Vendor {
    address payable vendorAddress;
    string businessName;
    string profession;
    string filePath;
    string description;
    uint256 price;
    uint256 totalAmount;
    uint256 transactionCount;
  }

  struct Transaction {
    uint256 vendorIndex;
    address payable vendor;
    address payable customer;
    uint256 amount;
    Status status;
    uint256 dateCreated;
    uint256 dateCompleted;
    uint256 dateReviewing;
  }

  struct VendorTransaction {
      address payable customer;
      Status status;
      uint256 dateCreated;
      uint256 dateCompleted;
    }

  mapping (address => uint256) transactionCounts;

  mapping (address => uint256) vendorTransactionCounts;

  mapping (address => Transaction[]) customerTransactions;

  mapping (address => VendorTransaction[]) vendorTransactions;

  mapping (uint256 => Vendor) vendors;

  mapping(address => bool) public vendorExists;

  function createVendor(
    string memory _businessName,
    string memory _profession,
    string memory _filePath,
    string memory _description,
    uint256 _price
  ) public {

    require(vendorExists[msg.sender] == false, 'Vendor already exists');

    uint256 totalAmount;
    uint256 transactionCount;

    Vendor storage vendor = vendors[vendorCount];

    vendor.vendorAddress = payable(msg.sender);
    vendor.businessName = _businessName;
    vendor.profession = _profession;
    vendor.filePath = _filePath;
    vendor.description = _description;
    vendor.price = _price;
    vendor.totalAmount = totalAmount;
    vendor.transactionCount = transactionCount;

    vendorExists[msg.sender] = true;

    vendorCount ++;
  }

  function createTransaction (
    uint256 vendorIndex,
    address payable vendor

  ) public payable {

    require(vendor != msg.sender, "You can't buy your own product");

    Status status = Status.InProgress;
    customerTransactions[msg.sender].push(Transaction(vendorIndex, vendor, payable(msg.sender), msg.value, status, block.timestamp, 0, 0));
    vendorTransactions[vendor].push(VendorTransaction(payable(msg.sender), status, block.timestamp, 0));
    transactionCounts[msg.sender] += 1;
    vendorTransactionCounts[vendor] += 1;
  }

  function serviceReviewing(uint256 _index, address _customerAddress) public {
    Transaction storage transaction = customerTransactions[_customerAddress][_index];
    VendorTransaction storage vendorTransaction = vendorTransactions[msg.sender][_index];

    require(transaction.vendor == msg.sender, "Only the Vendor can confirm service completed");
    require(transaction.status != Status.Completed, "Only the Customer can confirm service completed");

    transaction.status = Status.Reviewing;
    transaction.dateReviewing = block.timestamp;

    vendorTransaction.status = Status.Reviewing;
  }

  function confirmService(uint256 _index, address _vendorAddress) public {

     Transaction storage transaction = customerTransactions[msg.sender][_index];
     VendorTransaction storage vendorTransaction = vendorTransactions[_vendorAddress][_index];

    require(transaction.customer == msg.sender, "Only the customer can confirm the service");
//    require(transaction.status == Status.Completed, "Transaction has been completed already");

    bool res;

    res = transfer(transaction.vendor, transaction.amount);

    if(res) {

      transaction.status = Status.Completed;
      transaction.dateCompleted = block.timestamp;
      vendorTransaction.status = Status.Completed;
      vendorTransaction.dateCompleted = block.timestamp;

      Vendor storage vendor = vendors[transaction.vendorIndex];
      vendor.totalAmount += transaction.amount;
      vendor.transactionCount ++;
    }

  }

  // Function to transfer Ether from this contract to address from input

  function transfer(address payable _to, uint256 _amount) public returns (bool) {

    (bool success, ) = _to.call{value: _amount}("");
    require(success, "Failed to send Ether");
    return success;
  }


    function tip(address payable _to, uint256 _amount) public payable {

      (bool success, ) = _to.call{value: _amount}("");
      require(success, "Failed to send Ether");
    }


  function getBal() public view returns (uint256) {

    return address(this).balance;
  }

  function getVendors(uint256 _index) public view returns (
    address vendorAddress,
    string memory businessName,
    string memory filePath,
    string memory description,
    string memory profession,
    uint256 price,
    uint256 totalAmount,
    uint256 transCount
  ) {

    Vendor storage vendor = vendors[_index];

    return (
    vendor.vendorAddress,
    vendor.businessName,
    vendor.filePath,
    vendor.description,
    vendor.profession,
    vendor.price,
    vendor.totalAmount,
    vendor.transactionCount
    );
  }

  function getTransactions (uint256 _index) public view returns (
    uint256 transactionIndex,
    uint256 vendorIndex,
    address vendor,
    address customer,
    uint256 amount,
    Status status,
    uint256 dateCreated,
    uint256 dateCompleted,
    uint256 dateReviewing,
    string memory filePath
  ) {

    Transaction storage transaction = customerTransactions[msg.sender][_index];
    Vendor storage _vendor = vendors[transaction.vendorIndex];

    return (
    _index,
    transaction.vendorIndex,
    transaction.vendor,
    transaction.customer,
    transaction.amount,
    transaction.status,
    transaction.dateCreated,
    transaction.dateCompleted,
    transaction.dateReviewing,
    _vendor.filePath
    );
  }

    function getVendorTransactions (uint256 _index) public view returns (

      uint256 transactionIndex,
      address customer,
      Status status,
      uint256 dateCreated,
      uint256 dateCompleted
    ) {

      VendorTransaction storage vendorTransaction = vendorTransactions[msg.sender][_index];

      return (
      _index,
      vendorTransaction.customer,
      vendorTransaction.status,
      vendorTransaction.dateCreated,
      vendorTransaction.dateCompleted
      );
    }

  function getTransactionCount() public view returns (uint256) {
    return transactionCounts[msg.sender];
  }

  function getVendorTransactionCount() public view returns (uint256) {
      return vendorTransactionCounts[msg.sender];
  }

  function getVendorCount() public view returns (uint256) {
    return vendorCount;
  }
}
