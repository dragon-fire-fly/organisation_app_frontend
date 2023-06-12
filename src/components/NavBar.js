import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { expanded, setExpanded, ref } = useClickOutside();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const addPostIcon = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className="far fa-plus-square"></i> Post
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/events/create"
      >
        <i className="fa-regular fa-calendar-plus"></i>Event
      </NavLink>
    </>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/calendar"
      >
        <i className="fa-solid fa-calendar-days"></i>Calendar
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  const loggedInDropdownIcons = (
    <>
      <div className={styles.NavDropdown}>
        <NavDropdown.Item
          className={styles.NavLink}
          as={Link}
          to={`/profiles/${currentUser?.profile_id}`}
        >
          <i className="fas fa-user-alt"></i> My Profile
        </NavDropdown.Item>
        <NavDropdown.Item
          className={styles.NavLink}
          as={Link}
          to={"/events/watched/"}
        >
          <i className="fa-solid fa-eye"></i> My Watched Events
        </NavDropdown.Item>
        <NavDropdown.Item className={styles.NavLink} as={Link} to={"/liked"}>
          <i className="fa-solid fa-thumbs-up"></i> My Liked Posts
        </NavDropdown.Item>
        <Dropdown.Divider />
        <NavDropdown.Item className={styles.NavLink} as={Link} to={"/friends"}>
          <i className="fa-solid fa-user-group"></i> My Friends
        </NavDropdown.Item>
        <NavDropdown.Item className={styles.NavLink} as={Link} to={"/feed"}>
          <i className="fa-solid fa-message"></i> My Friend&#39;s Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          className={styles.NavLink}
          as={Link}
          to={"/events/friends"}
        >
          <i className="fa-solid fa-calendar-days"></i> My Friend&#39;s Events
        </NavDropdown.Item>
        <Dropdown.Divider />
        <NavDropdown.Item
          className={styles.NavLink}
          to="/"
          onClick={handleSignOut}
        >
          <i className="fas fa-sign-out-alt"></i>Sign out
        </NavDropdown.Item>
      </div>
    </>
  );

  const loggedOutDropdownIcons = <></>;

  return (
    <Navbar
      variant="dark"
      expanded={expanded}
      className={styles.NavBar}
      expand="lg"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          className={styles.Toggler}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-envelope-open-text"></i>Feed
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/events"
            >
              <i className="fa-solid fa-calendar-xmark"></i>Events
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}

            {currentUser && windowWidth > 780 ? (
              <NavDropdown
                className={styles.NavDropdownContainer}
                drop="left"
                title={
                  <span>
                    <Avatar src={currentUser?.profile_image} height={40} />
                  </span>
                }
                id="basic-nav-dropdown"
              >
                {currentUser ? loggedInDropdownIcons : loggedOutDropdownIcons}
              </NavDropdown>
            ) : (
              <>
                <Dropdown.Divider />
                {currentUser ? loggedInDropdownIcons : loggedOutDropdownIcons}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
