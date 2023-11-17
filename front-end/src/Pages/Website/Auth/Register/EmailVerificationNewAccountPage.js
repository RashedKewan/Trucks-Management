import React from 'react';
import VerifyingPage from '../../../../Components/VerifyingPage';
import { ROUTE_PATHS } from '../../../../utils/Consts';

const EmailVerificationNewAccountPage = () => {
    return (
        <div>
            <VerifyingPage navigateToPage={ROUTE_PATHS.EmailVerificationSuccessPage} requestTo={"NEW_ACOUNT"} />
        </div>
    );
};

export default EmailVerificationNewAccountPage;