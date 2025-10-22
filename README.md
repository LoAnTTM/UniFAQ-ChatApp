# UniFAQ React Chat

## How to Run the App

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   Vite prints the local address (defaults to `http://localhost:5173`). Open it in your browser to see the app.

3. Build for production (optional):

   ```bash
   npm run build
   ```

   After building, you can preview the production output with:

   ```bash
   npm run preview
   ```

## Key Directory Structure

```
src/
  App.jsx          # Main App component that manages the message state
  App.css          # Global styles for the app
  main.jsx         # Entry point, renders App
  components/
    ChatHeader.jsx # Chat header
    MessageList.jsx# Message list
    InputBar.jsx   # Input field and send button
```

## App Flow

1. `App.jsx` stores the `messages` state.
2. `InputBar` receives the `onSend` callback and calls it when the user submits.
3. `App` updates the state and passes the new array down to `MessageList`.
4. `MessageList` renders each message; if none exist it prompts the user to send one.
