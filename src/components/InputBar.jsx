import React from 'react';

const InputBar = ({ onSend, onInputChange, inputValue }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    onSend(trimmed);
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        autoComplete="off"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <button type="submit" disabled={!inputValue.trim()}>
        Send
      </button>
    </form>
  );
};

export default InputBar;
