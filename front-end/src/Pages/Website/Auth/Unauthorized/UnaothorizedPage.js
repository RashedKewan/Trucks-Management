import React from 'react';
import { useNavigate } from "react-router-dom";
// import UnauthorizedSVG from './Unauthorized.svg';
import "./UnauthorizedStyle.css";
const UnaothorizedPage = () => {
    const navigateTo = useNavigate();
    const prevPage = -1;
    const goBack = () => navigateTo(prevPage);

    return (
        <section>
            {/* <UnauthorizedSVG /> */}
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
};

export default UnaothorizedPage;