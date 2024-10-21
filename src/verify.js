require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  ContractFunctionParameters,
  ContractCallQuery,
} = require("@hashgraph/sdk");

async function main() {
  if (!process.env.OPERATOR_ID) {
    throw new Error("OPERATOR_ID is not set in the environment variables");
  }

  if (!process.env.OPERATOR_ECDSA_PVKEY) {
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

  const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
  const operatorKey = PrivateKey.fromStringECDSA(
    process.env.OPERATOR_ECDSA_PVKEY
  );
  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction(
      "verifyAttribute",
      new ContractFunctionParameters()
        .addString(didTokenId)
        .addBytes32(Buffer.from(attributeValueHash, "hex"))
        .addBytes32Array(proof.map((p) => Buffer.from(p, "hex")))
    );

  const queryCost = await contractQueryTx.getCost(client);
  console.log(`- Query cost: ${queryCost}`);

  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getBool(0);
  console.log(`- Verification result: ${contractQueryResult}`);
}

main();
