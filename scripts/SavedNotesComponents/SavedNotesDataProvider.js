let notesCollection = [];

export const UseNotes = () => notesCollection.slice();

export const saveNotes = noteObject => {
  return fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(noteObject)
  }).then(getNotes);
};

export const getNotes = () => {
  return fetch("http://localhost:3000/notes")
    .then(res => res.json())
    .then(parsedNotes => (notesCollection = parsedNotes.slice()));
};

export const editNotes = noteObject => {
  return fetch(`http://localhost:3000/notes/${noteObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(noteObject)
  }).then(getNotes);
};

export const deleteNotes = noteObjectId => {
  return fetch(`http://localhost:3000/notes/${noteObjectId}`, {
    method: "DELETE"
  }).then(getNotes);
};
