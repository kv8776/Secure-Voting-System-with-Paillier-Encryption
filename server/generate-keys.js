const paillierBigint = require('paillier-bigint');
const fs = require('fs');
const path = require('path');

async function generateKeys() {
  const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(2048);

 
  const publicKeyString = {
    n: publicKey.n.toString(),
    g: publicKey.g.toString()
  };

  const privateKeyString = {
    lambda: privateKey.lambda.toString(),
    mu: privateKey.mu.toString(),
    publicKey: publicKeyString
  };
  const keysDir = path.join(__dirname, 'keys');
  if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir);
  }

  // Save the files bro !!
  fs.writeFileSync(path.join(keysDir, 'public_key.json'), JSON.stringify(publicKeyString, null, 2));
  fs.writeFileSync(path.join(keysDir, 'private_key.json'), JSON.stringify(privateKeyString, null, 2));

  console.log('Keys generated and saved to keys/public_key.json and keys/private_key.json');
}

module.exports = { generateKeys };
