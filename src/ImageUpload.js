import React, { useState } from "react";
import firebase from "firebase";
import { db, storage } from "./firebase";
import { Modal, Button, TextField, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    if (e.target?.files[0]) setImage(e.target.files[0]);
  };
  const handleFileUpload = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    setProgress(0);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageURL: url,
              userName: username,
            });

            setImage(null);
            setProgress(true);
            setCaption("");
          });
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    setProgress(null);
  };

  return (
    <div className="imageUpload">
      <Button
        className="imageUpload__modalButton"
        variant="contained"
        color="primary"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Upload Photo
      </Button>
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
        <form
          className="modal__body imageUpload__form"
          onSubmit={handleFileUpload}
        >
          <TextField
            className="imageUpload__input"
            required
            type="text"
            id="capiton"
            label="Enter the caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button component="label">
            Choose File *
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
          {image ? (
            <span className="imageUpload__text">
              Choosen File - <b>{image?.name}</b>
            </span>
          ) : null}
          <Button type="submit">Upload File</Button>
          {progress !== true && progress !== null && progress >= 0 ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              className="imageUpload__progress"
              max="100"
            />
          ) : (
            progress !== null &&
            progress && <Alert severity="success">Upload completed!</Alert>
          )}
        </form>
        {/* </Fade> */}
      </Modal>
    </div>
  );
}

export default ImageUpload;
