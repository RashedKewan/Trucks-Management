import React from 'react';
import VerifyingPage from '../../../../Components/VerifyingPage';
import { ROUTE_PATHS } from '../../../../utils/Consts';

const NewAccountEmailVerifyingPage = () => {
    return (
        <div>
            <VerifyingPage navigateToPage={ROUTE_PATHS.VERIFICATION_SUCCESS} requestTo={"NEW_ACOUNT"} />
        </div>
    );
};

export default NewAccountEmailVerifyingPage;