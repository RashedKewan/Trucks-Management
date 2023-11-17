// EmailPage.js

import { useEffect, useState } from "react";
import InputField from "../../../../Components/InputField";
import { useTranslation } from "react-i18next";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  REGEX,
  TIME_TO_RESEND_EMAIL_AGAIN,
} from "../../../../utils/Consts";
import useFormInput from "../../../../Hooks/useFormInput";
import { useLocation } from "react-router-dom";
import axios from "../../../../Lib/axios";
import { Image } from "react-bootstrap";

function EmailVerificationNewAccountResendEmailPage() {
  const { t } = useTranslation();

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const email = useFormInput("", REGEX.EMAIL);

  const instructionMessages = {
    email: t("instructionMessages.email"),
  };
  /**************************** CONSTS *******************************/
  const [showResendButton, setShowResendButton] = useState(true);
  const location = useLocation();
  /**************************** FUNCTIONS *******************************/
  /**
   * Initial timer for the re-send eamil button
   * @return: Cleanup the timeout to avoid memory leaks
   */
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setShowResendButton(true);
  //   }, TIME_TO_RESEND_EMAIL_AGAIN);
  //   return () => clearTimeout(timeoutId);
  // }, []);

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

  async function submitEmail(e) {
    try {
      setErrMsg("");
      setSuccessMsg("");
      e.preventDefault();
      if (!email.valid) {
        setErrMsg("Invalid Entry");
        return;
      }
      try {
        setShowResendButton(false);
        timer();

        let res = await axios.post(API_ENDPOINTS.RESEND_EMAIL, { email:email.value });
        console.log(res.data);
        if (res.data === true) {
          setSuccessMsg("Email resent successfully!");
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg(t("No_Server_Response"));
        } else if (err.response?.data === ERROR_CODES.EMAIL_FAILED_TO_SEND) {
          setErrMsg("Email Failed to send!");
        }
      }
    } catch (err) {}
  }
  return (
    <>
      <div className="parent">
        <div className="register">
          <form onSubmit={submitEmail}>
            <section>
              <p
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <p
                className={successMsg ? "successmsg" : "offscreen"}
                aria-live="assertive"
              >
                {successMsg}
              </p>
              <div className="text-center m-2">
                <h2 style={{ color: "#4285f4" }}>{t("Resend_your_mail")}</h2>
              </div>

              <div className="text-center m-2">
                <Image src="/Assets/Images/send-data.png" alt="send-data" fluid />
              </div>
              <div className="m-2" style={{ fontSize: "1rem" }}>
                {t("Insert_your_mail")}
              </div>

              <InputField
                type="email"
                label={t("Email")}
                value={email.value}
                onChange={email.handleChange}
                valid={email.valid}
                focus={email.handleFocus}
                blur={email.handleBlur}
                placeholder="yourname@example.com"
                instruction={instructionMessages.email}
              />
            </section>

            <div className="text-center">
              <button
                className="mt-4"
                style={{ width: "100%" }}
                disabled={
                  showResendButton === false || !email.valid ? true : false
                }
              >
                {t("Send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmailVerificationNewAccountResendEmailPage;
