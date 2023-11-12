import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../../utils/Consts';

const AlreadyVerified = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    // Redirect to the home page when the button is clicked
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Title as="h2" style={{ color: '#4285f4' }}>חשבון מאומת כבר</Card.Title>
          <Card.Text>
            תודה על שבחרת <b>בחברה</b>.
          </Card.Text>
          <Card.Text>
            החשבון שלך כבר אומת ומוכן לשימוש.
          </Card.Text>
          <Card.Text>
            נשמח לעזור אם יש לך שאלות או בקשות נוספות.
          </Card.Text>
          <Button variant="info" onClick={handleReturnHome} className="mt-3">
            חזור לדף הבית
          </Button>
          <Card.Text className="mt-3">
            בברכה,<br />
            צוות החברה
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AlreadyVerified;
