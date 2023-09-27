import { Contract } from "@spec.dev/core";

export async function getStrategyContractGroup(chainId: string, strategyContract: string) {
  const abi = [
    {
      inputs: [],
      name: "getStrategyId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new Contract(chainId, strategyContract, abi);

  const strategyId = await contract.getStrategyId();

  switch (strategyId) {
    case "0xb87f34c0968bd74d43a6a5b72831a5ea733a4783a026b9fc9b1d17adf51214d2":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPSimpleStrategy"
      };
  
    case "0x414f2ea9b91b8ee2e35a380fa0af0e14079832cc93530a61a4893b3dbf0a9aba":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPCommitteeStrategy"
      };
  
    case "0xed28ce0387d1786c1a38404047e9eecc4d1dcaeff695b867e912483e36c3d770":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.QVSimpleStrategy"
      };
   
    case "0xc5263e972c91d7ff40708bc71239a2b6cbc8768704e210ca3069e2e11fc195df":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.DonationVotingMerkleDistributionDirectTransferStrategy"
      };
   
    case "0xecc48557f4826bd1181a4495232d6d07f248ef9cc0a650e64520f6c9f7458a8c":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.DonationVotingMerkleDistributionVaultStrategy"
      };
   
    default:
      return ;
  }
}
