/* eslint-disable no-undef */
// public/modal.js
(function() {
  function loadFirebaseScripts(callback) {
    const appScript = document.createElement('script');
    appScript.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
    appScript.onload = function() {
      const firestoreScript = document.createElement('script');
      firestoreScript.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";
      firestoreScript.onload = callback;
      document.head.appendChild(firestoreScript);
    };
    document.head.appendChild(appScript);
  }

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
        renderChatbot(modalData, modalStyles);
      } else {
        console.error('No such document!');
      }
    }).catch(error => {
      console.error('Error getting document:', error);
    });
  }

  function renderChatbot(modalData) {
    const chatbotButton = document.createElement('div');
    chatbotButton.innerHTML = '<img src="https://via.placeholder.com/50" alt="Chatbot" style="border-radius: 50%;"/>';
    chatbotButton.style = "position: fixed; bottom: 20px; right: 20px; cursor: pointer;";
    chatbotButton.addEventListener('click', openModal);

    const modalOverlay = document.createElement('div');
    modalOverlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: none;";
    modalOverlay.addEventListener('click', closeModal);

    const modal = document.createElement('div');
    modal.style = "position: fixed; bottom: 80px; right: 20px; width: 300px; height: 400px; background: white; border-radius: 8px; display: none; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);";

    const modalHeader = document.createElement('div');
    modalHeader.style = "padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ddd; border-top-left-radius: 8px; border-top-right-radius: 8px;";
    modalHeader.innerHTML = `<h2 style="margin: 0;">${modalData.title}</h2>`;

    const modalBody = document.createElement('div');
    modalBody.style = "padding: 10px;";
    modalBody.innerText = modalData.description;

    const closeButton = document.createElement('button');
    closeButton.style = "position: absolute; top: 10px; right: 10px; cursor: pointer;";
    closeButton.innerText = '✖';
    closeButton.addEventListener('click', closeModal);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(closeButton);

    document.body.appendChild(chatbotButton);
    document.body.appendChild(modalOverlay);
    document.body.appendChild(modal);

    function openModal() {
      modalOverlay.style.display = 'block';
      modal.style.display = 'block';
    }

    function closeModal() {
      modalOverlay.style.display = 'none';
      modal.style.display = 'none';
    }
  }

  window.initializeModal = function(modalId) {
    loadFirebaseScripts(function() {
      initializeModal(modalId);
    });
  };
})();
