

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (users.length === 0) return <p>No users found</p>;

  return (
    <div className="mt-5">
      <h2 className="text-center mb-3">Registered Users</h2>
      <div className="row">
        {users.map(user => (
          <div className="col-md-4 mb-3" key={user._id}>
            <div className="card p-3 h-100 shadow">
              <h5>{user.name}</h5>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Skills:</strong></p>
              <ul>
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, i) => <li key={i}>{skill}</li>)
                ) : (
                  <li>No skills listed</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
