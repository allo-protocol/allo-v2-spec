import { decodeAbi } from "@spec.dev/core";
import { formatMetadataAsStruct } from "./formatter";

// Deocoders

export function decodeRFPRegistrationData(
  useRegistryAnchor: boolean,
  data: any
) {
  if (useRegistryAnchor) {
    const [, proposalBid, metadata] = decodeAbi(data, [
      "address",
      "uint256",
      "tuple(uint256, string)",
    ]);

    return {
      proposalBid,
      metatdata: formatMetadataAsStruct(metadata),
    };
  } else {
    const [, , proposalBid, metadata] = decodeAbi(data, [
      "address",
      "address",
      "uint256",
      "tuple(uint256, string)",
    ]);

    return {
      proposalBid,
      metadata: formatMetadataAsStruct(metadata),
    };
  }
}

export function decodeMerkleRegistrationData(
  useRegistryAnchor: boolean,
  data: any
) {
  if (useRegistryAnchor) {
    const [, , metadata] = decodeAbi(data, [
      "address",
      "uint256",
      "tuple(uint256, string)",
    ]);

    return {
      metatdata: formatMetadataAsStruct(metadata),
    };
  } else {
    const [, , metadata] = decodeAbi(data, [
      "address",
      "address",
      "tuple(uint256, string)",
    ]);

    return {
      metadata: formatMetadataAsStruct(metadata),
    };
  }
}
