import { decodeAbi } from "@spec.dev/core";

export function decodeRfpRegistrationData(useRegistryAnchor: boolean, data: any) {
  if (useRegistryAnchor) {
    const [recipientId, proposalBid, metadata] = decodeAbi(data, [
      "address",
      "uint256",
      "tuple(uint256, string)",
    ]);

    return {
      proposalBid,
      metadata,
    };
  } else {
    const [recipientAddress, registryAnchor, proposalBid, metadata] = decodeAbi(
      data,
      ["address", "address", "uint256", "tuple(uint256, string)"]
    );

    return {
      proposalBid,
      metadata,
    };
  }
}
