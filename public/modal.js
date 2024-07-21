/* eslint-disable no-unused-vars */
// public/modal.js
function initializeModal(modalId) {
  const container = document.createElement('div');
  container.id = 'modal-container';
  document.body.appendChild(container);

  fetch(`https://your-firebase-app.firebaseio.com/modals/${modalId}.json`)
    .then(response => response.json())
    .then(modal => {
      const modalElement = document.createElement('div');
      const modalStyles = modal.styles ? JSON.parse(modal.styles) : {};
      modalElement.style = modalStyles;
      modalElement.innerHTML = `
        <div>
          <h2>${modal.title}</h2>
          <p>${modal.description}</p>
        </div>
      `;
      container.appendChild(modalElement);
    });
}

  