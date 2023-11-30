import { Contract } from "@spec.dev/core";

export async function getStrategyContractGroup(
  chainId: string,
  strategyContract: string
) {
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
    case "0x697f0592ebd05466d2d24454477e11d69c475d7a7c4134f15ddc1ea9811bb16f":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsStrategy",
        contractGroups: [
          "allov2.MicroGrantsStrategy",
          "allov2.MicroGrantsCommon"
        ],
      };

    case "0x741ac1e2f387d83f219f6b5349d35ec34902cf94019d117335e0045d2e0ed912":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsGovStrategy",
        contractGroups: [
          "allov2.MicroGrantsGovStrategy",
          "allov2.MicroGrantsCommon",
        ],
      };

    case "0x5aa24dcfcd55a1e059a172e987b3456736b4856c71e57aaf52e9a965897318dd":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsHatsStrategy",
        contractGroups: [
          "allov2.MicroGrantsHatsStrategy",
          "allov2.MicroGrantsCommon",
        ],
      };

    case "0xb87f34c0968bd74d43a6a5b72831a5ea733a4783a026b9fc9b1d17adf51214d2":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPSimpleStrategy",
        contractGroups: ["allov2.RFPSimpleStrategy"],
      };

    case "0x414f2ea9b91b8ee2e35a380fa0af0e14079832cc93530a61a4893b3dbf0a9aba":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPCommitteeStrategy",
        contractGroups: ["allov2.RFPCommitteeStrategy"],
      };

    case "0xed28ce0387d1786c1a38404047e9eecc4d1dcaeff695b867e912483e36c3d770":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.QVSimpleStrategy",
        contractGroups: ["allov2.QVSimpleStrategy"],
      };

    case "0xc5263e972c91d7ff40708bc71239a2b6cbc8768704e210ca3069e2e11fc195df":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
        contractGroups: [
          "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
        ],
      };

    case "0xecc48557f4826bd1181a4495232d6d07f248ef9cc0a650e64520f6c9f7458a8c":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.DonationVotingMerkleDistributionVaultStrategy",
        contractGroups: [
          "allov2.DonationVotingMerkleDistributionVaultStrategy",
        ],
      };

    default:
      return {};
  }
}
