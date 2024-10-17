import React, { useState, useEffect } from "react";
import Web3 from "web3";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractData, setContractData] = useState("");

  const contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "yourReadFunction",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contractAddress = "0x8953280717Cee949290F41dF440B7B57f5a4F0ed";


  useEffect(() => {
    if (window.ethereum) {
      // Create a new Web3 instance
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      console.log(typeof(web3Instance));
      // Request access to the user's MetaMask account
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then(accounts => {
          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        })
        .catch(error => console.error("Error connecting to MetaMask:", error));
    } else {
      console.error("MetaMask not found. Please install MetaMask extension.");
    }
  }, []);

  const interactWithContract = async () => {
    if (contract) {
      try {
        // Example: Calling a read function from the smart contract
        const result = await contract.methods.yourReadFunction().call();
        setContractData(result);
      } catch (error) {
        console.error("Error interacting with contract:", error);
      }
    }
  };

  return (
    <div>
      <h1>Web3 + React App</h1>
      <p>Connected Account: {account || "Not connected"}</p>
      <button onClick={interactWithContract}>Interact with Contract</button>
      <p>Contract Data: {contractData}</p>
    </div>
  );
};

export default App;