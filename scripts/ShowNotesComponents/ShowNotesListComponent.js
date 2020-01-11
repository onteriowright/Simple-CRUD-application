import { ShowNoteComponent } from "./ShowNotesComponent.js";
import {
  getNotes,
  UseNotes,
  deleteNotes
} from "../SavedNotesComponents/SavedNotesDataProvider.js";

export const ShowNotesListComponent = () => {
  const eventHub = document.querySelector("#container");
  const targetElement = document.querySelector("#show-display");

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("edit--")) {
      const [prefix, editedNoteId] = clickEvent.target.id.split("--");
      const editCustomEvent = new CustomEvent("edit-btn-clicked", {
        detail: {
          editedNoteId: editedNoteId
        }
      });
      eventHub.dispatchEvent(editCustomEvent);
    }
  });

  eventHub.addEventListener("note-has-been-edited", clickEvent => {
    const notesUpdated = UseNotes();
    renderData(notesUpdated);
  });

  eventHub.addEventListener("show-note-clicked", clickEvent => {
    if (targetElement.textContent === "") {
      reRenderData();
    } else {
      targetElement.textContent = "";
    }
  });

  eventHub.addEventListener("note-was-saved", clickEvent => {
    const upDateNotes = UseNotes();
    renderData(upDateNotes);
  });

  eventHub.addEventListener("delete-btn-was-clicked", clickEvent => {
    const selectedNoteId = clickEvent.detail.noteId;
    deleteNotes(selectedNoteId).then(reRenderData);
  });

  const reRenderData = () => {
    getNotes().then(() => {
      const upDateNotes = UseNotes();
      renderData(upDateNotes);
    });
  };

  const renderData = noteCollection => {
    targetElement.innerHTML = `
      ${noteCollection.map(note => ShowNoteComponent(note)).join("")}
    `;
  };
};
