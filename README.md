# Secure Voting System Using Paillier Homomorphic Encryption

## Overview
This project implements a secure e-voting system leveraging Paillier homomorphic encryption to ensure the confidentiality and integrity of votes. Homomorphic encryption allows computations to be performed on encrypted data without decrypting it, making it ideal for scenarios where sensitive data (like votes) needs to be processed securely.

## How Paillier Homomorphic Encryption Works
Paillier encryption involves two main keys: a public key (`n`, `g`) and a private key (`lambda`, `mu`). Here’s a brief overview of the encryption and decryption process:

### Encryption
**Key Generation:**
```javascript
const paillierBigint = require('paillier-bigint');

// Generate Paillier key pair
const { publicKey, privateKey } = paillierBigint.generateRandomKeys(2048);
