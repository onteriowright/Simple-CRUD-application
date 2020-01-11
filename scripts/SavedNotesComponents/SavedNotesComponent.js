export const SavedNotesComponent = age => {
  return `
    <section>
      <input id="hidden-value" type="hidden">
      <input id="text-firstInput" type="input" placeholder="Please Enter First Name.....">
      <input id="text-lastInput" type="input" placeholder="Please Enter Last Name.....">
      <select id="select-age">
        <option value="0">Please Choose Age.....</option>
        ${age
          .map(
            singleAge => `<option value="${singleAge}">${singleAge}</option>`
          )
          .join("")}
      </select>
      <input id="save-note" type="button" value="Save Note">
      <input id="show-note" type="button" value="Show Notes">
    </section>
  `;
};
