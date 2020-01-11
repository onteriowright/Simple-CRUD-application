export const ShowNoteComponent = note => {
  return `
    <div>Name: ${note.firstName}</div>
    <input id="openDialogBtn--${note.id}" type="button" value="View More Info">
    <dialog>
      <div>Last Name: ${note.lastName}</div>
      <div>Age: ${note.age}</div>
      <input id="closeDialogBtn--${note.id}" type="button" value="Close">
    </dialog>
    <input id="delete--${note.id}" type="button" value="Delete Note">
    <input id="edit--${note.id}" type="button" value="Edit Note">
  `;
};
