import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    event,
    postPage,
    setPosts,
  } = props;
  const currentUser = useCurrentUser();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleShow = () => {
    setShow(true);
    setMessage(`Are you sure you want to delete your post "${title}"?`);
  };

  const handleClose = () => setShow(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/edit/`);
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <>
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar alt="Avatar" src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleShow={handleShow}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Text>{content}</Card.Text>}
          {event && (
            <Card.Text>
              Event: <Link to={`/events/${event.id}`}>{event.title}</Link>
            </Card.Text>
          )}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&#39;t like your own post!</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fa-solid fa-thumbs-up ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i
                  className={`fa-regular fa-thumbs-up ${styles.HeartOutline}`}
                />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up" />
              </OverlayTrigger>
            )}
            {likes_count}
            <Link aria-label={`post ${id}`} to={`/posts/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {comments_count}
          </div>
        </Card.Body>
      </Card>
      <DeleteConfirmModal
        showModal={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
        message={message}
      />
    </>
  );
};
export default Post;
