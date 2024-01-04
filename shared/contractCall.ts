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
    // SQFSuperfluidv1
    case "0xf8a14294e80ff012e54157ec9d1b2827421f1e7f6bde38c06730b1c031b3f935":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.SQFSuperFluidStrategy",
        contractGroups: ["allov2.SQFSuperFluidStrategy"],
      };

    // MicroGrantsv1
    case "0x697f0592ebd05466d2d24454477e11d69c475d7a7c4134f15ddc1ea9811bb16f":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsStrategy",
        contractGroups: [
          "allov2.MicroGrantsStrategy",
          "allov2.MicroGrantsCommon",
        ],
      };

    // MicroGrantsGovv1
    case "0x741ac1e2f387d83f219f6b5349d35ec34902cf94019d117335e0045d2e0ed912":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsGovStrategy",
        contractGroups: [
          "allov2.MicroGrantsGovStrategy",
          "allov2.MicroGrantsCommon",
        ],
      };

    // MicroGrantsHatsv1
    case "0x5aa24dcfcd55a1e059a172e987b3456736b4856c71e57aaf52e9a965897318dd":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.MicroGrantsHatsStrategy",
        contractGroups: [
          "allov2.MicroGrantsHatsStrategy",
          "allov2.MicroGrantsCommon",
        ],
      };
      
    // RFPSimplev1
    case "0x0362c85758aca10c506ca07c8a16e387eae5f6e3ed0bbecd62ce420863550b17":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPSimpleStrategy",
        contractGroups: ["allov2.RFPSimpleStrategy"],
      };

    // RFPCommitteev1
    case "0x77ebe7547cdda23b3167d8264ea3b591f19fd3dae29aa83630cc4ad5258a4ae5":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.RFPCommitteeStrategy",
        contractGroups: ["allov2.RFPCommitteeStrategy"],
      };

    // QVSimplev1
    case "0x791aa1afdfa967c276345b04f603ae73c0fa8e61c0173ca01cb4a4ec7e93d091":
      return {
        strategyId: strategyId,
        contractGroupName: "allov2.QVSimpleStrategy",
        contractGroups: ["allov2.QVSimpleStrategy"],
      };

    // DonationVotingMerkleDistributionDirectTransferv1
    case "0x8334c481ebbdc061855b23aff1e7419845efbd8a43321c692acdc270ae47e674":
      return {
        strategyId: strategyId,
        contractGroupName:
          "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
        contractGroups: [
          "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
        ],
      };

    // DonationVotingMerkleDistributionVaultv1
    case "0xe5627de3d087fb2486828b06b5434ee857bc25b4eab1ce67aa3ba126dfbd5313":
      return {
        strategyId: strategyId,
        contractGroupName:
          "allov2.DonationVotingMerkleDistributionVaultStrategy",
        contractGroups: [
          "allov2.DonationVotingMerkleDistributionVaultStrategy",
        ],
      };

    default:
      return {};
  }
}
