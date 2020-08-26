import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Comments from "./Comments";
import AddComment from "./AddComment";
import { Avatar } from "@material-ui/core";
import "./Post.css";

function Post({ user, postId, userName, caption, avatarURL, imageURL }) {
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
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={userName} src={avatarURL}>
          {userName ? userName[0] : null}
        </Avatar>
        <h3>{userName}</h3>
      </div>

      {!imageURL ? (
        <div className="post__noImage">No image</div>
      ) : (
        <img className="post__image" src={imageURL} alt="post" />
      )}

      <h4 className="post__text">
        <strong>{userName}</strong>
        {caption}
      </h4>
      <Comments comments={comments} />
      {user && user?.displayName && <AddComment user={user} postId={postId} />}
    </div>
  );
}

export default Post;
