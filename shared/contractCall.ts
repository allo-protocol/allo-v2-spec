import { Contract } from "@spec.dev/core";

export async function getStrategyGroup(chainId: string, strategyContract: string) {
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
  let contractGroup;
  if (
    strategyId ==
    "0xb87f34c0968bd74d43a6a5b72831a5ea733a4783a026b9fc9b1d17adf51214d2"
  ) {
    contractGroup = "allov2.RFPSimple";
  } else if (
    strategyId ==
    "0x414f2ea9b91b8ee2e35a380fa0af0e14079832cc93530a61a4893b3dbf0a9aba"
  ) {
    contractGroup = "allov2.RFPCommitteeStrategy";
  }

  return contractGroup;
}
