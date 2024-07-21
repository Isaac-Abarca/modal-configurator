import { useState } from 'react'
import ModalConfigurator from './components/ModalConfigurator';
import ModalDisplay from './components/ModalDisplay';
import GenerateModalScript from './components/GenerateModalScript';
import './App.css'

function App() {
  const [modalId, setModalId] = useState(null);

  return (
    <div>
      <ModalConfigurator modalId={modalId} setModalId={setModalId} />
      {modalId && (
        <>
          <ModalDisplay modalId={modalId} />
          <GenerateModalScript modalId={modalId} />
        </>
      )}
    </div>
  );
}

export default App
