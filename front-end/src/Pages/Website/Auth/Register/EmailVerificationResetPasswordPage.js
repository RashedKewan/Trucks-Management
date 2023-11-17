import React from 'react';
import VerifyingPage from '../../../../Components/VerifyingPage';
import { ROUTE_PATHS } from '../../../../utils/Consts';

const EmailVerificationResetPasswordPage = () => {
    return (
        <div>
            <VerifyingPage navigateToPage={ROUTE_PATHS.ResetPasswordPage} requestTo={"RESET_PASSWORD"}/>
        </div>
    );
};

export default EmailVerificationResetPasswordPage;