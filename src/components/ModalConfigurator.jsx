/* eslint-disable react/prop-types */
// src/components/ModalConfigurator.jsx
import  { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const ModalConfigurator = ({ modalId, setModalId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [styles, setStyles] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchModal = async () => {
      if (modalId) {
        const modalDoc = await getDoc(doc(db, 'modals', modalId));
        if (modalDoc.exists()) {
          const data = modalDoc.data();
          setTitle(data.title);
          setDescription(data.description);
          setStyles(data.styles);
          setIsEditing(true);
        }
      }
    };
    fetchModal();
  }, [modalId]);

  const handleSave = async () => {
    if (isEditing) {
      await updateDoc(doc(db, 'modals', modalId), {
        title,
        description,
        styles,
      });
    } else {
      const docRef = await addDoc(collection(db, 'modals'), {
        title,
        description,
        styles,
      });
      setModalId(docRef.id);
    }
    alert('Modal saved successfully!');
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Your Modal' : 'Configure Your Modal'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Styles (JSON)"
        value={styles}
        onChange={(e) => setStyles(e.target.value)}
      />
      <button onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</button>
    </div>
  );
};

export default ModalConfigurator;

