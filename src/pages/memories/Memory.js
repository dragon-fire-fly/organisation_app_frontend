import React, { useEffect, useState } from "react";
import styles from "../../styles/Memory.module.css";
import { Image, Media } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import MemoryEditForm from "./MemoryEditForm";

const Memory = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
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
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <MemoryEditForm
              id={id}
              profile_id={profile_id}
              memory={memory}
              setMemory={setMemory}
              profileImage={profile_image}
              setMemories={setMemories}
              setShowEditForm={setShowEditForm}
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
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Memory;
