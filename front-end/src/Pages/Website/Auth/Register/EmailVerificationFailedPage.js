import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const EmailVerificationFailedPage = () => {
  const {t} = useTranslation();
  return (
    <Container className="mt-5">
      <Card
        className="text-center"
        style={{
          border: "2px solid red",
          boxShadow: "0 0 10px rgba(255, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title as="h2" style={{ color: "red" }}>
            {t("Authentication_failed")}
          </Card.Title>
          <Card.Text>
            {t("Account_Cannot_Be_Verified")}<strong>{t("link_Is_Not_Available")}</strong>.
          </Card.Text>
          <Card.Text>{t("Please_Resend_The_Email_To_Complete_The_Verification")}</Card.Text>
          <Card.Text className="mt-3" style={{ color: "red" }}>
          {t("If_You_Have_Questions_Or_Cant_Find_The_Email_Well_Be_Happy_To_Help")}
          </Card.Text>

          <Button  href="/resend-email" className="m-3 ">{t("Resend_your_mail")}</Button>
          <Button  href="/" className="m-3">
            {t("Back_to_Home")}
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailVerificationFailedPage;
