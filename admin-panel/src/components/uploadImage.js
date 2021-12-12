import React, { useState } from "react";
import { storage } from "../firebase";
import { Form, Button } from "react-bootstrap";
import { ref, uploadBytes } from "firebase/storage";
export default function UploadImage() {
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  function handleUpload(e) {
    e.preventDefault();
    const imageRef = ref(storage, `/images/${file.name}`);
    const metadata = {
        name: "metadataname"
    }
    const uploadTask = uploadBytes(imageRef, file, metadata);
  }

  return (
    <div>
      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Resim Yükle</Form.Label>
          <Form.Control type="file" onChange={handleChange} />
        </Form.Group>
        <Button disabled={!file} type="submit">
          Submit
        </Button>
      </Form>
      <img src={url} alt="" />
    </div>
  );
}
