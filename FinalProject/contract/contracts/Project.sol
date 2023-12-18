 // SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

 contract Project {

    address public immutable owner;

    bool private locked;

    mapping(address => Contract[]) public contracts;

    mapping(address => Property[]) public PropertyMap;

    mapping(address => uint) public balances;

    mapping(address => complain[]) public complains;

    mapping(address => bool) public blackList;

    mapping(address => endRentEarly[]) public EndRentEarly;

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
        uint256 MonthPrice;  
        HouseShop types;
     }

    struct Contract {
        address owner;
        address leaser;
        string ProportName;
        uint256 RentPrice;
        uint256 RentStart;
        uint256 RentEnd;
       
    }

    struct complain {
        address leaser;
        address  owner;
        uint16 HouseShopNumber;
        string reason;
        string decision;
        bool rightful;
        bool active;
    }

    struct endRentEarly {
        address owner;
        address leaser;
        uint16 HouseShopNumber;
        bool leaserActive;
        bool ownerActive;
        bool active;
    }

    event setHouseShop1(address indexed _owner,string _AssetName,string types1,uint _amount);
    event getRent1(address indexed _leaser,address indexed _owner,uint16 _HouseShopNumber,string _ProportName,uint256 _RentEnd,uint256 _leaserAmount);
    event endRet1(address indexed _owner,address indexed _leaser,uint16 _HouseShopNumber);
    event removeHouseShopEvent(address indexed _owner,uint16 _houseShopNumber);
   
   function setHouseShop (
      string memory _AssetName,
      string memory types1,
      uint256 _amount) 
      external  Owner checkBlackList {

      Property memory property;
      property.owner =msg.sender;
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
      emit setHouseShop1( msg.sender,_AssetName,types1,_amount);
   }

    receive() external payable {
    balances[msg.sender] += msg.value;

    }
 
    function withdraw(uint256 _amount) payable external {
        require(!locked, "Reentrancy call detected!");
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;

        locked = true;   
        payable(msg.sender).transfer(_amount);
        locked = false;   
    }

    function getRent (
       address  payable _owner,
       uint16 _HouseShopNumber,
       string memory _PropertyName,
       uint256 _RentEnd,
       uint256 _leaserAmount) 
       external payable Owner checkBlackList {

         require(!locked, "Re-entrancy!");
         require(_owner !=msg.sender,"you cant rent yourself");
         require(checkRent(_owner,_HouseShopNumber) != true,"already rented");
         Property storage property = PropertyMap[ _owner][_HouseShopNumber];
         require(checkRentAmount(_owner,_HouseShopNumber) == _leaserAmount,"Invalid Price" );  
         require(balances[msg.sender]>= _leaserAmount * (_RentEnd / 30),"insufficient funds");
         require(_RentEnd >=30 && _RentEnd % 30 == 0," multiple 30");
    
          uint256 monthNumber = _RentEnd / 30;
          require(monthNumber<=12," max 12 months.");         
          Contract memory _contracts;
          _contracts.leaser = msg.sender;
          _contracts.owner = _owner;
          _contracts.ProportName =_PropertyName;
          _contracts.RentStart = block.timestamp;
          _contracts.RentEnd = ((_RentEnd) * (86400) ) + block.timestamp;
          _contracts.RentPrice = _leaserAmount * (_RentEnd / 30);

          contracts[_owner].push(_contracts);
         
          balances[msg.sender]-= _leaserAmount * monthNumber;

          locked = true;   
          balances[_owner] += _leaserAmount * monthNumber;
          locked = false;   
 
          property.active = true;
 
          emit getRent1(msg.sender,_owner,_HouseShopNumber, _PropertyName, _RentEnd,_leaserAmount);
    } 

    function endRent(
    address _owner,
    address _leaser,
    uint16 _HouseShopNumber) 
    external {
          Property storage property = PropertyMap[_owner][_HouseShopNumber];
          require(msg.sender == contracts[_owner][_HouseShopNumber].owner,"owner !=");
          require(property.active == true,"Asset is also empty.");
          require(_leaser == contracts[_owner][_HouseShopNumber].leaser,"leaser !="); 
          require(checkTimeRent(_owner, _HouseShopNumber) <= block.timestamp,"Time is not completed.");
          property.active = false;

          uint contractMapLen = contracts[_owner].length;

          if( _HouseShopNumber == contractMapLen -1) {
            contracts[_owner].pop();
          } else {

          for(uint16 i = _HouseShopNumber;i < contractMapLen -1;i++) {
            contracts[_owner][i] =  contracts[_owner][i +1];

          }
           contracts[_owner].pop();
          }

          emit endRet1(_owner,_leaser,_HouseShopNumber);
    }

    function removeHouseShop(address _owner,uint16 _houseShopNumber) external checkSender(_owner)  {
        require(PropertyMap[_owner].length > 0,"There is no asset");
        require(checkRent(_owner, _houseShopNumber) == false);

       uint propertyMapLen = PropertyMap[_owner].length;

       if( _houseShopNumber == propertyMapLen -1) {
            PropertyMap[_owner].pop();
       } else {

       for(uint16 i = _houseShopNumber;i < propertyMapLen -1;i++) {
        PropertyMap[_owner][i] =  PropertyMap[_owner][i +1];

       }
        PropertyMap[_owner].pop();
       }

       emit removeHouseShopEvent( _owner,_houseShopNumber);
     }

     function createComplain(address _leaser,address _owner,uint16 _HouseShopNumber, string memory _reason) public Owner {
           require(_leaser == checkContractLeaser(_owner,_HouseShopNumber),"you are not leaser");
           require(_owner == checkContractOwner(_owner,_HouseShopNumber),"Invalid owner address");
           require(checkTimeRent(_owner, _HouseShopNumber) > block.timestamp + 1296000 ,"15 days");

             complain memory _complain;
            _complain.owner = _owner;
            _complain.leaser = _leaser;
            _complain.HouseShopNumber = _HouseShopNumber;
            _complain.reason = _reason;

            if(msg.sender == _leaser) complains[_leaser].push(_complain);
            else complains[_owner].push(_complain);
            
    }

    function decisionOwner(address _complainant,uint16 _compNumber,string memory _decision,bool _rightful) public {
        require(msg.sender == owner,"You are not owner");
        require(complains[_complainant][_compNumber].active != true,"It is already decided.");

         complain storage _complain = complains[_complainant][_compNumber];
        _complain.decision = _decision;
        _complain.rightful = _rightful;
        _complain.active = true;

        if(_complain.rightful == true) {
            if(_complain.owner == _complainant) {
                blackList[_complain.leaser] = true;
            }
            else {
                blackList[_complain.owner] = true;
            }
        }  
    }

    function endRentEarly1(address _leaser,address _owner,uint16 _contractMappingOwnerNumber,uint16 _HouseShopNumber) external Owner {
           require(checkContractLeaser(_owner,_contractMappingOwnerNumber) == _leaser,"You are not leaser");
           require(checkContractOwner(_owner,_contractMappingOwnerNumber) == _owner,"You are not owner");
           require(((checkTimeRent(_owner, _HouseShopNumber) - (block.timestamp)) >= 1296000),"15 days.");

               endRentEarly memory _endRentEarly;
              _endRentEarly.leaser = _leaser;
              _endRentEarly.owner = _owner;
              _endRentEarly.HouseShopNumber = _HouseShopNumber;
              if(msg.sender == _endRentEarly.leaser) { 
              _endRentEarly.leaserActive =true;
              } else {
                _endRentEarly.ownerActive =true;
              }
            
             EndRentEarly[_owner].push(_endRentEarly);
    }

    function ownerLeaserResponseEarlyEnd(address _owner,uint16 _EndRentEarlyMappingNumber,bool _active) public Owner {
            endRentEarly storage _endRentEarly = EndRentEarly[_owner][_EndRentEarlyMappingNumber];
            require(_endRentEarly.active == false,"Already responed!");
            if(_endRentEarly.leaserActive == true) { 
            require(_endRentEarly.owner == msg.sender ,"You are not leaser");
            _endRentEarly.ownerActive = _active;
            }
            else if(_endRentEarly.ownerActive == true) {
            require(_endRentEarly.leaser == msg.sender ,"You are not leaser");
                _endRentEarly.leaserActive = _active;
            }
            else {
                revert("You are not leaser or owner");
            }
            _endRentEarly.active = true;
             uint contractMapLen = contracts[_owner].length;
            if(_active == true) {
                 
            if(_endRentEarly.HouseShopNumber == contractMapLen -1) {
            contracts[_owner].pop();
            } else {

           for(uint16 i = _endRentEarly.HouseShopNumber ;i < contractMapLen -1;i++) {
            contracts[_owner][i] =  contracts[_owner][i +1];

            }
            contracts[_owner].pop();
            }
              Property storage property = PropertyMap[_owner][_EndRentEarlyMappingNumber];
              property.active = false;
           
            }
    }

    function checkRent(address _owner,uint16 number) internal view returns (bool) {
        Property storage  property = PropertyMap[_owner][number];
               return property.active;
    }

    function checkTimeRent(address _owner,uint16 number) internal view returns (uint256) {
        Contract storage _contract = contracts[_owner][number];
        return _contract.RentEnd;
    }

    function checkRentAmount(address _owner,uint16 _HouseShopnumber) internal  view returns (uint256) {
        Property storage property = PropertyMap[_owner][_HouseShopnumber];
        return property.MonthPrice;
    }

    function checkContractLeaser(address _owner,uint16 number) internal view returns (address) {
         Contract storage _contract = contracts[_owner][number];
         return _contract.leaser;
    }

    function checkContractOwner(address _owner,uint16 number) internal view returns (address) {
         Contract storage _contract = contracts[_owner][number];
         return _contract.owner;
    }

    modifier Owner () {
        require(msg.sender != owner,"Owner cant rent");
        _;
    }

    modifier checkSender(address _leaser) {
        require(msg.sender ==_leaser,"you are not leaser or owner");
        _;
    }

    modifier checkBlackList() {
        require(blackList[msg.sender] !=true,"You are in blacklist");
        _;
    }

 }
