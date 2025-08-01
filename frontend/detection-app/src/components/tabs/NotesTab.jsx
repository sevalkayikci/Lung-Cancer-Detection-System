import React, { useEffect, useState } from 'react';
import './NotesTab.css';
import { Pencil, Trash2, Save, X } from 'lucide-react';

const NotesTab = ({ patientId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (patientId) fetchNotes();
  }, [patientId]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/notes/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setNotes(data);
    } catch (err) {
      console.error('Failed to load notes');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ patient_id: patientId, content: newNote }),
      });

      if (res.ok) {
        setNewNote('');
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to add note');
    }
  };

  const handleEdit = (index, content) => {
    setEditIndex(index);
    setEditContent(content);
  };

  const handleUpdate = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setEditIndex(null);
        setEditContent('');
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to update note');
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchNotes();
    } catch (err) {
      console.error('Failed to delete note');
    }
  };

  return (
    <div className="notes-tab">
      <div className="note-form">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className="note-list">
        {notes.length === 0 ? (
          <p className="no-note">No notes available.</p>
        ) : (
          notes.map((note, i) => (
            <div className="note-item" key={note.note_id}>
              <div className="note-actions">
                {editIndex === i ? (
                  <>
                    <button onClick={() => handleUpdate(note.note_id)}><Save size={16} /></button>
                    <button onClick={() => setEditIndex(null)}><X size={16} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(i, note.content)}><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(note.note_id)}><Trash2 size={16} /></button>
                  </>
                )}
              </div>
              <span className="note-date">{note.created_at?.slice(0, 10)}</span>
              {editIndex === i ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-textarea"
                />
              ) : (
                <p>{note.content}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesTab;
