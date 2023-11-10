import { BigNumber, ethers } from "ethers";
import { useState,useEffect } from "react";
import "./App.css";
import { useProjectContract } from "./hooks/useProjectContract";

function App() {

  const lockContract = useProjectContract();
  const [address, setAddress] = useState(""); 
  const [address1, setAddress1] = useState(""); 
  const [address2, setAddress2] = useState(""); 
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");  
  const [address5, setAddress5] = useState("");  
  const [address6, setAddress6] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [leaserAddress, setLeaserAddress] = useState("");
  const [index, setIndex] = useState(0);
  const [indexContract, setIndexContract] = useState(0);
  const [indexComplain, setIndexComplain] = useState(0);
  const [indexEntRentEarly, setIndexEntRent] = useState(0);
  const [propertyValue, setPropertyValue] = useState("");  // BigNumber.from(0)
  const [contracts, setContracts] = useState("");
  const [complains, setComplain] = useState("");
  const [blacklist, setblackList] = useState("");
  const [EndRentEarlyMapping, setEndRentEarlyMapping] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [setownerAddress, setOwnerAddressFunction] = useState("");
  const [assetName, setAssetName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [amount, setAmount] = useState('');

  const [assetNameRent, setAssetNameRent] = useState('');
  const [houseShopNumber, setHouseShopNumber] = useState(0);
  const [rentEnd, setRentEnd] = useState("");
  const [amountRent, setAmountRent] = useState('');

  const [ownerAddressEndRent, setOwnerAddressEndRent] = useState('');
  const [leaserAddressEndRent, setLeaserAddressEndRent] = useState('');
  const [houseShopNumberEndRent, setHouseShopNumberEndRent] = useState("");

  const [ownerAddressRemove, setOwnerAddressRemove] = useState('');
  const [houseShopNumberRemove, setHouseShopNumberRemove] = useState('');

  const [leaserAddressComplain, setLeaserAddressComplain] = useState('');
  const [ownerAddressComplain, setOwnerAddressComplain] = useState('');
  const [houseShopNumberComplain, setHouseShopNumberComplain] = useState('');
  const [complaintReasonComplain, setComplaintReasonComplain] = useState('');

  const [complainantAddress, setComplainantAddress] = useState('');
  const [complaintNumber, setComplaintNumber] = useState('');
  const [decision, setDecision] = useState('');
  const [isRightful, setIsRightful] = useState(false);

  const [leaserAddressEarlyEnd, setLeaserAddressEarlyEnd] = useState('');
  const [ownerAddressEarlyEnd, setOwnerAddressEarlyEnd] = useState('');
  const [contractMappingOwnerNumber, setContractMappingOwnerNumber] = useState('');
  const [houseShopNumberEarlyEnd, setHouseShopNumberEarlyEnd] = useState('');

  const [ownerAddressEaryResponse, setOwnerAddressEarlyResponse] = useState('');
  const [endRentEarlyMappingNumber, setEndRentEarlyMappingNumber] = useState('');
  const [activeResponse, setActiveResponse] = useState(false);



 const connectWallet = async () => {

  if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
    alert("Please install and connect to MetaMask or a compatible Ethereum wallet.");
    return;
  }

  try {
    console.log("connectWallet called");
  
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const connectedAddress = await signer.getAddress();
    setIsConnected(true);
    setAddress6(connectedAddress)

    if (connectedAddress === address) {
      console.log('Address connected:', connectedAddress);
      setIsConnected(true);
      console.log('Is Connected after set:', isConnected);
     
    }
  } catch (error) {
    console.error("An error occurred while connecting to the wallet:", error);
    setIsConnected(false); 
  }
}

const getBalance = async () => {
  if (!ethers.utils.isAddress(address1)) {
    alert("Geçersiz Ethereum adresi");
    return;
  }

  if (!lockContract) {
    alert("Akilli kontrat yüklenemedi veya bağlanamadı.");
    return;
  }

  try {
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const connectedAddress = await signer.getAddress();
    const userBalance = await lockContract.balances(address1);
    setBalance(ethers.utils.formatEther(userBalance));
     
  } catch (error) {
    console.error("An error occurred while connecting to the wallet:", error);
    setIsConnected(false);
  }
}

const getContractOwner = async () => {
  if (!lockContract) {
    console.error("Not connected.");
    return;
  }

  try {
    const ownerAddress = await lockContract.owner();
    return ownerAddress;
  } catch (error) {
    console.error("Not connected :", error);
  }
};

const handleGetOwnerAddress = async () => {
  const ownerAddress = await getContractOwner();
  if (ownerAddress) {
    setOwnerAddress(ownerAddress);
  }
};

const handleGetValue = async () => {
  setIsVisible(!isVisible);

  try {
    const propertyArray = await lockContract.PropertyMap(address, index);
    if (propertyArray) {
      setPropertyValue(propertyArray);
    } else {
      console.error("PropertyArray is undefined");
    }
  } catch (error) {
    console.error("Error fetching PropertyMap:", error);
  }
};


const getContract = async () => {
  setIsVisible2(!isVisible2);

  try {
    const contractarray = await lockContract.contracts(address2,indexContract);
    if (contractarray) {
      setContracts(contractarray);
    } else {
      console.error("PropertyArray is undefined");
    }
  } catch (error) {
    console.error("Error fetching PropertyMap:", error);
  }
};

const getComplain = async () => {
  setIsVisible3(!isVisible3);

  try {
    const complainarray = await lockContract.complains(address3,indexComplain);
    if (complainarray) {
      setComplain(complainarray);
    } else {
      console.error("PropertyArray is undefined");
    }
  } catch (error) {
    console.error("Error fetching PropertyMap:", error);
  }
};

const getBlackList = async () => {
  if (!ethers.utils.isAddress(address4)) {
    alert("Geçersiz Ethereum adresi");
    return;
  }

  if (!lockContract) {
    alert("Akilli kontrat yüklenemedi veya bağlanamadı.");
    return;
  }

  try {
    const UserList = await lockContract.blackList(address4);
    setblackList(UserList);
    setIsVisible4(!isVisible4);
     
     
  } catch (error) {
    console.error("An error occurred while connecting to the wallet:", error);
    setIsConnected(false);
  }
}

const getEndRentMapping = async () => {
  if (!ethers.utils.isAddress(address5)) {
    alert("Geçersiz Ethereum adresi");
    return;
  }
  if (!lockContract) {
    alert("Akilli kontrat yüklenemedi veya bağlanamadı.");
    return;
  }

  try {
    const endRent = await lockContract.EndRentEarly(address5,indexEntRentEarly);
    setEndRentEarlyMapping(endRent);
    setIsVisible5(!isVisible5);
     
     
  } catch (error) {
    console.error("An error occurred while connecting to the wallet:", error);
    setIsConnected(false);
  }

}

const setHouseShop = async () => {
  if (!ethers.utils.isAddress(setownerAddress)) {
    alert("Girdiğiniz adres geçerli bir Ethereum adresi değil.");
    return;
  }

  try {
    const amountInWei = amount;
    const signer = provider.getSigner();
    await lockContract.connect(signer).setHouseShop(setownerAddress, assetName, propertyType, amountInWei);
    console.log("Emlak bilgisi başarıyla eklendi!");
  } catch (error) {
    console.error("Emlak bilgisi eklenirken hata oluştu:", error);
  }
};

const getRent = async () => {
  if (!ethers.utils.isAddress(leaserAddress) || !ethers.utils.isAddress(ownerAddress)) {
    alert("Geçersiz adresler girildi.");
    return;
  }
  const houseShopNumberInt = parseInt(houseShopNumber, 10);
  const rentEndInt = parseInt(rentEnd, 10);
  const leaserAmountWei =amountRent;
  
  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).getRent(
      leaserAddress,
      ownerAddress,
      houseShopNumberInt,
      assetNameRent,
      rentEndInt,
      leaserAmountWei,
      {
        value: leaserAmountWei // Bu kira bedelinin işlemi başlatan tarafından ödendiğini belirtir.
      }
    );
    await transaction.wait();
    alert("Kira işlemi başarıyla gerçekleştirildi.");
  } catch (error) {
    console.error("Kira işlemi sırasında bir hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};

const endRent = async () => {
  if (!ethers.utils.isAddress(ownerAddressEndRent) || !ethers.utils.isAddress(leaserAddressEndRent)) {
    alert("Geçersiz adresler girildi.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const houseShopNumberEndRentInt = parseInt(houseShopNumberEndRent,10);
    const transaction = await lockContract.connect(signer).endRent(
      ownerAddressEndRent,
      leaserAddressEndRent,
      houseShopNumberEndRentInt
    );
    await transaction.wait();
    alert("Kira işlemi başarıyla sonlandırıldı.");
  } catch (error) {
    console.error("Kira sonlandırma işlemi sırasında hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};

const removeHouseShop = async () => {
  if (!ethers.utils.isAddress(ownerAddressRemove)) {
    alert("Geçersiz adres girildi.");
    return;
  }
  const houseShopNumberParsed = parseInt(houseShopNumberRemove);
  if (isNaN(houseShopNumberParsed)) {
    alert("Geçersiz varlık numarası girildi.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).removeHouseShop(ownerAddressRemove, houseShopNumberParsed);
    await transaction.wait();
    alert("Varlık başarıyla kaldırıldı.");
  } catch (error) {
    console.error("Varlık kaldırma işlemi sırasında hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};

const createComplain = async () => {
  if (!ethers.utils.isAddress(leaserAddressComplain) || !ethers.utils.isAddress(ownerAddressComplain)) {
    alert("Geçersiz adres girildi.");
    return;
  }
  const houseShopNumberParsed = parseInt(houseShopNumberComplain);
  if (isNaN(houseShopNumberParsed)) {
    alert("Geçersiz House/Shop numarası girildi.");
    return;
  }
  if (!complaintReasonComplain) {
    alert("Bir şikayet nedeni giriniz.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).createComplain(
      leaserAddressComplain,
      ownerAddressComplain,
      houseShopNumberParsed,
      complaintReasonComplain
    );
    await transaction.wait();
    alert("Şikayet başarıyla oluşturuldu.");
  } catch (error) {
    console.error("Şikayet oluşturma işlemi sırasında hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }

};

const decisionOwner = async () => {
  if (!ethers.utils.isAddress(complainantAddress)) {
    alert("Geçersiz şikayetçi adresi girildi.");
    return;
  }
  const compNumberParsed = parseInt(complaintNumber);
  if (isNaN(compNumberParsed)) {
    alert("Geçersiz şikayet numarası girildi.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).decisionOwner(
      complainantAddress,
      compNumberParsed,
      decision,
      isRightful
    );
    await transaction.wait();
    alert("Karar başarıyla kaydedildi.");
  } catch (error) {
    console.error("Karar kaydetme işlemi sırasında hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};

const endRentEarly1 = async () => {
  if (!ethers.utils.isAddress(leaserAddressEarlyEnd) || !ethers.utils.isAddress(ownerAddressEarlyEnd)) {
    alert("Geçersiz adres girildi.");
    return;
  }
  const contractMappingOwnerNumberParsed = parseInt(contractMappingOwnerNumber);
  const houseShopNumberParsed = parseInt(houseShopNumberEarlyEnd);

  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).endRentEarly1(
      leaserAddressEarlyEnd,
      ownerAddressEarlyEnd,
      contractMappingOwnerNumberParsed,
      houseShopNumberParsed
    );
    await transaction.wait();
    alert("Erken kira sonlandırma işlemi başarıyla tamamlandı.");
  } catch (error) {
    console.error("Erken kira sonlandırma işlemi sırasında bir hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};

const ownerLeaserResponseEarlyEnd = async () => {
  if (!ethers.utils.isAddress(ownerAddressEaryResponse)) {
    alert("Geçersiz adres girildi.");
    return;
  }
  const endRentEarlyMappingNumberParsed = parseInt(endRentEarlyMappingNumber);
  if (isNaN(endRentEarlyMappingNumberParsed)) {
    alert("Geçersiz End Rent Early Mapping numarası girildi.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const transaction = await lockContract.connect(signer).ownerLeaserResponseEarlyEnd(
      ownerAddressEaryResponse,
      endRentEarlyMappingNumberParsed,
      activeResponse
    );
    await transaction.wait();
    alert("Erken kira sonlandırma yanıtı başarıyla gönderildi.");
  } catch (error) {
    console.error("Erken kira sonlandırma yanıtı işlemi sırasında bir hata oluştu:", error);
    alert("İşlem sırasında bir hata oluştu. Lütfen konsolu kontrol edin.");
  }
};




  return (
    <div className="App">

      <p className="Title">  ParibuHub & Rise In Solidity Smart Contract Final Project  </p>
      <p className="Title">  Anıl Altunay </p>
    
    {isConnected ? (
  <p> Connected address is : {address6} </p>
) : (
  <button onClick={connectWallet}> Connect Wallet </button>
)}

<div>
  <button onClick={handleGetOwnerAddress}>Get Owner Address</button>
    {ownerAddress && <p>Contract Owner Address: {ownerAddress}</p>}

  </div>

    <div>
      <p></p>
      <input
        type="text1"
        placeholder="Address"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
      />
      <p> </p>

      <button onClick={getBalance}>Get Balance</button>
      <p></p>
      { balance && <p>Balance is: {balance} ETH</p> }
    </div>



  <div> 

  <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Index"
        value={index}
        onChange={(e) => setIndex(parseInt(e.target.value,10))}
      />
      
      <button onClick={handleGetValue}>Get PropertyMap </button>
      { isVisible && <p> Property.owner:       {propertyValue.owner}</p>}
      { isVisible && <p> Property AssetName:   {propertyValue.AssetName}</p>}
      { isVisible && <p> Property Active:      {propertyValue.active ? "True" : "False"}</p>}
      { isVisible && <p> Property types1 :     {propertyValue.types}</p>}
      { isVisible && propertyValue && <p> Property MonthPrice: {ethers.utils.formatUnits(propertyValue.MonthPrice,0)} wei </p>}
    


    </div>

    <input
        type="text"
        placeholder="Address"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
      />
      <input
        type="number"
        placeholder="Index"
        value={indexContract}
        onChange={(e) => setIndexContract(parseInt(e.target.value,10))}
      />
      
      <button onClick={getContract}>Get Contract Mapping </button>
      { isVisible2 && <p> contract.owner: {contracts.owner}</p>}
      { isVisible2 && <p> contract.leaser: {contracts.leaser}</p>}
      { isVisible2 && <p> contract.PropertyName: {contracts.ProportName}</p>}
      { isVisible2 && contracts &&  <p> contract.RentPrice: {ethers.utils.formatUnits(contracts.RentPrice,0)}</p>}
      { isVisible2 && contracts &&  <p> contract.RentStart BlockTimes : {ethers.utils.formatUnits(contracts.RentStart,0)}</p>}
      { isVisible2 && contracts &&  <p> contract.RentEnd  BlockTimes  : {ethers.utils.formatUnits(contracts.RentEnd,0)}</p>}

      <div> 



       
      <input
  type="text"
  placeholder="Address"
  value={address3}
  onChange={(e) => setAddress3(e.target.value)}
/>

<input
  type="number"
  placeholder="Index"
  value={indexComplain}
  onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    setIndexComplain(Number.isNaN(value) ? '' : value);
  }}
/>
      
      <button onClick={getComplain}>Get Complain Mapping </button>
      { isVisible3 && <p>  complain.leaser :       {complains.leaser}</p>}
      { isVisible3 && <p>  complain.owner :        {complains.owner}</p>}
      { isVisible3 && <p>  complain.AssetNumber :  {complains.HouseShopNumber}</p>}
      { isVisible3 && <p>  complain.reason :       {complains.reason}</p>}
      { isVisible3 && <p>  complain.decision :     {complains.decision}</p>}
      { isVisible3 && <p>  complain.rightfull :    {complains.rightful ? "True" : "False"}</p>}
      { isVisible3 && <p>  complain.active :       {complains.active ? "True" : "False"}</p>}




      </div>

      <div>
      <p></p>
      <input
        type="text3"
        placeholder="Address"
        value={address4}
        onChange={(e) => setAddress4(e.target.value)}
      />
      <p> </p>

      <button onClick={getBlackList}> Search in Blacklist</button>
      <p></p>
      {isVisible4 && <p> Address blacklist status :  {blacklist ? "True" : "False"}</p> }

     </div>

     <div> 
 
    <input
      type="text"
      placeholder="Address"
      value={address5}
      onChange={(e) => setAddress5(e.target.value)}
    />
    <input
      type="number"
      placeholder="Index"
      value={indexEntRentEarly}
      onChange={(e) => setIndexEntRent(parseInt(e.target.value,10))}
    />
    
    <button onClick={getEndRentMapping}>Get EndRentEarly Mapping </button>
    { isVisible5 && <p>  EndRentEarlyMapping.owner:            {EndRentEarlyMapping.owner}</p>}
    { isVisible5 && <p>  EndRentEarlyMapping.leaser:           {EndRentEarlyMapping.leaser}</p>}
    { isVisible5 && <p>  EndRentEarlyMapping.HouseShopNumber:  {EndRentEarlyMapping.HouseShopNumber}</p>}
    { isVisible5 && <p>  EndRentEarlyMapping.leaserActive:     {EndRentEarlyMapping.leaserActive ? "True" : "False"}</p>}
    { isVisible5 && <p>  EndRentEarlyMapping.ownerActive:      {EndRentEarlyMapping.ownerActive ? "True" : "False"}</p>}
    { isVisible5 && <p>  EndRentEarlyMapping.active :          {EndRentEarlyMapping.active ? "True" : "False"}</p>}
   
    
    </div>

    <p></p>

    <div>
    <input
    type="text"
    placeholder="AssetOwner Address"
    value={setownerAddress}
    onChange={(e) => setOwnerAddressFunction(e.target.value)}
  />
  <input
    type="text"
    placeholder="Asset Name"
    value={assetName}
    onChange={(e) => setAssetName(e.target.value)}
  />
  <input
    type="text"
    placeholder="HouseShop Type"
    value={propertyType}
    onChange={(e) => setPropertyType(e.target.value)}
  />
  <input
    type="text"
    placeholder="Rent Price_Monthly (Wei)"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />
  <button onClick={setHouseShop}>SetHouseShop</button>
  <p></p>

  </div>

  <div>
  <input type="text6" placeholder="Leaser Address" value={leaserAddress} onChange={e => setLeaserAddress(e.target.value)} />
  <input type="text6" placeholder="Owner Address" value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)} />
  <input type="number" placeholder="HouseShopNumber" value={houseShopNumber} onChange={e => setHouseShopNumber(Number(e.target.value))} />
  <input type="text" placeholder="Asset Name" value={assetNameRent} onChange={e => setAssetNameRent(e.target.value)} />
  <input type="number" placeholder="EndRentTime (Multiple 30)" value={rentEnd} onChange={e => setRentEnd(e.target.value)} />
  <input type="text" placeholder="Monthly RentPrice amount (Wei)" value={amountRent} onChange={e => setAmountRent(e.target.value)} />
  <button onClick={getRent}>Get Rent </button>
  <p> </p>
</div>

<div>
  <input
    type="text"
    placeholder="Owner Address"
    value={ownerAddressEndRent}
    onChange={(e) => setOwnerAddressEndRent(e.target.value)}
  />
  <input
    type="text"
    placeholder="Leaser Address"
    value={leaserAddressEndRent}
    onChange={(e) => setLeaserAddressEndRent(e.target.value)}
  />
  <input
    type="number"
    placeholder="HouseShop Number"
    value={houseShopNumberEndRent}
    onChange={(e) => setHouseShopNumberEndRent(Number(e.target.value))}
  />
  <button onClick={endRent}>EndRent</button>
  <p> </p>

</div>

<div>
  <input
    type="text"
    placeholder="Owner Address"
    value={ownerAddressRemove}
    onChange={(e) => setOwnerAddressRemove(e.target.value)}
  />
  <input
    type="number"
    placeholder="House/Shop Number"
    value={houseShopNumberRemove}
    onChange={(e) => setHouseShopNumberRemove(e.target.value)}
  />
  <button onClick={removeHouseShop}>Remove House/Shop</button>
  <p> </p>

</div>

<div>
  <input
    type="text"
    placeholder="Leaser Address"
    value={leaserAddressComplain}
    onChange={(e) => setLeaserAddressComplain(e.target.value)}
  />
  <input
    type="text"
    placeholder="Owner Address"
    value={ownerAddressComplain}
    onChange={(e) => setOwnerAddressComplain(e.target.value)}
  />
  <input
    type="number"
    placeholder="House/Shop Number"
    value={houseShopNumberComplain}
    onChange={(e) => setHouseShopNumberComplain(e.target.value)}
  />
  <textarea
    placeholder="Complaint Reason"
    value={complaintReasonComplain}
    onChange={(e) => setComplaintReasonComplain(e.target.value)}
  />
  <button onClick={createComplain}>Create Complaint</button>
  <p> </p>

</div>

<div>
  <input
    type="text"
    placeholder="Complainant Address"
    value={complainantAddress}
    onChange={(e) => setComplainantAddress(e.target.value)}
  />
  <input
    type="number"
    placeholder="Complaint Number"
    value={complaintNumber}
    onChange={(e) => setComplaintNumber(e.target.value)}
  />
  <textarea
    placeholder="Decision"
    value={decision}
    onChange={(e) => setDecision(e.target.value)}
  />
  <label>
    İf You Want True Please check box !! 
    <input
      type="checkbox"
      checked={isRightful}
      onChange={(e) => setIsRightful(e.target.checked)}
    />
  </label>
  <button onClick={decisionOwner}>Owner Submit Decision</button>
  <p> </p>
</div>

<div>
  <input
    type="text"
    placeholder="Leaser Address"
    value={leaserAddressEarlyEnd}
    onChange={(e) => setLeaserAddressEarlyEnd(e.target.value)}
  />
  <input
    type="text"
    placeholder="Owner Address"
    value={ownerAddressEarlyEnd}
    onChange={(e) => setOwnerAddressEarlyEnd(e.target.value)}
  />
  <input
    type="number"
    placeholder="Contract Mapping Owner Number"
    value={contractMappingOwnerNumber}
    onChange={(e) => setContractMappingOwnerNumber(e.target.value)}
  />
  <input
    type="number"
    placeholder="House/Shop Number"
    value={houseShopNumberEarlyEnd}
    onChange={(e) => setHouseShopNumberEarlyEnd(e.target.value)}
  />
  <button onClick={endRentEarly1}>End Rent Early</button>
  <p> </p>
</div>

<div>
  <input
    type="text"
    placeholder="Owner Address"
    value={ownerAddressEaryResponse}
    onChange={(e) => setOwnerAddressEarlyResponse(e.target.value)}
  />
  <input
    type="number"
    placeholder="End Rent Early Mapping Number"
    value={endRentEarlyMappingNumber}
    onChange={(e) => setEndRentEarlyMappingNumber(e.target.value)}
  />
  <label>
  İf You Want True Please check box !! 
    <input
      type="checkbox"
      checked={activeResponse}
      onChange={(e) => setActiveResponse(e.target.checked)}
    />
   </label>
   <button onClick={ownerLeaserResponseEarlyEnd}>Submit Response</button>
   </div>

   <p className="EndTitle"> Thank you Veli Uysal for your efforts. </p>

   </div>
    
);
}

export default App;