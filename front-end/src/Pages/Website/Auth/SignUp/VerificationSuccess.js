import React from "react";
import { Container, Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../utils/Consts";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect to the specified URL when the button is clicked
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          
          <Card.Title as="h2" style={{ color: "#4285f4" }}>
            אמות המשתמש
          </Card.Title>
          <div className="text-center m-2">
            <Image src="authentication.png" alt="send-data" fluid />
          </div>
          <Card.Text>
            תודה שבחרת <b>בחברה</b>.
          </Card.Text>
          <Card.Text>
            החשבון שלך <b style={{ color: "#4caf50" }}>אומת בהצלחה</b>
          </Card.Text>
          <Card.Text>אתה כעת מוכן ליהנות מכל היתרונות של שירותינו.</Card.Text>
          <Card.Text>
            אל תהסס לחקור את האתר ולפנות אלינו אם יש לך שאלות.
          </Card.Text>
          <Button variant="success" onClick={handleRedirect} className="mt-3">
            בחזרה לדף הבית
          </Button>
          <Card.Text className="mt-3">
            בברכה,
            <br />
            צוות הבחברה
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerificationSuccess;
