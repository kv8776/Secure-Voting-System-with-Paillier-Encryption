Secure Voting System Using Paillier Homomorphic Encryption
Overview
This project implements a secure e-voting system leveraging Paillier homomorphic encryption to ensure the confidentiality and integrity of votes. Homomorphic encryption allows computations to be performed on encrypted data without decrypting it, making it ideal for scenarios where sensitive data (like votes) needs to be processed securely.

How Paillier Homomorphic Encryption Works
Paillier encryption involves two main keys: a public key (n, g) and a private key (lambda, mu). Here’s a brief overview of the encryption and decryption process:

Encryption
Key Generation:

Generate a random Paillier key pair (publicKey, privateKey).
Encrypting Votes:

Each voter’s choice (integer value representing a contestant) is encrypted using the public key.
Encrypted vote: ciphertext = g^vote * r^n mod n^2, where r is a random value.
Decryption
Decryption by the Authority:
Only the authority possessing the private key can decrypt the aggregated encrypted votes.
Decryption of the encrypted votes is performed using the private key.
Homomorphic Properties
Additive Homomorphism:
Allows adding of encrypted values: Enc(vote1) * Enc(vote2) mod n^2 = Enc(vote1 + vote2) mod n^2.
Multiplicative Homomorphism:
Allows multiplication of encrypted values by a scalar: Enc(vote)^k mod n^2 = Enc(vote * k) mod n^2.
Security Considerations
Confidentiality: Votes remain encrypted until decrypted by the authority.
Integrity: Ensures that votes cannot be altered without detection.
Authentication: Protects against unauthorized access to encryption keys.
Implementation Details
Key Generation: Use paillier-bigint library to generate and manage Paillier encryption keys.
Server-Side: Express.js server handles key management, voting endpoints, and admin/user interactions.
Client-Side: React.js components for admin and user interfaces interact with the server via API endpoints.
Dependencies
paillier-bigint: Library for Paillier Homomorphic Encryption.
express: Web framework for Node.js to handle server-side operations.
react: Frontend library for building user interfaces.
Future Enhancements
Zero-Knowledge Proofs: Implementing proofs to verify the validity of encrypted votes without revealing voter identities.
Scalability: Enhancing system performance and scalability for large-scale elections.
Contributing
Contributions are welcome! Please fork the repository and submit pull requests for improvements and features.
