import React from "react";
import { Alert, Container } from "react-bootstrap";

const AlertMsg = (props) => {
  const { showAlert, setShowAlert, variant, alertMsg } = props;

  return (
    showAlert && (
      <Container className="my-3">
        <Alert
          variant={variant}
          onClose={() => setShowAlert(false)}
          className="fade"
          dismissible
        >
          <p> {alertMsg} </p>
        </Alert>
      </Container>
    )
  );
};

export default AlertMsg;
