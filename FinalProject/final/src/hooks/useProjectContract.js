import {useState,useEffect}  from "react";
import {ethers} from "ethers";
import {PROJECT_ADDRESS} from "../constants/addresses";
import {Project_ABI} from "../constants/abi";

export const useProjectContract = () => {

const [contract, setContract] = useState(null);

useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _contract = new ethers.Contract(PROJECT_ADDRESS,Project_ABI,provider);
    setContract(_contract);

    
}, []);

   return contract;
}