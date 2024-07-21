/* eslint-disable react/prop-types */
// src/components/GenerateModalScript.jsx

const GenerateModalScript = ({ modalId }) => {
  const scriptContent = `
    (function() {
      const modalId = '${modalId}';
      const script = document.createElement('script');
      script.src = 'https://your-public-url/modal.js';
      script.onload = function() {
        window.initializeModal(modalId);
      };
      document.body.appendChild(script);
    })();
  `;

  return (
    <div>
      <h2>Copy this script to integrate the modal into your web page:</h2>
      <textarea readOnly value={scriptContent} rows="10" cols="50" />
    </div>
  );
};

export default GenerateModalScript;
