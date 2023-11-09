import React from "react";
import svg from "../../../../Assets/404.svg";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <article>
      <div className="d-flex justify-content-center">
        <img src={svg} alt="svg" height="500" />
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/" >
          <Button variant="outline-secondary">{t("Back_to_Home")}</Button>
        </Link>
      </div>
    </article>
  );
};

export default PageNotFound;
