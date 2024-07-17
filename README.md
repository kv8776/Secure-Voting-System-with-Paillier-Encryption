`# Secure Voting System with Paillier Encryption

## Introduction

In this article, we present a secure voting system leveraging Partial Homomorphic Encryption (PHE) to ensure complete voter privacy. The system ensures both voter identities and votes remain concealed from all participants on the network. Paillier encryption, a form of PHE, is employed for its ability to perform computations on encrypted data without revealing the plaintext. Although similar outcomes could be achieved with other cryptosystems like ElGamal, Paillier strikes a balance between privacy and computational feasibility. The system's design supports applications beyond voting, including quizzes and surveys, and is adaptable for both server-side and client-side operations, making it suitable for decentralized platforms such as blockchains.
Getting Started
---------------
### Features

-   **Secure Voting:** Utilizes Paillier encryption to secure votes during transmission and storage, ensuring confidentiality.
-   **Anonymity:** Implements zero-knowledge proofs (ZKP) for verifying vote validity without revealing voter identity.
-   **Scalable:** Designed with modularity and decentralization to handle varying scales of elections.
-   **User-friendly Interface:** Provides intuitive user interfaces for voters and administrators to manage the voting process.
To run this project locally, follow these steps:

### Prerequisites

-   Node.js installed on your machine
-   npm (Node Package Manager)

### Installation

1.  Clone the repository:

    bash

    Copy code

    `git clone <repository-url>
    cd voting-system-react`

2.  Install dependencies for both backend and frontend:

    bash

    Copy code

    `cd server
    npm install
    cd ../client
    npm install`

3.  Generate Paillier encryption keys:

    bash

    Copy code

    `cd server
    npm run generate-keys`

### Running the Application

1.  Start the backend server:

    bash

    Copy code

    `cd server
    npm start`

    The server will start running on `http://localhost:5000`.

2.  Start the frontend application:

    bash

    Copy code

    `cd client
    npm start`

    The frontend development server will start and open in your default browser at `http://localhost:3000`.

### Usage

-   **Admin Panel (`/admin`):** Add contestants, start the voting process.
-   **User Panel (`/`):** View contestants, vote securely using Paillier encryption.
## General Flow

### Organizer

The organizer initializes the voting process by generating a secure public/private key pair using Paillier. The public key is shared with all participants, while the private key remains confidential with the organizer. The organizer collects encrypted votes from aggregators, decrypts them using the private key, and announces the voting results.

### Voter

Voters utilize software to prepare and cast their votes. They access ballot details (candidates, public key), select a candidate, encode their choice into an integer, encrypt it using the organizer's public key, and submit the encrypted vote to the aggregator.

### Aggregator

Aggregators collect encrypted votes from voters, validate them using zero-knowledge proofs (ZKP) provided by voters, aggregate valid votes, and securely store them. Aggregators must remain independent from the organizer to prevent unauthorized access to voter choices.

## Vote Encoding

To encode votes into a single integer for arithmetic operations and subsequent Paillier encryption, each candidate is assigned a unique number (e.g., 0 for Alice, 1 for Bob, 2 for Carlos). This encoding facilitates operations on encrypted data while preserving voter anonymity.

### Usage

#### Encode a Single-Choice Vote

```javascript
import { VoteEncoder } from "phe-voting-js";

const numChoices = 3;
const choice = 1; // Bob
const bitsPerChoice = 8;

const encoded = VoteEncoder.encodeSingle(choice, numChoices, bitsPerChoice);
// encoded = 256

const decoded = VoteEncoder.decode(encoded, numChoices, bitsPerChoice);
// decoded = [0, 1, 0] `

#### Encode a Multiple-Choice Vote

javascript

Copy code

`import { VoteEncoder } from "phe-voting-js";

const numChoices = 3;
const choices = [0, 1]; // Alice and Bob
const bitsPerChoice = 8;

const encoded = VoteEncoder.encodeMultiple(choices, numChoices, bitsPerChoice);
// encoded = 257

const decoded = VoteEncoder.decode(encoded, numChoices, bitsPerChoice);
// decoded = [1, 1, 0]`

Paillier Cryptosystem
---------------------

The Paillier cryptosystem supports partial homomorphic properties, enabling addition and multiplication of encrypted values without decrypting them. This capability ensures vote aggregation while maintaining voter confidentiality. Here's a simplified implementation for illustration purposes:

### Disclaimer

The following implementation is simplified and should not be used for security-critical applications.

### Usage

#### Generating Key Pair

javascript

Copy code

`import { Paillier } from "phe-voting-js";

const [pub, priv] = Paillier.generateKeyPair(256);`

#### Encryption and Decryption

javascript

Copy code

`import { Paillier, bigInt } from "phe-voting-js";

const plainMessage = bigInt(12345);
const encryptedMessage = Paillier.encrypt(plainMessage, pub);

const decryptedMessage = Paillier.decrypt(encryptedMessage, pub, priv);
// decryptedMessage = 12345`

#### Arithmetic Operations

javascript

Copy code

`import { Paillier, bigInt } from "phe-voting-js";

const a = bigInt(1);
const b = bigInt(2);

const aEncrypted = Paillier.encrypt(a, pub);
const bEncrypted = Paillier.encrypt(b, pub);

const sumEncrypted = Paillier.addEncrypted(aEncrypted, bEncrypted, pub);
const sum = Paillier.decrypt(sumEncrypted, pub, priv);
// sum = 3`

#### Signing and Verification

javascript

Copy code

`import { Paillier, bigInt } from "phe-voting-js";

const m = bigInt(12345);
const sig = Paillier.createSignature(m, pub, priv);

const valid = Paillier.verifySignature(m, sig, pub);
// valid should be true`

#### Zero-Knowledge Proof

javascript

Copy code

`import { Paillier, bigInt } from "phe-voting-js";

const m = bigInt(12345);
const valid = [bigInt(1), bigInt(12345)];
const invalid = [bigInt(1), bigInt(2)];

const [c, commitment] = Paillier.encryptWithZkp(m, valid, pub);
Paillier.verifyZkp(c, valid, commitment, pub); // true
Paillier.verifyZkp(c, invalid, commitment, pub); // false`

Conclusion
----------

The secure voting system presented here demonstrates the application of Paillier encryption to preserve voter privacy while enabling accurate vote aggregation. Future enhancements could focus on enhancing voter anonymity and integrating blockchain technology for decentralized voting systems.

References
----------

-   [Paillier Cryptosystem - Wiki](https://en.wikipedia.org/wiki/Paillier_cryptosystem)
-   [Paillier Cryptosystem - Original Paper](https://link.springer.com/content/pdf/10.1007/3-540-48910-X_1.pdf)
