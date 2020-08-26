import React from "react";
import "./Comments.css";

function Comments({ comments }) {
  if (!comments) return null;

  return (
    <div className="comments">
      {comments.map(({ id, data }) => (
        <h4 key={id} className="comments__text">
          <strong>{data.username}</strong>
          {data.text}
        </h4>
      ))}
    </div>
  );
}

export default Comments;
