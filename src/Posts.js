import React, { useState, useEffect } from "react";
import "./Posts.css";
import Post from "./Post";
import { db } from "./firebase";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      );
  }, [posts]);

  return (
    <div className="posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          user={user}
          postId={id}
          userName={post.userName}
          caption={post.caption}
          avatarURL={post.avatarURL}
          imageURL={post.imageURL}
        />
      ))}
    </div>
  );
}

export default Posts;
