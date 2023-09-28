import { decodeAbi, isNullAddress } from "@spec.dev/core"

import { formatMetadataAsStruct } from "./formatter.ts"

// ====================
// =   RFP Decoder    =
// ====================
export function decodeRFPSimpleInitializedData(
  data: any
) {
  const [maxBid, useRegistryAnchor, metadataRequired] = decodeAbi(data, [
      "uint256",
      "bool",
      "bool",
  ])

  return {
    maxBid,
    useRegistryAnchor,
    metadataRequired,
  }
}

export function decodeRFPCommitteeInitializedData(
  data: any
) {
  const [voteThreshold, rfpData ] = decodeAbi(data, [
      "uint256",
      "tuple(uint256, bool, bool)"
  ])

  const [maxBid, useRegistryAnchor, metadataRequired] = rfpData

  return {
    voteThreshold,
    maxBid,
    useRegistryAnchor,
    metadataRequired,
  }
}


export function decodeRFPRegistrationData(
  useRegistryAnchor: boolean,
  data: any
) {
  if (useRegistryAnchor) {
    const [, proposalBid, metadata] = decodeAbi(data, [
        "address",
        "uint256",
        "tuple(uint256, string)",
    ])

    return {
      isUsingRegistryAnchor: true,
      proposalBid,
      metatdata: formatMetadataAsStruct(metadata),
    }
  } else {
    const [, registryAnchor, proposalBid, metadata] = decodeAbi(data, [
        "address",
        "address",
        "uint256",
        "tuple(uint256, string)",
    ])

    const isUsingRegistryAnchor = !isNullAddress(registryAnchor)

    return {
      isUsingRegistryAnchor,
      proposalBid,
      metadata: formatMetadataAsStruct(metadata),
    }
  }
}

// ================================================
// =   DonationVotingMerkleDistribution Decoder   =
// ================================================

export function decodeDonationVotingMerkleDistributionInitializedData(
  data: any
) {
  const [
    useRegistryAnchor,
    metadataRequired,
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime,
    allowedTokens,
  ] = decodeAbi(data, [
      "bool",
      "bool",
      "uint64",
      "uint64",
      "uint64",
      "uint64",
      "address[]"
  ])

  return {
    useRegistryAnchor,
    metadataRequired,
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime,
    allowedTokens: allowedTokens.map(token => token.toLowerCase()),
  }
}

export function decodeDonationVotingMerkleDistributionRegistrationData(
  useRegistryAnchor: boolean,
  data: any
) {
  if (useRegistryAnchor) {

    const [, recipientAddress, metadata] = decodeAbi(data, [
        "address",
        "address",
        "tuple(uint256, string)",
    ])

    return {
      isUsingRegistryAnchor: true,
      recipientAddress: recipientAddress.toLowerCase(),
      metadata: formatMetadataAsStruct(metadata),
    }
  } else {
    const [recipientAddress, registryAnchor, metadata] = decodeAbi(data, [
        "address",
        "address",
        "tuple(uint256, string)",
    ])

    const isUsingRegistryAnchor = !isNullAddress(registryAnchor)

    return {
      isUsingRegistryAnchor,
      recipientAddress: recipientAddress.toLowerCase(),
      metadata: formatMetadataAsStruct(metadata),
    }
  }
}

export function decodeRecipientIndexDonationVotingMerkleDistribution(
  data: any
) {
  const [encodedData, recipientIndex] = decodeAbi(data, [
      "bytes",
      "uint256"
  ])

  return {
    encodedData,
    recipientIndex,
  }
}