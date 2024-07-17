// src/components/AdminPage.js

import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = ({ onStartVoting }) => {
  const [newContestant, setNewContestant] = useState('');
  const [contestants, setContestants] = useState([]);
  const [votingBegin, setVotingBegin] = useState(false);

  const handleAddContestant = async () => {
    if (newContestant.trim() !== '') {
      if (!contestants.includes(newContestant)) { 
        try {
          const response = await fetch('http://localhost:5000/add-contestant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newContestant }),
          });

          if (response.ok) {
            setContestants((prevContestants) => [...prevContestants, newContestant]);
            setNewContestant('');
          } else {
            console.error('Failed to add contestant');
          }
        } catch (error) {
          console.error('Error adding contestant:', error);
        }
      } else {
        alert('Contestant already exists!');
        setNewContestant('');
      }
    }
  };

  const handleStartVoting = async () => {
    try {
      const res = await fetch('http://localhost:5000/start-voting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        setVotingBegin(true);
        console.log("Voting has started!");
      } else {
        console.error("Failed to start voting");
      }
    } catch (err) {
      console.error("Something has gone wrong:", err);
      alert("Something has gone wrong!");
    }
  };
  

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      <div className="admin-actions">
        <div>
          <input
            type="text"
            placeholder="Enter contestant name"
            value={newContestant}
            onChange={(e) => setNewContestant(e.target.value)}
          />
          <button onClick={handleAddContestant} className="add-btn" disabled={votingBegin}>
            Add Contestant
          </button>
        </div>
        <button 
          onClick={handleStartVoting} 
          className="start-btn" 
          disabled={votingBegin} 
          style={{ backgroundColor: votingBegin ? 'red' : '' }}
        >
          {votingBegin ? "Voting Started" : "Start Voting"}
        </button>
        <div>
          <h4>Contestants names</h4>
          <ul>
            {contestants.map((contestant, index) => (
              <li key={index}>{contestant}</li>
            ))}
          </ul>
          {votingBegin && <h4 style={{ color: 'red' }}>Voting started successfully!</h4>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;