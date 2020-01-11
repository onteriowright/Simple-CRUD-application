import { SavedNotesComponent } from "./SavedNotesComponent.js";
import { saveNotes, UseNotes, editNotes } from "./SavedNotesDataProvider.js";
import { UseAge } from "../AgeComponents/AgeDataProviderComponent.js";

export const SaveNoteListComponent = () => {
  const eventHub = document.querySelector("#container");
  const targetElement = document.querySelector("#input-display");

  eventHub.addEventListener("edit-btn-clicked", clickEvent => {
    const editNoteId = clickEvent.detail.editedNoteId;

    const useNotes = UseNotes();
    const foundNote = useNotes.find(notes => notes.id === parseInt(editNoteId));

    document.querySelector("#hidden-value").value = foundNote.id;
    document.querySelector("#text-firstInput").value = foundNote.firstName;
    document.querySelector("#text-lastInput").value = foundNote.lastName;
    document.querySelector("#select-age").value = foundNote.age;
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save-note") {
      if (
        document.querySelector("#text-firstInput").value === "" ||
        document.querySelector("#text-lastInput").value === "" ||
        document.querySelector("#select-age").value === "0"
      ) {
        alert("Please Complete All Fields.....");
        return;
      }

      const hiddenValue = document.querySelector("#hidden-value").value;
      if (hiddenValue !== "") {
        const editedNote = {
          id: document.querySelector("#hidden-value").value,
          firstName: document.querySelector("#text-firstInput").value,
          lastName: document.querySelector("#text-lastInput").value,
          age: document.querySelector("#select-age").value
        };
        editNotes(editedNote).then(() => {
          const editNoteCustomEvent = new CustomEvent("note-has-been-edited");
          eventHub.dispatchEvent(editNoteCustomEvent);
          document.querySelector("#hidden-value").value = "";
          document.querySelector("#text-firstInput").value = "";
          document.querySelector("#text-lastInput").value = "";
          document.querySelector("#select-age").value = "";
        });
      } else {
        const newNote = {
          firstName: document.querySelector("#text-firstInput").value,
          lastName: document.querySelector("#text-lastInput").value,
          age: document.querySelector("#select-age").value
        };
        saveNotes(newNote).then(() => {
          const updateMessageCustomEvent = new CustomEvent("note-was-saved");
          eventHub.dispatchEvent(updateMessageCustomEvent);
          document.querySelector("#text-firstInput").value = "";
          document.querySelector("#text-lastInput").value = "";
          document.querySelector("#select-age").value = "";
        });
      }
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "show-note") {
      const showNoteCustomEvent = new CustomEvent("show-note-clicked");
      eventHub.dispatchEvent(showNoteCustomEvent);
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("delete--")) {
      const [prefix, noteId] = clickEvent.target.id.split("--");
      const deleteNoteCustomEvent = new CustomEvent("delete-btn-was-clicked", {
        detail: {
          noteId: noteId
        }
      });
      eventHub.dispatchEvent(deleteNoteCustomEvent);
    }
  });

  const renderData = age => {
    targetElement.innerHTML = `${SavedNotesComponent(age)}`;
  };

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "show-note") {
      let btn = document.querySelector("#show-note");
      if (btn.value === "Show Notes") {
        btn.value = "Hide Notes";
      } else {
        btn.value = "Show Notes";
      }
    }
  });
  const useAge = UseAge();
  renderData(useAge);
};
