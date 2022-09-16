import React, { useState } from 'react';
import { LoginModal } from '../SessionForms';

function LoginButton() {
  const [showModal, setShowModal] = useState(false);

return (
    <>
      <button onClick={() => setShowModal(true)} className="logoutButton">
        Log In
      </button>
      {showModal && <LoginModal onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default LoginButton;

