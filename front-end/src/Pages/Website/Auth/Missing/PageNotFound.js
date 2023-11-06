import React from "react";
import svg from "../../../../Assets/404.svg";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const PageNotFound = () => {
  return (
    <article>
      <div className="d-flex justify-content-center">
        <img src={svg} alt="svg" height="500" />
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn">
          <Button variant="outline-secondary">Back to Home</Button>
        </Link>
      </div>
    </article>
  );
};

export default PageNotFound;
