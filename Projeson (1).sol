 // SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

 contract Project1 {
    
    // Kullanıcıların kendi ev veya dükkanlarını sisteme girip başkalarının kiralamasına olanak tanıyor. contract owneri kira alamaz veya assetlerini
    // sisteme yükleyemez. Kiralama mantıgı 1 ay = 30 gün mantıgından gidildi. getrent fonksiyonunda günü yazınca otomatik saniyeye çeviriyor.
    // leaser ve ownerlar contractlara ulaşabiliyorlar. ownerlar süre bitince yeniden kiraya verebiliyor veya geri çekebiliyorlar.
    // Gas optimization iyileştirmeleri yapılabilir. 

    address public immutable owner;

    bool private locked = false;

    mapping(address => contracts[]) public contractsMapOwner;

    mapping(address => contracts[]) public contractsMapLeaser;

    mapping(address => Property[]) public PropertyMap;

       constructor() {
        owner = msg.sender;
    }

    enum HouseShop {
        House,Shop
    }

    struct Property {
        address owner;
        string AssetName;
        bool active;
        uint MonthPrice;  
        HouseShop types;
     }

    struct contracts {
        address owner;
        string ProportName;
        uint RentPrice;
        uint RentStart;
        uint256 RentEnd;
        address leaser;
    }

    event setHouseShop1(address indexed _owner,string _AssetName,string types1,uint _amount);
    event getRent1(address indexed _leaser,address indexed _owner,uint256 _HouseShopNumber,string _ProportName,uint256 _RentEnd,uint _leaserAmount);
    event endRet1(address indexed _owner,address indexed _leaser,uint256 _HouseShopNumber);
    event removeHouseShopEvent(address indexed _owner,uint _houseShopNumber);
   
   function setHouseShop (
      address _owner,
      string memory _AssetName,
      string memory types1,
      uint _amount) 
      external  Owner checkSender(_owner) {

      Property memory property;
      property.owner = _owner;
      property.AssetName = _AssetName;
      property.MonthPrice = _amount;
      property.active;
  
      if(keccak256(abi.encodePacked(types1)) == keccak256(abi.encodePacked("House"))) {
         property.types = HouseShop.House;
      }else if(keccak256(abi.encodePacked(types1)) == keccak256(abi.encodePacked("Shop"))) {
          property.types = HouseShop.Shop;
      } else {
          revert("invalid String");
      }
  
      PropertyMap[msg.sender].push(property);
      emit setHouseShop1( _owner,_AssetName,types1,_amount);
   }

    function getRent (
       address payable _leaser,
       address  payable _owner,
       uint256 _HouseShopNumber,
       string memory _PropertyName,
       uint256 _RentEnd,
       uint256 _leaserAmount) 
       external payable Owner checkSender(_leaser) {

         require(!locked, "Reentrancy call detected!");
         require(_owner != _leaser,"you cant rent yourself");
         require(checkRent(_owner,_HouseShopNumber) != true,"already rented");
         Property storage property = PropertyMap[ _owner][_HouseShopNumber];
         require(checkRentAmount(_owner,_HouseShopNumber) == _leaserAmount,"Invalid Price" );  
         require(keccak256(abi.encodePacked(property.AssetName)) == keccak256(abi.encodePacked(_PropertyName)),"Invalid House Name");
         require(msg.sender.balance >= _leaserAmount,"You dont have enough ether");    
         require(_RentEnd >=30 && _RentEnd % 30 == 0,"You can rent only multiple 30");
    
          uint monthNumber = _RentEnd / 30;         
          contracts memory _contracts;
          _contracts.leaser = _leaser;
          _contracts.owner = _owner;
          _contracts.ProportName =_PropertyName;
          _contracts.RentStart = block.timestamp;
          _contracts.RentEnd = ((_RentEnd) * (86400) ) + block.timestamp;
          _contracts.RentPrice = _leaserAmount * (_RentEnd / 30) ;

          contractsMapOwner[_owner].push(_contracts);
          contractsMapLeaser[_leaser].push(_contracts);

         locked = true;   

         payable(address(this)).transfer;
          require(msg.value == _leaserAmount * monthNumber,"Invalid Value !!");
         _owner.transfer(msg.value);
 
         locked = false;   
 
         property.active = true;
 
         emit getRent1(_leaser,_owner,_HouseShopNumber, _PropertyName, _RentEnd,_leaserAmount);
    } 

    function endRent(
    address _owner,
    address _leaser,
    uint256 _HouseShopNumber) 
    external {
          Property storage property = PropertyMap[_owner][_HouseShopNumber];
          require(msg.sender == contractsMapOwner[_owner][_HouseShopNumber].owner,"You are not owner of this asset");
          require(property.active == true,"Asset is also empty.");
          require(checkTimeRent(_owner, _HouseShopNumber) <= block.timestamp,"Time is not completed.");
          require(_leaser == contractsMapOwner[_owner][_HouseShopNumber].leaser,"leaser is not leaser of this contract"); 
          property.active = false;
          emit endRet1(_owner,_leaser,_HouseShopNumber);
    }

    function removeHouseShop(address _owner,uint _houseShopNumber) external checkSender(_owner)  {
        require(PropertyMap[_owner].length > 0,"There is no assets");
        require(checkRent(_owner, _houseShopNumber) == false);

       uint  propertyMapLen = PropertyMap[_owner].length;

       if( _houseShopNumber == propertyMapLen -1) {
            PropertyMap[_owner].pop();
       } else {

       for(uint i = _houseShopNumber;i < propertyMapLen -1;i++) {
        PropertyMap[_owner][i] =  PropertyMap[_owner][i +1];

       }
        PropertyMap[_owner].pop();
       }

       emit removeHouseShopEvent( _owner,_houseShopNumber);
     }

    function checkRent(address _owner,uint number) internal view returns (bool) {
        Property  storage  property = PropertyMap[_owner][number];
               return property.active;
    }

    function checkTimeRent(address _owner,uint number) internal view returns (uint) {
        contracts  storage  _contract = contractsMapOwner[_owner][number];
        return _contract.RentEnd;
    }

    function checkRentAmount(address _owner,uint _HouseShopnumber) internal  view returns (uint) {
        Property storage property = PropertyMap[_owner][_HouseShopnumber];
        return property.MonthPrice;
    }
   
    modifier Owner () {
        require(msg.sender != owner,"Owner of this contract cant rent or set assets.");
        _;
    }

    modifier checkSender(address _leaser) {
        require(msg.sender ==_leaser,"you are not leaser or owner");
        _;
    }

 }