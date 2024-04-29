import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './user/UserForm';
import NoteForm from './note/NoteForm';
import NoteList from './note/NoteList';
import LoginForm from './user/LoginForm';
import Cookies from 'js-cookie';

export const API_URL = "http://localhost:8000/api/";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL + 'notes');
        if (Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          console.error('Error: Notes data is not an array');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const addUser = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'create-user', userData);
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const addNote = async (noteData) => {
    try {
      const response = await axios.post(API_URL + 'create-note', noteData);
      console.log('Note added successfully:', response.data);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(API_URL + 'login-user', loginData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setLoggedInUser(response.data);
        Cookies.set('token', response.data.token);
      }
    } catch (error) {
      console.log('Error logging user: ', error);
    }
  }

  return (
    <div>
      {!isLoggedIn ? <LoginForm loginUser={loginUser} /> : <UserForm addUser={addUser} />}
      {isLoggedIn && (
        <div>
          <h1>Add Note</h1>
          <NoteForm addNote={addNote} apiUrl={API_URL} />
          <NoteList notes={notes} loggedInUser={loggedInUser} />
        </div>
      )}
    </div>
  );
}

export default App;
