import React, { useState, useContext } from 'react';
import logo from './logo.svg';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from "./themeContext";
import './App.css';


export const StickyNotes = () => 
{
    type FaveState = {
  [key: number]: boolean; 
}; 

  const theme = useContext(ThemeContext);
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

   const deleteNoteHandler= (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNoteHandler = (note: Note) => {
    setSelectedNote(note);
  };

  const[faveNotes, setFave] = useState<FaveState>({});

  const toggleFavorite = (id: number) => {
    setFave((oldFaves) => ({
      ...oldFaves,
      [id]: !oldFaves[id] // Toggle the favorite status for the specific note ID
    }));
  };

  const faveList = notes.filter(note => faveNotes[note.id]);


return (
   <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>

    <div id="sideBar">
  <form className="note-form" onSubmit={createNoteHandler}>
    	<div contentEditable="true">
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div id="contentSpace">
      	<textarea
          placeholder="Note Content"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div id="selectBox" contentEditable="true">
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label:event.target.value as Label})}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>

    </div>

  	<div className="notes-grid" >
    	{ notes.length === 0 ? (
          <div style={{ display: 'flex', marginLeft: '425px', marginTop: 'auto',  alignItems: 'center', height: '100%', opacity: 0.7 }}>
          <p style={{ fontSize: '24px', textAlign: 'center' }}>No Notes</p> 
          </div>
        ) : (
          notes.map((note) => (
      	<div
        	key={note.id}
        	className={`note-item ${theme === themes.light ? 'light' : 'dark'}`}>
        	<div className="notes-header">
            <button
             onClick={() => toggleFavorite(note.id)}
             className = "fave-button"
             >
              {faveNotes[note.id] ? '❤️' : '♡' }
              </button>
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
        	</div>
                <h2 contentEditable="true" data-testid={`note-title-${note.id}`}>{note.title}</h2>
                <p contentEditable="true" data-testid={`note-title-${note.id}`}>{note.content}</p>
                <div contentEditable="true">
                <p>{note.label}</p>
                </div>
          </div>
          ))
          )}
  	</div>


    <div className="favorite-section">
        <h3>List of Favorites</h3>
        <ul>
          {faveList.map((note) => (
            <li key={note.id}>
              <p>{note.title}</p>
            </li>
          ))}
        </ul>
      </div>
	</div> 
  );

}

export default StickyNotes; 