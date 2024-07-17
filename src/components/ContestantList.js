// src/components/ContestantList.js

import React from 'react';

const ContestantList = ({ contestantNames, votingStarted, onSelectContestant }) => {
  return (
    <div className="contestants-list">
      <h2>Contestants List</h2>
      <ul>
        {contestantNames.map((contestant, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="contestant"
                value={contestant}
                onChange={onSelectContestant}
                disabled={!votingStarted}
              />
              {contestant}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestantList;
