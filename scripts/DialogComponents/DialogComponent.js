export const DialogComponent = () => {
  const eventHub = document.querySelector("#container");

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("openDialogBtn--")) {
      const dialogElement = document.querySelector(
        `#${clickEvent.target.id} + dialog`
      );
      dialogElement.showModal();
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("closeDialogBtn--")) {
      const dialogElement = clickEvent.target.parentNode;
      dialogElement.close();
    }
  });
};
