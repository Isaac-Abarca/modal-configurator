/* eslint-disable no-undef */
// public/modal.js
(function() {
  function initializeModal(modalId) {
    const firebaseConfig = {
      apiKey: 'AIzaSyCiJVM0jxgYgpQ020z-8OT4tvA5qEJNP8M',
      authDomain: 'modalconfigiration.firebaseapp.com',
      projectId: 'modalconfigiration',
      storageBucket: 'modalconfigiration.appspot.com',
      messagingSenderId: '946668471994',
      appId: '1:946668471994:web:16bf767d273c92f97ee483',
      measurementId: 'G-5HX8WN2XDL'
    };
    
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    db.collection('modals').doc(modalId).get().then(doc => {
      if (doc.exists) {
        const modalData = doc.data();
        const modalStyles = modalData.styles ? JSON.parse(modalData.styles) : {};
        renderModal(modalData, modalStyles);
      } else {
        console.error('No such document!');
      }
    }).catch(error => {
      console.error('Error getting document:', error);
    });
  }

  function renderModal(modalData, modalStyles) {
    const modalOverlay = document.createElement('div');
    Object.assign(modalOverlay.style, modalStyles.modalOverlay);
    modalOverlay.addEventListener('click', closeModal);

    const modal = document.createElement('div');
    Object.assign(modal.style, modalStyles.modal);

    const modalHeader = document.createElement('div');
    Object.assign(modalHeader.style, modalStyles.modalHeader);
    const modalTitle = document.createElement('h2');
    Object.assign(modalTitle.style, modalStyles["modalHeader h2"]);
    modalTitle.innerText = modalData.title;
    modalHeader.appendChild(modalTitle);

    const modalBody = document.createElement('div');
    Object.assign(modalBody.style, modalStyles.modalBody);
    modalBody.innerText = modalData.description;

    const modalFooter = document.createElement('div');
    Object.assign(modalFooter.style, modalStyles.modalFooter);
    const closeButton = document.createElement('button');
    Object.assign(closeButton.style, modalStyles["modalFooter button secondary"]);
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', closeModal);
    modalFooter.appendChild(closeButton);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);

    document.body.appendChild(modalOverlay);
    document.body.appendChild(modal);

    function closeModal() {
      document.body.removeChild(modal);
      document.body.removeChild(modalOverlay);
    }
  }

  window.initializeModal = initializeModal;
})();

  