import React, { useState, useEffect } from "react";
import LoginBody from "./LoginBody";
import { auth } from "./firebase";
import { Modal, Button, Backdrop, Fade } from "@material-ui/core";

export default function Login({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsibscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);

        if (authUser.displayName) {
          // don't update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(false);
      }
    });

    return () => {
      unsibscribe();
    };
  }, [setUser, username]);

  const handleClose = () => {
    setOpen(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {user ? (
        <Button type="button" onClick={() => auth.signOut()}>
          Logout
        </Button>
      ) : user === false ? (
        <>
          <Button
            type="button"
            onClick={() => {
              setOpen(true);
              setOpenSignIn(false);
            }}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            onClick={() => {
              setOpen(true);
              setOpenSignIn(true);
            }}
          >
            Sign In
          </Button>
        </>
      ) : null}

      <Modal
        className="modal"
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
        open={open}
        onClose={handleClose}
      >
        {/* <Fade in={open}> */}
        <LoginBody
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          openSignIn={openSignIn}
          setOpen={setOpen}
        />
        {/* </Fade> */}
      </Modal>
    </div>
  );
}
