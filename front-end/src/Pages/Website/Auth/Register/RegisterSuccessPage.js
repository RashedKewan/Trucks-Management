import { Container, Row, Col, Alert, Button, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../Lib/axios";

import { useTranslation } from "react-i18next";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  ROUTE_PATHS,
  TIME_TO_DIPLAY_MESSAGE,
  TIME_TO_RESEND_EMAIL_AGAIN,
} from "../../../../utils/Consts";
import Loading from "../../../../Components/Loading";
import AlertComponent from "../../../../Components/AlertComponent";

const RegisterSuccessPage = () => {
  /**************************** CONSTS *******************************/
  const navigateTo = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [showResendButton, setShowResendButton] = useState(false);
  const [counter, setCounter] = useState(TIME_TO_RESEND_EMAIL_AGAIN/1000);
  const [isAccessible, setIsAccessible] = useState(
    location.state && location.state.accessible
  );
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  if (isAccessible === null) {
    navigateTo(ROUTE_PATHS.RegisterPage);
  }
  const email = location.state && location.state.email;

  /**************************** FUNCTIONS *******************************/
  /**
   * Initial timer for the re-send eamil button
   * @return: Cleanup the timeout to avoid memory leaks
   */
  useEffect(() => {
    // setCounter(TIME_TO_RESEND_EMAIL_AGAIN/1000);
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
    setCounter(TIME_TO_RESEND_EMAIL_AGAIN/1000);
    const timeoutId = setTimeout(() => {
      setShowResendButton(true);
    }, TIME_TO_RESEND_EMAIL_AGAIN);
    return () => clearTimeout(timeoutId);
  }
  

  async function displaySuccessMessage() {
    const timeoutId = setTimeout(() => {
      setSuccessMsg("");
    }, TIME_TO_DIPLAY_MESSAGE);
    return () => clearTimeout(timeoutId);
  }

  async function displayErrMessage() {
    const timeoutId = setTimeout(() => {
      setErrMsg("");
    }, TIME_TO_DIPLAY_MESSAGE);
    return () => clearTimeout(timeoutId);
  }

  /**
   * @resendEmail function executes after clicking on  resendEmail button
   * 1- Disable re-sending email button
   * 2- Start the timer for 'TIME_TO_RESEND_EMAIL_AGAIN'
   * 3- Take the 'email' passed from 'register' page using location.state.email
   * 4- Call RESEND_EMAIL api at the endpoint and wait until response get back
   *
   * @error_handle
   *  - If there is response from server
   *  - If email failed to send
   */
  const resendEmail = async () => {
    try {
      setSuccessMsg("");
      setErrMsg("");

      setShowResendButton(false);
      timer();

      let res = await axios.post(API_ENDPOINTS.RESEND_EMAIL, { email });
      console.log(res.data);
      if (res.data === true) {
        setSuccessMsg(t("Email_Sent_Successfully"));
        displaySuccessMessage();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg(t("No_Server_Response"));
        displayErrMessage();
      } else if (err.response?.data === ERROR_CODES.EMAIL_FAILED_TO_SEND) {
        setErrMsg(t("EMAIL_FAILED_TO_SEND"));
        displayErrMessage();
      }
    }
  };

  /**************************** RETURN *******************************/
  return (
    <>
      <section>
        {/* <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <p
          className={successMsg ? "successmsg" : "offscreen"}
          aria-live="assertive"
        >
          {successMsg}
        </p> */}
        {successMsg && (
          <AlertComponent
            severity="success"
            message={t("Email_Sent_Successfully")}
            applyStatus={setSuccessMsg}
          ></AlertComponent>
        )}
        {errMsg && (
          <AlertComponent
            severity="error"
            message={t("EMAIL_FAILED_TO_SEND")}
            applyStatus={setErrMsg}
          ></AlertComponent>
        )}

        {isAccessible !== null ? (
          <Container className="mt-5">
            <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                <Alert variant="success">
                  <div className="mb-4"></div>
                  <div className="text-center m-2">
                    <Alert.Heading>
                      {t("Account_Created_Successfully")}
                    </Alert.Heading>
                    <Image
                      src="/Assets/Images/send-data.png"
                      alt="send-data"
                      fluid
                    />
                    <p className="mt-2">
                      {t(
                        "An_Email_Has_Been_Sent_To_Your_Email_Address_Please_Check_It_Out_To_Verify_Your_Account"
                      )}
                    </p>
                  </div>
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
      </section>
    </>
  );
};
export default RegisterSuccessPage;
