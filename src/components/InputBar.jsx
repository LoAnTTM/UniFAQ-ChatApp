import React, { useState } from 'react';

const InputBar = ({ onSend }) => {
  const [draft, setDraft] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setDraft('');
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        autoComplete="off"
        placeholder="Type your message..."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button type="submit" disabled={!draft.trim()}>
        Send
      </button>
    </form>
  );
};

export default InputBar;
