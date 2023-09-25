import { decodeAbi } from "@spec.dev/core";

import { formatMetadataAsStruct } from "./formatter.ts";

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

export function decodeQVRegistrationData(
  useRegistryAnchor: boolean,
  data: any
) {
  if (useRegistryAnchor) {
    const [recipientId, recipientAddress, metadata] = decodeAbi(data, [
      "address",
      "address",
      "tuple(uint256, string)",
    ]);

    return {
      recipientId,
      recipientAddress,
      metadata: formatMetadataAsStruct(metadata),
    };
  } else {
    const [recipientAddress, registryAnchor, metadata] = decodeAbi(data, [
      "address",
      "address",
      "tuple(uint256, string)",
    ]);

    return {
      recipientAddress,
      registryAnchor,
      metadata: formatMetadataAsStruct(metadata),
    };
  }
}
