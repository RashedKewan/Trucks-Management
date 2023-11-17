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

import { useTranslation } from "react-i18next";
const ResetPasswordSendRequestSuccessPage = () => {
  /**************************** CONSTS *******************************/
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const location = useLocation();

  const [counter, setCounter] = useState(TIME_TO_RESEND_EMAIL_AGAIN / 1000);
  const [showResendButton, setShowResendButton] = useState(false);
  const [isAccessible, setIsAccessible] = useState(
    location.state && location.state.accessible
  );

  /**************************** FUNCTIONS *******************************/

  if (isAccessible === null) {
    navigateTo(ROUTE_PATHS.ResetPasswordRequestPage);
  }

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

  useEffect(() => {
    if (counter > 0) {
      // Update the screen each time the counter changes
      const timerId = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      // Clear the timeout when the component unmounts or when counter reaches 0
      return () => clearTimeout(timerId);
    }
  }, [counter]); // Dependency on counter ensures this effect runs when counter changes

  /**
   * Disabling re-send eamil button for 'TIME_TO_RESEND_EMAIL_AGAIN'
   * @return: Cleanup the timeout to avoid memory leaks
   */
  async function timer() {
    setCounter(TIME_TO_RESEND_EMAIL_AGAIN / 1000);
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
                  <Alert.Heading>
                    {t("Password_reset_request_successfully_received")}
                  </Alert.Heading>
                  <Image
                    src="/Assets/Images/send-data.png"
                    alt="reset-password"
                    fluid
                  />
                </div>
                <p>
                  {t(
                    "A_password_reset_email_has_been_sent_to_your_email_address_Please_check_your_email_to_proceed_with_the_password_reset"
                  )}
                </p>
              </Alert>
              {
                <div className="text-center">
                  <Button
                    disabled={showResendButton === true ? false : true}
                    variant="primary"
                    onClick={resendEmail}
                  >
                    {t("Resend_Email")}
                  </Button>
                  {showResendButton === false && <div>{counter}</div>}
                </div>
              }
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ResetPasswordSendRequestSuccessPage;
