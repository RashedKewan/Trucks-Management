// PasswordResetRequestSuccess.js
import { Container, Row, Col, Alert, Button, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../Lib/axios";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  ROUTE_PATHS,
  TIME_TO_RESEND_EMAIL_AGAIN,
} from "../../../../utils/Consts";
import Loading from "../../../../Components/Loading";

const PasswordResetRequestSuccessPage = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [isAccessible, setIsAccessible] = useState(
    location.state && location.state.accessible
  );
  if (isAccessible === null) {
    navigateTo(ROUTE_PATHS.RESET_PASSWORD_REQUEST);
  }
  /**************************** CONSTS *******************************/
  const [showResendButton, setShowResendButton] = useState(false);

  /**************************** FUNCTIONS *******************************/
  /**
   * Initial timer for the re-send email button
   * @return: Cleanup the timeout to avoid memory leaks
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowResendButton(true);
    }, TIME_TO_RESEND_EMAIL_AGAIN);
    return () => clearTimeout(timeoutId);
  }, []);

  /**
   * Disabling re-send email button for 'TIME_TO_RESEND_EMAIL_AGAIN'
   * @return: Cleanup the timeout to avoid memory leaks
   */
  async function timer() {
    const timeoutId = setTimeout(() => {
      setShowResendButton(true);
    }, TIME_TO_RESEND_EMAIL_AGAIN);
    return () => clearTimeout(timeoutId);
  }

  /**
   * @resendEmail function executes after clicking on resendEmail button
   * 1- Disable re-sending email button
   * 2- Start the timer for 'TIME_TO_RESEND_EMAIL_AGAIN'
   * 3- Take the 'email' passed from the 'forgot password' page using location.state.email
   * 4- Call RESEND_EMAIL api at the endpoint and wait until the response is received
   *
   * @error_handle
   *  - If there is no response from the server
   *  - If the email failed to send
   */
  const resendEmail = async () => {
    try {
      setShowResendButton(false);
      timer();
      const email = location.state && location.state.email;

      let res = await axios.post(API_ENDPOINTS.RESEND_EMAIL, { email });
      console.log(res.data);
      if (res.data === true) {
        alert("אימייל נשלח מחדש בהצלחה!");
      }
    } catch (err) {
      if (!err?.response) {
      } else if (err.response?.data === ERROR_CODES.EMAIL_FAILED_TO_SEND) {
        alert("שליחת האימייל נכשלה!");
      }
    }
  };

  /**************************** RETURN *******************************/
  return (
    <>
      {isAccessible !== null ? (
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Alert variant="success">
                <div className="text-center m-2">
                  <Alert.Heading>בקשת איפוס סיסמה התקבלה בהצלחה!</Alert.Heading>
                  <Image src="reset-password.png" alt="reset-password" fluid />
                </div>
                <p>
                  אימייל לאיפוס סיסמה נשלח לכתובת האימייל שלך. בבקשה לבדוק את
                  האימייל שלך כדי להמשיך עם איפוס הסיסמה.
                </p>
              </Alert>
              {showResendButton && (
                <div className="text-center">
                  <Button
                    disabled={showResendButton === true ? false : true}
                    variant="primary"
                    onClick={resendEmail}
                  >
                    שלח אימייל מחדש
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
  
};

export default PasswordResetRequestSuccessPage;
