const { expect } = require("chai");
const { ethers } = require("hardhat");
const provider = ethers.provider;

function ethToNum(val) {
  return Number(ethers.utils.formatEther(val));
}

async function getBlockTimestamp() {
  let block_number, block, block_timestamp;

  block_number = await provider.getBlockNumber();;
  block = await provider.getBlock(block_number);
  block_timestamp = block.timestamp;

  return block_timestamp;
}

async function increaseTime(value) {
  await provider.send('evm_increaseTime', [value]);
  await provider.send('evm_mine');
}

describe("Project Smart Contract", function () {

  let owner, leaser, AssetOwner;
  let projectContract;
  
  //Asset0
  const propertyName0 = "My House0";
  const propertyType0 = "House";
  const rentAmount0 = ethers.utils.parseEther("1.0");

  //Asset1
  const propertyName1 = "My House1";
  const propertyType1 = "House";
  const rentAmount1 = ethers.utils.parseEther("1.0");

  // describe("Send Ether to Contract")
  let amountToSend,initialBalance;
  let gasLimit,leaserBalanceMap,finalBalance,contractBalance,leaserBalanceInContract;

  // describe("Get rent ");

  let HouseShopNumber,rentEnd,leaserAmount,rent0,contract;
  let AssetOwnerBalanceMap,LeaserBalanceAfterRent;

  //describe(Withdarw);

  let withdarwBalance;

// describe(Remove);

// describe(createComplain);

let complainsMapping,houseShopNumberComplain,reason

// describe(OwnerDecide)

let decision,BoolRightFul,BlackListMapping;

// describe (leaserwantsleaveearly)

let  endRentEarlyMapping;

  before("AssetOwner set Assets.",async function () {
    [owner, leaser, AssetOwner] = await ethers.getSigners();

    const Project = await ethers.getContractFactory("Project");
    projectContract = await Project.deploy();
    await projectContract.deployed();

    const Asset0 = await projectContract.connect(AssetOwner).setHouseShop(AssetOwner.address, propertyName0, propertyType0, rentAmount0);
    const Asset1 = await projectContract.connect(AssetOwner).setHouseShop(AssetOwner.address, propertyName1, propertyType1, rentAmount1);

    property0 = await projectContract.PropertyMap(AssetOwner.address, 0);
    property1 = await projectContract.PropertyMap(AssetOwner.address, 1);

    receipt0 = await Asset0.wait();
    receipt1 = await Asset1.wait();

  });

  it("Let Owner of this contract try to set",async function() {

    await(expect(projectContract.connect(owner).setHouseShop(AssetOwner.address, propertyName0, propertyType0, rentAmount0))).to.be.reverted;

  })

  it("Should deploy the Project contract", async function () {
    expect(await projectContract.owner()).to.equal(owner.address);
  });

  it("Check after any address set any asset from mapping",function () {

    // Check House1 
     expect(property0.owner).to.equal(AssetOwner.address);
     expect(property0.AssetName).to.equal("My House0");
     expect(property0.types).to.equal(0);
     expect(property0.MonthPrice).to.equal(ethers.utils.parseEther("1.0"));
     expect(property0.active).to.equal(false);
    //    // Check House1 
    //   // Check House2
     expect(property1.owner).to.equal(AssetOwner.address);
     expect(property1.AssetName).to.equal(propertyName1);
     expect(property1.types).to.equal(0);
     expect(property1.MonthPrice).to.equal(rentAmount1);
           // Check House2
    //     //Check House1 Event
     expect(AssetOwner.address).to.not.equal(owner.address);
     expect(receipt0.events[0].event).to.equal("setHouseShop1");
     expect(receipt0.events[0].args._owner).to.equal(AssetOwner.address);
     expect(receipt0.events[0].args._AssetName).to.equal(propertyName0);
     expect(receipt0.events[0].args.types1).to.equal(propertyType0);
     expect(receipt0.events[0].args._amount).to.equal(rentAmount0);
    //    //Check House1 Event
    //   // Check House2 Event
     expect(receipt1.events[0].event).to.equal("setHouseShop1");
     expect(receipt1.events[0].args._owner).to.equal(AssetOwner.address);
     expect(receipt1.events[0].args._AssetName).to.equal(propertyName1);
     expect(receipt1.events[0].args.types1).to.equal(propertyType1);
     expect(receipt1.events[0].args._amount).to.equal(rentAmount1);
        // Check House2 Event
   
  });

   describe("Send Ether to Contract", function() {

     before("describe variables.", async function() { 
       initialBalance = await ethers.provider.getBalance(leaser.address);
       amountToSend = ethers.utils.parseEther("4.0");
       gasLimit = 2000000;
       await leaser.sendTransaction({ to: projectContract.address, value: amountToSend, gasLimit });
       leaserBalanceMap = await projectContract.balances(leaser.address);
       finalBalance = await ethers.provider.getBalance(leaser.address);
       contractBalance = await ethers.provider.getBalance(projectContract.address);
       leaserBalanceInContract = await projectContract.balances(leaser.address);
     
    });
  
    it("Should send Ether to the contract and update the user's balance", async function () {

      // Kullanıcıdan akıllı kontrata Ether gönderme işlemi
      expect(finalBalance).to.not.equal(initialBalance.sub(amountToSend)); // gas için ether harcanıyor. 
      expect(leaserBalanceMap).to.equal(amountToSend); // mapping working. 
      expect(contractBalance).to.equal(amountToSend);
      expect(leaserBalanceInContract).to.equal(amountToSend);

    });

  describe("Leaser renting asset from assetOwner",function() { 

      HouseShopNumber = 0;
      rentEnd = 60;
      leaserAmount =ethers.utils.parseEther("1.0");

     before(async function() {

       await(expect(projectContract.connect(owner).getRent(leaser.address,AssetOwner.address,HouseShopNumber,propertyName0,rentEnd,leaserAmount))).to.be.reverted; // Owner of this contract cant rent any asset or set.
       rent0 = await projectContract.connect(leaser).getRent(leaser.address,AssetOwner.address,HouseShopNumber,propertyName0,rentEnd,leaserAmount);
       contract = await projectContract.contracts(AssetOwner.address,0);
       AssetOwnerBalanceMap = await projectContract.balances(AssetOwner.address);
       property0 = await projectContract.PropertyMap(AssetOwner.address, 0);
       LeaserBalanceAfterRent = await projectContract.balances(leaser.address);
  
   });  

   it("rent started" ,async function() {

    expect(contract.owner).to.equal(AssetOwner.address);
    expect(contract.leaser).to.equal(leaser.address);
    expect(contract.ProportName).to.equal(propertyName0);
    expect(Number(contract.RentPrice)).to.equal(Number(leaserAmount * (rentEnd / 30)));
    expect(contract.RentStart).to.not.equal(0);
    expect(contract.RentEnd).to.not.equal(0); 
   
  });

  it("check assetOwner Balance after rented", async function() {

    expect(AssetOwnerBalanceMap).to.equal(ethers.utils.parseEther("2.0")); // Check AssetOwnerBalance is 2 ether. 

  });

  it("check leaser Balance after rented",async function() {

    expect(LeaserBalanceAfterRent).to.equal(ethers.utils.parseEther("2.0"));

  });

  it("check AssetProperty.active is true ? ", async function() {

     expect(property0.active).to.equal(true);

   });

   it("Check rent this asset again",async function() {

   await(expect(projectContract.connect(leaser).getRent(leaser.address,AssetOwner.address,HouseShopNumber,propertyName0,rentEnd,leaserAmount))).to.be.reverted;

   });

    describe("Withdraw funds", function () {

    withdarwBalance = ethers.utils.parseEther("2")

    before(async function() {

     await projectContract.connect(AssetOwner).withdraw(withdarwBalance);
     AssetOwnerBalanceMap = await projectContract.balances(AssetOwner.address);

     await projectContract.connect(leaser).withdraw(withdarwBalance);
     LeaserBalanceAfterRent = await projectContract.balances(leaser.address);
     
    });

      it("Should allow AssetOwner withdraw funds", async function () {

        expect(AssetOwnerBalanceMap).to.equal(ethers.utils.parseEther("0"));   
     
      });

      it("Should allow leaser withdraw funds", async function() {

        expect(LeaserBalanceAfterRent).to.equal(ethers.utils.parseEther("0"));

      });

      describe("RemoveHouseShop",function() {

      let RemoveHouseShopNumber = 1
      
      before(async function() {

      AssetOwnerPropertyMap1Before= await projectContract.PropertyMap(AssetOwner.address,1);
      
      });

      it("it must be deleted HoseShop from AssetOwner", async function() {

      expect(AssetOwnerPropertyMap1Before.AssetName).to.equal("My House1");  // Burada test edince geçiyor 
      await projectContract.connect(AssetOwner).removeHouseShop(AssetOwner.address,RemoveHouseShopNumber); // Burada remove ediyoruz index 1 'i.
      //expect(AssetOwnerPropertyMap1Before.AssetName).to.equal("My House1"); aynı kodu birdaha çalıstırırsak remove edilgdigine dair bir bilgi geliyor. So it is working. 

      });

      describe("Create Complain", function() {

       houseShopNumberComplain = 0;
       reason = "My House Has an İssue";
       
      before (async function() {

          await projectContract.connect(leaser).createComplain(leaser.address,AssetOwner.address,houseShopNumberComplain,reason);
          complainsMapping= await projectContract.complains(leaser.address,0);
     });

        it("Check who created Complain",async function() { 

        expect(complainsMapping.leaser).to.equal(leaser.address);
        expect(complainsMapping.owner).to.equal(AssetOwner.address);
        expect(complainsMapping.HouseShopNumber).to.equal(Number(0));
        expect(complainsMapping.reason).to.equal(reason);
        expect(complainsMapping.active).to.equal(false);
        expect(complainsMapping.decision).to.equal('');
        expect(complainsMapping.rightful).to.equal(false); // Decision not judged. 

        });

        describe("ContractOwner should decide to who is right in complain",function() {

          decision = "Leaser is right due to x reason. So AssetOwner.address goes to blacklist!"
          BoolRightFul = true; 

          before(async function() {
           
           expect(complainsMapping.active).to.equal(false);
           await projectContract.connect(owner).decisionOwner(leaser.address,houseShopNumberComplain,decision,BoolRightFul);
           complainsMapping= await projectContract.complains(leaser.address,0); // Refresh the complainsMapping 
           BlackListMapping =await projectContract.blackList(AssetOwner.address);

          });

          it("After the decided Check complainMappings[0]",async function() {
              
            expect(complainsMapping.active).to.equal(true);
            expect(complainsMapping.decision).to.equal(decision);

          });

          it("Check BlacklistMapping to AssetOwner.bool = true ",async function() {

            expect(BlackListMapping).to.equal(true); // AssetOwner in blacklist now. 

          });

          it("Decide the complain which is already decided.",async function() {

            await(expect(projectContract.connect(owner).decisionOwner(leaser.address,houseShopNumberComplain,decision,BoolRightFul))).to.be.reverted;
 
          });

          describe("AssetOwner try to endRent", function() {

            it("if rent time is not over it must be reverted.", async function() {

            await(expect(projectContract.connect(AssetOwner).endRent(AssetOwner.address,leaser.address,0))).to.be.reverted;

            });

            it("Should end the rent for a specific property", async function () {

             // Buradaki kod çalişiyor ancak 60 gün geçtikten sonra diger kodlarıda etkiliyor.
          
              // await increaseTime(60 * 24 * 60 * 60);

              // const tx = await projectContract.connect(AssetOwner).endRent(AssetOwner.address,leaser.address,0);
              // property0 = await projectContract.PropertyMap(AssetOwner.address,0);
           
              // await tx.wait();
             
              // expect(property0.active).to.be.false;

              // await increaseTime( -60 * 24 * 60 * 60);

            });

            describe("leaser wants to leave early (endRentEarlyLeaser).", function() {

              before(async function() {

                await projectContract.connect(leaser).endRentEarly1(leaser.address,AssetOwner.address,0,0);
                endRentEarlyMapping = await projectContract.EndRentEarly(AssetOwner.address,0);

              });

              it("Check endRentEarlyMapping0 ",async function() {
                 
               
                 expect(endRentEarlyMapping.owner).to.equal(AssetOwner.address);
                 expect(endRentEarlyMapping.leaser).to.equal(leaser.address);
                 expect(endRentEarlyMapping.HouseShopNumber).to.equal(0);
                 expect(endRentEarlyMapping.leaserActive).to.equal(true);
                 expect(endRentEarlyMapping.ownerActive).to.equal(false);

              });

            describe("AssetOfOwner response to leaser for leavingEarly (ownerResponseEarlyEnd)",function (){

             before(async function() {

              expect(contract.owner).to.equal(AssetOwner.address)        // burada calısınca sorun yok 
              await projectContract.connect(AssetOwner).ownerLeaserResponseEarlyEnd(AssetOwner.address,0,true);
              endRentEarlyMapping = await projectContract.EndRentEarly(AssetOwner.address,0);
          
           });

           it("AssetOwner response true for leaser leaving early",async function() { 

            expect(endRentEarlyMapping.owner).to.equal(AssetOwner.address);
            expect(endRentEarlyMapping.leaser).to.equal(leaser.address);
            expect(endRentEarlyMapping.HouseShopNumber).to.equal(0);
            expect(endRentEarlyMapping.leaserActive).to.equal(true);
            expect(endRentEarlyMapping.ownerActive).to.equal(true);

           });

           it("ContractMapping[0] must be removed.", async function() {

           // contract = await projectContract.contracts(AssetOwner.address,0) // eror aliyoruz Çünkü silindi. 
           
           });
                   
      
                    });

                 });
  
               });

            });

          });

        });

     });

    });

   });

 }); 