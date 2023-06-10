import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Upload from "../../assets/upload.png";
import styles from "../../styles/MemoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Alert, Image } from "react-bootstrap";

function MemoryCreateForm(props) {
  const { event, setEvent, setMemories, profileImage, profile_id, past } =
    props;
  const [memory, setMemory] = useState({
    content: "",
    image: "",
  });
  const { content, image } = memory;
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState();

  const [placeholder, setPlaceholder] = useState(
    "This event is upcoming... add plans here!"
  );

  useEffect(() => {
    if (past) {
      setPlaceholder("This event has passed... add a memory here!");
    }
  }, [past]);

  const handleChange = (event) => {
    setMemory({ ...memory, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setMemory({ ...memory, image: objectUrl });

    // free memory when the component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleChangeImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("event", event);
    formData.append("content", content);
    if (image) {
      formData.append("image", selectedFile);
    }

    try {
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
      setMemory({
        content: "",
        image: "",
      });
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
            placeholder={placeholder}
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
          </Form.Label>
        )}
        <Form.File
          id="image-upload"
          accept="image/*"
          required={false}
          onChange={handleChangeImage}
        />
        Upload an image (optional)
      </Form.Group>
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <button
        className={`${styles.Button} btn d-block ml-auto`}
        // disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default MemoryCreateForm;
