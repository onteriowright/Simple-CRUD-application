import { SaveNoteListComponent } from "./SavedNotesComponents/SaveNotesListComponent.js";
import { ShowNotesListComponent } from "./ShowNotesComponents/ShowNotesListComponent.js";
import { getNotes } from "./SavedNotesComponents/SavedNotesDataProvider.js";
import { DialogComponent } from "./DialogComponents/DialogComponent.js";

SaveNoteListComponent();
getNotes()
  .then(ShowNotesListComponent)
  .then(DialogComponent);
