import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const VerificationFailed = () => {
  return (
    <Container className="mt-5">
      <Card className="text-center" style={{ border: '2px solid red', boxShadow: '0 0 10px rgba(255, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title as="h2" style={{ color: 'red' }}>אימות נכשל</Card.Title>
          <Card.Text>
            לא ניתן לאמת את החשבון כרגע. <strong>הקישור אינו זמין</strong>.
          </Card.Text>
          <Card.Text>
            אנא שלח/י שוב את האימייל לסיום האימות.
          </Card.Text>
          <Card.Text className="mt-3" style={{ color: 'red' }}>
            אם יש לך שאלות או אינך יכול/ה למצוא את האימייל, נשמח לעזור.
          </Card.Text>
          <Button variant="primary" href="/" className="mt-3">
            חזרה לדף הבית
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerificationFailed;
