import React, {useState} from 'react';

import { useDialog } from 'react-st-modal';

function CustomDialogContent() {
  const dialog = useDialog();

  const [value, setValue] = useState('');

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
      >
        Confirmar denúncia
      </button>
    </div>
  );
}

export default CustomDialogContent;
