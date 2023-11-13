import { useState } from "react";
import InputField from "../../../../Components/InputField";
import { useTranslation } from "react-i18next";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  REGEX,
  ROUTE_PATHS,
} from "../../../../utils/Consts";
import useFormInput from "../../../../Hooks/useFormInput";
import axios from "../../../../Lib/axios";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordResetRequestPage = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const email = useFormInput("", REGEX.EMAIL);

  const instructionMessages = {
    email: t("instructionMessages.email"),
  };

  /**************************** FUNCTIONS *******************************/

  async function submitEmail(e) {
    try {
      setErrMsg("");
      e.preventDefault();
      if (!email.valid) {
        setErrMsg("Invalid Entry");
        return;
      }

      let res = await axios.post(API_ENDPOINTS.RESET_PASSWORD_REQUEST, {
        email: email.value,
      });
      console.log(res.data);
      if (res.data === true) {
        navigateTo(ROUTE_PATHS.RESET_PASSWORD_REQUEST_SUCCESS, {state:{email:email.value, accessible: true}});
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg(t("No_Server_Response"));
      } else if (err.response?.data === ERROR_CODES.EMAIL_FAILED_TO_SEND) {
        setErrMsg(t("EMAIL_FAILED_TO_SEND"));
      }
    }
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
              <div className="text-center m-2">
                <h2 style={{ color: "#4285f4" }}>{t("Reset_Password")}</h2>
              </div>

              <div className="text-center m-2">
                <Image src="send-data.png" alt="send-data" fluid />
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
                disabled={!email.valid ? true : false}
              >
                {t("Send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordResetRequestPage;
