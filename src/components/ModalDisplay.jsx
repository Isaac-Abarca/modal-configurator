/* eslint-disable react/prop-types */
// src/components/ModalDisplay.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ModalDisplay = ({ modalId }) => {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchModal = async () => {
      const modalDoc = await getDoc(doc(db, 'modals', modalId));
      if (modalDoc.exists()) {
        setModal(modalDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchModal();
  }, [modalId]);

  if (!modal) return null;

  const modalStyles = modal.styles ? JSON.parse(modal.styles) : {};

  return (
    <div style={modalStyles}>
      <h2>{modal.title}</h2>
      <p>{modal.description}</p>
    </div>
  );
};

export default ModalDisplay;

