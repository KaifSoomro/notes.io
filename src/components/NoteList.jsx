import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete} 
          onEdit={onEdit}    
        />
      ))}
    </>
  );
};

export default NoteList;