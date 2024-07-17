// src/components/VoteButton.js

import React from 'react';

const VoteButton = ({ vote, disabled }) => (
  <div id="voteSection">
    <button onClick={vote} className="vote-btn" disabled={disabled}>
      Vote
    </button>
  </div>
);

export default VoteButton;
