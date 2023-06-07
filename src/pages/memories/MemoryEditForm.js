import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/MemoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import { Image } from "react-bootstrap";

function MemoryEditForm(props) {
  const { id, event, content, image, setShowEditForm, setMemories } = props;

  const [memoryContent, setMemoryContent] = useState(content);
  const [memoryImage, setMemoryImage] = useState(image);

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setMemoryContent(event.target.value);
    console.log(memoryContent);
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setMemoryImage(URL.createObjectURL(event.target.files[0]));
      console.log(memoryImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("content", memoryContent);
    if (imageInput.current.files.length) {
      formData.append("image", imageInput.current?.files[0]);
    }

    try {
      await axiosRes.put(`/memories/${id}/`, formData);
      setMemories((prevMemories) => ({
        ...prevMemories,
        results: prevMemories.results.map((memory) => {
          return memory.id === id
            ? {
                ...memory,
                content: memoryContent.trim(),
                image: memoryImage,
                updated_at: "now",
              }
            : memory;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          name="content"
          value={memoryContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <Form.Group className="text-center">
        {image ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={image} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                htmlFor="image-upload"
              >
                Add an image
              </Form.Label>
              <Form.File
                id="image-upload"
                accept="image/*"
                required={false}
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex justify-content-center"
            htmlFor="image-upload"
          >
            <img
              src={Upload}
              alt="Click or tap to upload an image"
              className={styles.AssetImgMini}
            />
            {/* <Asset src={Upload} message="Click or tap to upload an image" /> */}
          </Form.Label>
        )}
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default MemoryEditForm;
