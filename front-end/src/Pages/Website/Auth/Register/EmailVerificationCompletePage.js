import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../../utils/Consts';
import { useTranslation } from "react-i18next";


const EmailVerificationCompletePage = () => {
  const navigateTo = useNavigate();
  const {t} = useTranslation();
  const handleReturnHome = () => {
    // Redirect to the home page when the button is clicked
    navigateTo(ROUTE_PATHS.LoginPage);
  };

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Title as="h2" style={{ color: '#4285f4' }}>{t("Account_Already_Verified")}</Card.Title>
          <Card.Text>
            {t("Thank_You_For_Choosing")}<b>{t("Our_Company")}</b>.
          </Card.Text>
          <Card.Text>
          {t("Account_Is_Already_Verified")}
          </Card.Text>
          <Card.Text>
          {t("We_Will_Be_Happy_To_Help")}
          </Card.Text>
          <Button variant="info" onClick={handleReturnHome} className="mt-3">
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

export default EmailVerificationCompletePage;
