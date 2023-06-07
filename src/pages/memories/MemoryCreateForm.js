import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Upload from "../../assets/upload.png";

import styles from "../../styles/MemoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";

function MemoryCreateForm(props) {
  const { event, setEvent, setMemories, profileImage, profile_id } = props;
  const [memory, setMemory] = useState({
    content: "",
    image: "",
    event: event,
  });
  const { content, image } = memory;
  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setMemory({ ...memory, [event.target.name]: event.target.value });
    console.log(memory);
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setMemory({
        ...memory,
        image: URL.createObjectURL(event.target.files[0]),
      });
      console.log(memory);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("event", event);
    formData.append("content", content);
    if (imageInput.current.files.length) {
      formData.append("image", imageInput.current?.files[0]);
    }

    try {
      console.log(event);
      const { data } = await axiosRes.post("/memories/", formData);
      setMemories((prevMemories) => ({
        ...prevMemories,
        results: [data, ...prevMemories.results],
      }));
      setEvent((prevEvent) => ({
        results: [
          {
            ...prevEvent.results[0],
            memories_count: prevEvent.results[0].memories_count + 1,
          },
        ],
      }));
      setMemory("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            name="content"
            placeholder="my memory..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
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

        <Form.File
          id="image-upload"
          accept="image/*"
          required={false}
          onChange={handleChangeImage}
          ref={imageInput}
        />
      </Form.Group>
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <button
        className={`${styles.Button} btn d-block ml-auto`}
        // disabled={!memory.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default MemoryCreateForm;
