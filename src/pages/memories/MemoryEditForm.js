import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/MemoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";
import { Image } from "react-bootstrap";

function MemoryEditForm(props) {
  const { id, memory, setMemory, setShowEditForm, setMemories, defaultImg } =
    props;

  const [memoryContent, setMemoryContent] = useState(memory.content);
  const [memoryImage, setMemoryImage] = useState(memory.image);

  const imageInput = useRef(memory.image);

  const handleChange = (event) => {
    setMemoryContent(event.target.value);
  };

  const handleEditImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(memory.image);

      setMemoryImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("content", memoryContent);
    if (imageInput.current?.files?.length) {
      formData.append("image", imageInput.current?.files[0]);
    }

    try {
      await axiosRes.put(`/memories/${id}/`, formData);
      setMemory({ content: memoryContent, image: memoryImage });
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
        {defaultImg ? (
          <Form.Label
            // className="d-flex justify-content-center"
            htmlFor="image-edit"
          >
            <img
              src={Upload}
              alt="Click or tap to upload an image"
              className={styles.AssetImgMini}
            />
            {/* <Asset src={Upload} message="Click or tap to upload an image" /> */}
          </Form.Label>
        ) : (
          <>
            <figure>
              <Image className={appStyles.Image} src={memoryImage} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                htmlFor="image-edit"
              >
                Change image
              </Form.Label>
              <Form.File
                id="image-edit"
                accept="image/*"
                required={false}
                onChange={handleEditImage}
                ref={imageInput}
              />
            </div>
          </>
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
          disabled={!memory.content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default MemoryEditForm;
