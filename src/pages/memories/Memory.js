import React, { useEffect, useState } from "react";
import styles from "../../styles/Memory.module.css";
import Image from "react-bootstrap/Image";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import MemoryEditForm from "./MemoryEditForm";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const Memory = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    updated_at,
    content,
    image,
    id,
    setEvent,
    setMemories,
  } = props;

  const [memory, setMemory] = useState({ content: content, image: image });

  const [showEditForm, setShowEditForm] = useState(false);
  const [defaultImg, setDefaultImg] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleShow = () => {
    setShow(true);
    setMessage(`Are you sure you want to delete your memory "${content}"?`);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (
      image ==
      "https://res.cloudinary.com/djlm3llv5/image/upload/v1/media/../sd2as2klixs1ijw9022d"
    ) {
      setDefaultImg(true);
    }
  }, []);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/memories/${id}/`);
      setEvent((prevEvent) => ({
        results: [
          {
            ...prevEvent.results[0],
            memories_count: prevEvent.results[0].memories_count - 1,
          },
        ],
      }));
      setMemories((prevMemories) => ({
        ...prevMemories,
        results: prevMemories.results.filter((memory) => memory.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className={`align-self-center ml-2 `}>
          <div className={`d-flex flex-row justify-content-between`}>
            <span className={styles.Owner}>{owner}</span>
            {updated_at != created_at ? (
              <span className={styles.Date}>updated:{updated_at}</span>
            ) : (
              <></>
            )}
            <span className={styles.Date}>posted: {created_at}</span>
          </div>
          {showEditForm ? (
            <MemoryEditForm
              id={id}
              profile_id={profile_id}
              memory={memory}
              setMemory={setMemory}
              profileImage={profile_image}
              setMemories={setMemories}
              setShowEditForm={setShowEditForm}
              setDefaultImg={setDefaultImg}
              defaultImg={defaultImg}
            />
          ) : (
            <div>
              <>
                <p>{memory.content}</p>
              </>
              {defaultImg ? <></> : <Image src={image} />}
            </div>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleShow={handleShow}
          />
        )}
      </Media>
      <DeleteConfirmModal
        showModal={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
        message={message}
      />
    </>
  );
};

export default Memory;
