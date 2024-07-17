const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const paillierBigint = require('paillier-bigint');
const cors = require('cors');
const { generateKeys } = require('./generate-keys'); 
const app = express();
const PORT = process.env.PORT || 5000;

// all required middlewares bro
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


let contestants = [];
let votingStarted = false;
let publicKey, privateKey;

async function setupKeys() {
  await generateKeys();
  loadKeys();
}

// Load the keys
function loadKeys() {
  const publicKeyPath = path.join(__dirname, './keys/public_key.json');
  const privateKeyPath = path.join(__dirname, './keys/private_key.json');

  if (fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath)) {
    const publicKeyData = JSON.parse(fs.readFileSync(publicKeyPath, 'utf8'));
    const privateKeyData = JSON.parse(fs.readFileSync(privateKeyPath, 'utf8'));

    publicKey = new paillierBigint.PublicKey(BigInt(publicKeyData.n), BigInt(publicKeyData.g));
    privateKey = new paillierBigint.PrivateKey(
      BigInt(privateKeyData.lambda),
      BigInt(privateKeyData.mu),
      publicKey
    );
    console.log('Keys loaded from files.');
  } else {
    console.error('Keys not found. Please generate the keys first.');
  }
}

setupKeys();

// Routes
app.get('/contestants', (req, res) => {
  res.json({ contestants, votingStarted });
});

app.get('/public-key', (req, res) => {
  res.json({ n: publicKey.n.toString(), g: publicKey.g.toString() });
});

app.post('/start-voting', (req, res) => {
  votingStarted = true;
  console.log('Voting started.');
  res.sendStatus(200);
});

app.post('/add-contestant', (req, res) => {
  const { name } = req.body;
  const id = contestants.length + 1;
  contestants.push({ id, name });
  console.log(`Added new contestant: ${name}`);
  res.sendStatus(200);
});

app.post('/vote', (req, res) => {
  const { encryptedVote } = req.body;

 
  let votes = {};
  try {
    votes = JSON.parse(fs.readFileSync(path.join(__dirname, './data/votes.json')));
  } catch (err) {
  
  }

  
  votes[encryptedVote] = votes[encryptedVote] ? votes[encryptedVote] + 1 : 1;
  fs.writeFileSync(path.join(__dirname, './data/votes.json'), JSON.stringify(votes, null, 2));

  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
