import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Alert, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useRedirect } from "../../hooks/useRedirect";

function EventCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    eventType: "",
    location: "",
    startAt: "",
    endAt: "",
    allDay: "No",
    privacy: 0,
  });
  const {
    title,
    content,
    image,
    eventType,
    location,
    startAt,
    endAt,
    allDay,
    privacy,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("event_type", eventType);
    formData.append("location", location);
    formData.append("start", startAt);
    formData.append("end", endAt);
    // formData.append("allDay", allDay);
    formData.append("privacy", privacy);
    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Event Type</Form.Label>
        <Form.Control
          as="select"
          name="eventType"
          value={eventType}
          onChange={handleChange}
        >
          <option value="Educational">Educational</option>
          <option value="Cultural">Cultural</option>
          <option value="Recreational">Recreational</option>
          <option value="Fundraiser">Fundraiser</option>
          <option value="Private">Private</option>
          <option value="Work">Work</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Festival">Festival</option>
          <option value="Concert">Concert</option>
          <option value="Cinema">Cinema</option>
          <option value="Party">Party</option>
          <option value="Seminar">Seminar</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.eventType?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Start at</Form.Label>
        <Form.Control
          type="datetime-local"
          name="startAt"
          value={startAt}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.startAt?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>End at</Form.Label>
        <Form.Control
          type="datetime-local"
          name="endAt"
          value={endAt}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.endAt?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* <Form.Group>
        <Form.Label>All day</Form.Label>
        <Form.Control
          as="select"
          name="allDay"
          value={allDay}
          onChange={handleChange}
        >
          <option value="False">No</option>
          <option value="True">Yes</option>
        </Form.Control>
      </Form.Group>
      {errors?.allDay?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))} */}
      <Form.Group>
        <Form.Label>Privacy</Form.Label>
        <Form.Control
          as="select"
          name="privacy"
          value={privacy}
          onChange={handleChange}
        >
          <option value="0">Public</option>
          <option value="1">Followers only</option>
          <option value="2">Private</option>
        </Form.Control>
      </Form.Group>
      {errors?.privacy?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        type="submit"
      >
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center">
        <Col md={8} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
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
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={10} lg={10} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
