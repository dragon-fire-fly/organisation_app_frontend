import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SelectorSwitch = ({ left, right, linkLeft, linkto }) => {
  console.log(left);

  return (
    <>
      <hr />
      <div className="text-center">
        <span>{linkLeft ? <Link to={linkto}>{left}</Link> : left}</span>
        <span> | </span>
        <span>{linkLeft ? right : <Link to={linkto}>{right}</Link>}</span>
      </div>
    </>
  );
};

export default SelectorSwitch;
