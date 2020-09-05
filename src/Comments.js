import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Comments.css";

function Comments({ postId }) {
  const [comments, setComments] = useState();

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="comments">
      {comments &&
        comments.map(({ id, data }) => (
          <h4 key={id} className="comments__text">
            <strong>{data.username}</strong>
            {data.text}
          </h4>
        ))}
    </div>
  );
}

export default Comments;
