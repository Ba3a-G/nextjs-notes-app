'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export default function NotesPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });

      if (response.ok) {
        const note = await response.json();
        setNotes([note, ...notes]);
        setNewNote('');
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
                New Note
              </label>
              <textarea
                id="note"
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Note'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {isFetching ? (
            <div className="text-center text-gray-400 py-8">Loading notes...</div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="bg-gray-900 shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-400 flex justify-between">
                  <span>By {note.author}</span>
                  <span>{new Date(note.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No notes yet. Create your first note above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 