const { AccountId, PrivateKey } = require("@hashgraph/sdk");

require("dotenv").config();

function getEnv() {
  const operatorId = process.env.OPERATOR_ID;
  if (!operatorId) {
    throw new Error("OPERATOR_ID is not set in the environment variables");
  }

  const operatorEcdsaPvkey = process.env.OPERATOR_ECDSA_PVKEY;
  if (!operatorEcdsaPvkey) {
    throw new Error(
      "OPERATOR_ECDSA_PVKEY is not set in the environment variables"
    );
  }

  const contractId = process.env.CONTRACT_ID;
  if (!contractId) {
    throw new Error("CONTRACT_ID is not set in the environment variables");
  }

  const didTokenId = process.env.DID_TOKEN_ID;
  if (!didTokenId) {
    throw new Error("DID_TOKEN_ID is not set in the environment variables");
  }

  const proof = process.env.PROOF?.split(",");
  if (!proof || proof.length === 0) {
    throw new Error(
      "PROOF is not set or is empty in the environment variables"
    );
  }

  const attributeValueHash = process.env.ATTRIBUTE_VALUE_HASH;
  if (!attributeValueHash) {
    throw new Error(
      "ATTRIBUTE_VALUE_HASH is not set in the environment variables"
    );
  }

  return {
    operatorId,
    operatorEcdsaPvkey,
    contractId,
    didTokenId,
    proof,
    attributeValueHash,
  };
}

function getEnvEthers() {
  const relayEndpoint = process.env.RELAY_ENDPOINT;
  if (!relayEndpoint) {
    throw new Error("RELAY_ENDPOINT is not set in the environment variables");
  }
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS is not set in the environment variables");
  }
  return {
    relayEndpoint,
    contractAddress,
  };
}

module.exports = {
  getEnv,
  getEnvEthers,
};
