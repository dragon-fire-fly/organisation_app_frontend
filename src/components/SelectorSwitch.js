import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import btnStyles from "../styles/Button.module.css";

const SelectorSwitch = ({ left, right, linkLeft, linkto }) => {
  console.log(left);

  return (
    <>
      <hr />
      <div className="text-center">
        <Button className={btnStyles.SelectorBtn}>
          {linkLeft ? <Link to={linkto}>{left}</Link> : left}
        </Button>
        <Button className={btnStyles.SelectorBtn}>
          {linkLeft ? right : <Link to={linkto}>{right}</Link>}
        </Button>
      </div>
    </>
  );
};

export default SelectorSwitch;
