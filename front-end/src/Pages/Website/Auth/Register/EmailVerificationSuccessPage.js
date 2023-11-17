import React from "react";
import { Container, Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../utils/Consts";
import { useTranslation } from "react-i18next";

const EmailVerificationSuccessPage = () => {
  const {t} = useTranslation();
  const navigateTo = useNavigate();

  const handleRedirect = () => {
    // Redirect to the specified URL when the button is clicked
    navigateTo(ROUTE_PATHS.LoginPage);
  };

  return (
    
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          
          <Card.Title as="h2" style={{ color: "#4285f4" }}>
            {t("User_Verification")}
          </Card.Title>
          <div className="text-center m-2">
            <Image src="/Assets/Images/authentication.png" alt="send-data" fluid />
          </div>
          <Card.Text>
          {t("Thank_You_For_Choosing")}<b>{t("Our_Company")}</b>.
          </Card.Text>
          <Card.Text>
            {t("Your_Account")} <b style={{ color: "#4caf50" }}>{t("Successfully_verified")}</b>
          </Card.Text>
          <Card.Text>{t("You_are_now_ready_to_enjoy_all_the_benefits_of_our_services")}</Card.Text>
          <Card.Text>
            {t("Feel_free_to_explore_the_site_and_contact_us_if_you_have_any_questions")}
          </Card.Text>
          <Button variant="success" onClick={handleRedirect} className="mt-3">
          {t("Back_to_Home")}
          </Button>
          <Card.Text className="mt-3">
          {t("Best_Regards")},<br />
          {t("Company_Staff")}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailVerificationSuccessPage;
