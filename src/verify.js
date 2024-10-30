const {
  Client,
  ContractFunctionParameters,
  ContractCallQuery,
  AccountId,
  PrivateKey,
} = require("@hashgraph/sdk");
const { getEnv } = require("./env");

async function main() {
  const {
    operatorId,
    operatorEcdsaPvkey,
    contractId,
    didTokenId,
    attributeValueHash,
    proof,
  } = getEnv();
  const operatorAccountId = AccountId.fromString(operatorId);
  const operatorKey = PrivateKey.fromStringECDSA(operatorEcdsaPvkey);

  const client = Client.forTestnet().setOperator(
    operatorAccountId,
    operatorKey
  );

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
