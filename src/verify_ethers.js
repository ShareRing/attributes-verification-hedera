const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const { getEnv, getEnvEthers } = require("./env");

async function main() {
  const { didTokenId, operatorEcdsaPvkey, attributeValueHash, proof } =
    getEnv();
  const { relayEndpoint, contractAddress } = getEnvEthers();
  const provider = new ethers.JsonRpcProvider(relayEndpoint);

  const signer = new ethers.Wallet(operatorEcdsaPvkey, provider);

  const abi = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../abi/VerifiableCredentialsToken.json")
    )
  );

  const vct = new ethers.Contract(contractAddress, abi, signer);

  const gasPrice = (await provider.getFeeData()).gasPrice;

  console.log(`- Gas price: ${ethers.formatEther(gasPrice)}`);

  const estimatedGas = await vct.verifyAttribute.estimateGas(
    didTokenId,
    Buffer.from(attributeValueHash, "hex"),
    proof.map((p) => Buffer.from(p, "hex"))
  );

  console.log(`- Estimated gas: ${estimatedGas}`);

  const contractQueryResult = await vct.verifyAttribute(
    didTokenId,
    Buffer.from(attributeValueHash, "hex"),
    proof.map((p) => Buffer.from(p, "hex")),
    {
      gasLimit: estimatedGas,
      gasPrice,
    }
  );

  console.log(`- Verification result: ${contractQueryResult}`);
}

main();
