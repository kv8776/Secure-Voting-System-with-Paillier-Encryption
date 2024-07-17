/* global BigInt */

import React, { useEffect, useState } from 'react';
import ContestantList from './ContestantList';
import VoteButton from './VoteButton';
import Message from './Message';
import { PublicKey } from 'paillier-bigint';

const UserPage = () => {
  const [selectedContestant, setSelectedContestant] = useState('');
  const [message, setMessage] = useState('');
  const [votingStarted, setVotingStarted] = useState(false);
  const [contestants, setContestants] = useState([]);
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    const checkVotingStatus = async () => {
      try {
        const publicKeyResponse = await fetch('http://localhost:5000/public-key');
        const publicKeyData = await publicKeyResponse.json();
        setPublicKey(new PublicKey(BigInt(publicKeyData.n), BigInt(publicKeyData.g)));

    
        const response = await fetch('http://localhost:5000/contestants');
        const data = await response.json();
        setVotingStarted(data.votingStarted);
        if (data.votingStarted) {
          setContestants(data.contestants);
        }
      } catch (err) {
        alert('Something went wrong!');
      }
    };

    checkVotingStatus();
  }, []);

  const handleContestantChange = event => {
    setSelectedContestant(event.target.value);
  };

  const encryptVote = vote => {
    if (!publicKey) {
      alert('Public key not available!');
      return null;
    }

    const encryptedVote = publicKey.encrypt(BigInt(vote));
    return encryptedVote.toString();
  };

  const vote = async () => {
    try {
      if (!selectedContestant) {
        alert('Please select a contestant to vote.');
        return;
      }

      
      const selectedContestantId = contestants.find(contestant => contestant.name === selectedContestant).id;

      const encryptedVote = encryptVote(selectedContestantId);

      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedVote })
      });

      if (response.ok) {
        setMessage('Thank you for your vote!');
      } else {
        throw new Error('Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again later.');
    }
  };

  return (
    <div>
      <h1>User Page</h1>
      {!votingStarted && (
        <p>Voting hasn't started yet. Please wait for admin to start voting.</p>
      )}
      {votingStarted && (
        <>
          <ContestantList
            contestantNames={contestants.map(contestant => contestant.name)}
            onSelectContestant={handleContestantChange}
            votingStarted={votingStarted}
          />
          <VoteButton vote={vote} disabled={!selectedContestant} />
        </>
      )}
      <Message message={message} />
    </div>
  );
};

export default UserPage;