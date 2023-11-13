import React from 'react';
import VerifyingPage from '../../../../Components/VerifyingPage';
import { ROUTE_PATHS } from '../../../../utils/Consts';

const ResetPasswordEmailVerifyingPage = () => {
    return (
        <div>
            <VerifyingPage navigateToPage={ROUTE_PATHS.RESET_PASSWORD} requestTo={"RESET_PASSWORD"}/>
        </div>
    );
};

export default ResetPasswordEmailVerifyingPage;