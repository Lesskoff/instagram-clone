import React from "react";
import "./Comments.css";

function Comments({ comments }) {
  if (!comments) return null;

  return (
    <div className="comments">
      {comments.map(({ username, text }) => (
        <h4 className="comments__text">
          <strong>{username}</strong>
          {text}
        </h4>
      ))}
    </div>
  );
}

export default Comments;
