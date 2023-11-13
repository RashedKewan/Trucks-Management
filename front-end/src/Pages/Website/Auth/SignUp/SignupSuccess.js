import { Container, Row, Col, Alert, Button, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../../Lib/axios";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  TIME_TO_RESEND_EMAIL_AGAIN,
} from "../../../../utils/Consts";

const SignupSuccess = () => {
  
  /**************************** CONSTS *******************************/
  const [showResendButton, setShowResendButton] = useState(false);
  const location = useLocation();

  /**************************** FUNCTIONS *******************************/
  /**
   * Initial timer for the re-send eamil button
   * @return: Cleanup the timeout to avoid memory leaks
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowResendButton(true);
    }, TIME_TO_RESEND_EMAIL_AGAIN);
    return () => clearTimeout(timeoutId);
  }, []);

/**
 * Disabling re-send eamil button for 'TIME_TO_RESEND_EMAIL_AGAIN'
 * @return: Cleanup the timeout to avoid memory leaks 
 */
  async function timer() {
    const timeoutId = setTimeout(() => {
      setShowResendButton(true);
    }, TIME_TO_RESEND_EMAIL_AGAIN);
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
      setShowResendButton(false);
      timer();
      const email = location.state && location.state.email;

      let res = await axios.post(API_ENDPOINTS.RESEND_EMAIL, { email });
      console.log(res.data);
      if (res.data === true) {
        alert("Email resent successfully!");
      }
    } catch (err) {
      if (!err?.response) {
      } else if (err.response?.data === ERROR_CODES.EMAIL_FAILED_TO_SEND) {
        alert("Email Failed to send!");
      }
    }
  };

  /**************************** RETURN *******************************/
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Alert variant="success">
            <div className="text-center m-2">
            <Alert.Heading>Account Created Successfully!</Alert.Heading>
                <Image src="send-data.png" alt="send-data" fluid />
              </div>
            <p>
              An email has been sent to your email address. Please check it out
              to verify your account.
            </p>
            
          </Alert>
          {
            <div className="text-center">
              <Button
                disabled={showResendButton === true ? false : true}
                variant="primary"
                onClick={resendEmail}
              >
                Resend Email
              </Button>
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default SignupSuccess;
