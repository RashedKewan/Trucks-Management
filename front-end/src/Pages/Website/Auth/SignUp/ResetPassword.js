// ForgotPasswordPage.js
import useFormInput from "../../../../Hooks/useFormInput";
import InputField from "../../../../Components/InputField";
import useInput from "../../../../Hooks/useFormInput";
import { useTranslation } from "react-i18next";
import axios from "../../../../Lib/axios";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { API_ENDPOINTS, ERROR_CODES, REGEX } from "../../../../utils/Consts";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  /**************************** CONSTS *******************************/
  const username = useInput("", REGEX.USERNAME);
  const password = useInput("", REGEX.PASSWORD);
  const confirmPassword = useInput("", REGEX.PASSWORD);
  const { t } = useTranslation();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const instructionMessages = {
    username: t("instructionMessages.username"),
    password: t("instructionMessages.password"),
    confirmPassword: t("instructionMessages.confirmPassword"),
  };

  /**************************** FUNCTIONS *******************************/
  async function submitEmail(e) {
    try {
      setErrMsg("");
      setSuccessMsg("");
      e.preventDefault();
      if (!username.valid || !password.valid || !confirmPassword.valid) {
        setErrMsg("Invalid Entry");
        return;
      }
      try {
        let email = location.state && location.state.email;
        let res = await axios.patch(API_ENDPOINTS.RESET_PASSWORD, {
          username: username.value,
          email: email,
          password: password.value,
        });
        console.log(res.data);
        if (res.data === true) {
          setSuccessMsg("Password reset email sent successfully!");
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg(t("No_Server_Response"));
        } else if (err.response?.data === ERROR_CODES.PASSWORD_RESET_FAILED) {
          setErrMsg("Password reset failed!");
        }
      }
    } catch (err) {}
  }

  /**************************** RETURN *******************************/
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
                <h2 style={{ color: "#4285f4" }}>{t("Reset_Password")}</h2>
              </div>

              <div className="text-center m-4 ">
                <Image src="reset-password.png" alt="reset-password" fluid />
              </div>

              <InputField
                type="text"
                label={t("Username")}
                value={username.value}
                onChange={username.handleChange}
                valid={username.valid}
                focus={username.handleFocus}
                blur={username.handleBlur}
                placeholder="Choose a unique username"
                instruction={instructionMessages.username}
              />
              <InputField
                type="password"
                label={t("Password")}
                value={password.value}
                onChange={password.handleChange}
                valid={password.valid}
                focus={password.handleFocus}
                blur={password.handleBlur}
                placeholder="Create a strong password"
                instruction={instructionMessages.password}
              />
              <InputField
                type="password"
                label={t("Confirm_Password")}
                value={confirmPassword.value}
                onChange={confirmPassword.handleChange}
                valid={confirmPassword.valid}
                focus={confirmPassword.handleFocus}
                blur={confirmPassword.handleBlur}
                placeholder="Re-enter your password"
                instruction={instructionMessages.confirmPassword}
              />
            </section>

            <div className="text-center">
              <button
                className="mt-4"
                style={{ width: "100%" }}
                disabled={
                  !username.valid || !password.valid || !confirmPassword.valid
                    ? true
                    : false
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

export default ResetPassword;
