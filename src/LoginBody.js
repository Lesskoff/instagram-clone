import React from "react";
import Logo from "./Logo";
import { auth } from "./firebase";
import { TextField, Button } from "@material-ui/core";

function LoginBody({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  openSignIn,
  setOpen,
}) {
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        setOpen(false);
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpen(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="modal__body">
      <Logo />
      {!openSignIn ? (
        <TextField
          type="text"
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      ) : null}
      <TextField
        type="text"
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {openSignIn ? (
        <Button onClick={signIn} color="primary">
          Sign In
        </Button>
      ) : (
        <Button onClick={signUp} color="primary">
          Sign Up
        </Button>
      )}
    </div>
  );
}

export default LoginBody;
