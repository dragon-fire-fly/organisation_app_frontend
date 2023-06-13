import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Asset from "../components/Asset";
import styles from "../styles/NotFound.module.css";
import NotFoundImg from "../assets/not-found.png";
import Button from "react-bootstrap/Button";

const NotFound = () => {
  return (
    <>
      <div className={styles.NotFound}>
        <div className={styles.Error404}>404!</div>
        <div className={styles.NotFoundText}>
          Sorry, that page couldn&#39;t be found!
        </div>
        <div>
          <Asset alt="page not found" src={NotFoundImg} />
        </div>
        <div className={`text-center`}>
          <Button className={styles.Button}>
            <Link className={styles.Link} to={"/"}>
              Click here to return to the Homepage
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
