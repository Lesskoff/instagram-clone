import React, { useState } from "react";
import Header from "./Header";
import Posts from "./Posts";
import ImageUpload from "./ImageUpload";
import "./App.css";
import "./elements.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      <Posts user={user} />
      {user && user?.displayName && (
        <ImageUpload username={user?.displayName} />
      )}
    </div>
  );
}

export default App;
