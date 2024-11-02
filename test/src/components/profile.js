// frontend/src/components/Profile.js
import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    hometown: '',
    interests: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user', profile);
      localStorage.setItem('user_id', response.data.user_id);
      // Redirect to chat
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({...profile, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Hometown"
          value={profile.hometown}
          onChange={(e) => setProfile({...profile, hometown: e.target.value})}
        />
        <input
          type="text"
          placeholder="Interests (comma-separated)"
          onChange={(e) => setProfile({
            ...profile,
            interests: e.target.value.split(',').map(i => i.trim())
          })}
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default Profile;
