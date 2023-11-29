import { decodeAbi, isNullAddress } from "@spec.dev/core"

import { formatMetadataAsStruct } from "./formatter.ts"

// ======================
// =   Common Decoder   =
// ======================

export function decodeGenericRegistrationData(
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
    const [recipientAddress, proposalBid, metadata] = decodeAbi(data, [
        "address",
        "uint256",
        "tuple(uint256, string)",
    ])

    return {
      recipientAddress: recipientAddress.toLowerCase(),
      isUsingRegistryAnchor: true,
      proposalBid,
      metatdata: formatMetadataAsStruct(metadata),
    }
  } else {
    const [recipientAddress, registryAnchor, proposalBid, metadata] = decodeAbi(data, [
        "address",
        "address",
        "uint256",
        "tuple(uint256, string)",
    ])

    const isUsingRegistryAnchor = !isNullAddress(registryAnchor)

    return {
      recipientAddress: recipientAddress.toLowerCase(),
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

// ========================
// =   QVSimple Decoder   =
// ========================

export function decodeQVSimpleInitializedData(
  data: any
) {
  const [
    maxVoiceCreditsPerAllocator,
    initParams
  ] = decodeAbi(data, [
      "uint256",
      "tuple(bool, bool, uint256, uint64, uint64, uint64, uint64)",
  ])

  const [
    useRegistryAnchor,
    metadataRequired,
    reviewThreshold,
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime
  ] = initParams

  return {
    useRegistryAnchor,
    metadataRequired,
    reviewThreshold,
    registrationStartTime,
    registrationEndTime,
    allocationStartTime,
    allocationEndTime,
    maxVoiceCreditsPerAllocator
  }
}

// ========================
// = MicroGrants Decoder  =
// ========================

export function decodeMicroGrantsInitializedData(
  data: any
) {
  const [
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount
  ] = decodeAbi(data, [
      "bool",
      "uint64",
      "uint64",
      "uint256",
      "uint256",
  ])

  return {
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount
  }
}

export function decodeMicroGrantsRegistrationData(
  data: any
) {
  const [registryAnchor, recipientAddress, requestedAmount, metadata] = decodeAbi(data, [
      "address",
      "address",
      "uint256",
      "tuple(uint256, string)",
  ])

  return {
    registryAnchor: registryAnchor.toLowerCase(),
    recipientAddress: recipientAddress.toLowerCase(),
    requestedAmount: requestedAmount,
    metadata: formatMetadataAsStruct(metadata),
  }
}

// ============================
// = MicroGrants Gov Decoder  =
// ============================

export function decodeMicroGrantsGovInitializedData(
  data: any
) {
  const [
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount,
    gov,
    snapshotReference,
    minVotePower
  ] = decodeAbi(data, [
      "bool",
      "uint64",
      "uint64",
      "uint256",
      "uint256",
      "address",
      "uint256",
      "uint256",
  ])

  return {
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount,
    gov,
    snapshotReference,
    minVotePower
  }
}

// =============================
// = MicroGrants Hats Decoder  =
// =============================

export function decodeMicroGrantsHatsInitializedData(
  data: any
) {
  const [
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount,
    hatsContract,
    hatsId
  ] = decodeAbi(data, [
      "bool",
      "uint64",
      "uint64",
      "uint256",
      "uint256",
      "address",
      "uint256",
  ])

  return {
    useRegistryAnchor,
    allocationStartTime,
    allocationEndTime,
    approvalThreshold,
    maxRequestedAmount,
    hatsContract,
    hatsId
  }
}