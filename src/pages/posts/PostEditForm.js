import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import AlertMsg from "../../components/AlertMsg";

function PostEditForm() {
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    event: "",
  });
  const { title, content, image, event } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  // variables for showing alerts on form submission
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleAlert = () => {
    setShowAlert(true);
    setVariant("success");
    setAlertMsg("Your post was edited successfully!");
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, event, is_owner } = data;

        is_owner
          ? setPostData({ title, content, image, event })
          : history.push("/");
      } catch (err) {
        // console.log(err);
        if (err.response?.status === 404 || err.response?.status === 400) {
          history.push("/notfound");
        }
      }
    };
    handleMount();
  }, [history, id]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Fetch data
        const { data } = await axiosReq.get(
          `/events/calendars/${currentUser.pk}/`
        );
        const results = [];
        // Store results in the results array
        data.results.forEach((value) => {
          results.push({
            key: value.title,
            value: value.id,
          });
        });
        // Update the events state
        setEvents([{ key: "Select an event", value: "" }, ...results]);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    }

    // Trigger the fetch
    fetchEvents();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    if (event) {
      if (event.id) {
        formData.append("event", event.id);
      } else {
        formData.append("event", event);
      }
    }

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.patch(`/posts/${id}/edit/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      // console.log(err);
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

      {hasLoaded ? (
        <>
          <Form.Group>
            <Form.Label>Event (optional)</Form.Label>
            <Form.Control
              as="select"
              name="event"
              value={event}
              onChange={handleChange}
            >
              {events.map((event) => {
                return (
                  <option
                    key={Number(event.value)}
                    value={Number(event.value)}
                  >
                    {event.key}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        type="submit"
        onClick={handleAlert}
      >
        save
      </Button>
    </div>
  );

  return (
    <>
      <AlertMsg
        showAlert={showAlert}
        setShowAlert
        variant={variant}
        alertMsg={alertMsg}
      />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
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
          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PostEditForm;
