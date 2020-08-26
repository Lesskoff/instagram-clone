import React, { useState } from "react";
import { db } from "./firebase";
import firebase from "firebase";
import { Button, TextField } from "@material-ui/core";
import "./AddComment.css";

function AddComment({ user, postId }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment) {
      db.collection("posts").doc(postId).collection("comments").add({
        username: user.displayName,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setComment("");
  };

  return (
    <div className="addComment">
      <form className="addComment__form">
        <TextField
          type="text"
          label="Add comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <Button type="submit" onClick={handleSubmit} disabled={!comment}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddComment;
