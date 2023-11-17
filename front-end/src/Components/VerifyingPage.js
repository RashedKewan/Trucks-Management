import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_ENDPOINTS,
  ERROR_CODES,
  ROUTE_PATHS,
  Verification_STATUS,
} from "../utils/Consts";
import axios from "../Lib/axios";
import Loading from "./Loading";
/**
 * @component VerifyingPage
 * @description
 * Displays a loading state while verifying the user's account based on the token provided in the URL.
 *
 * @state
 *  - {boolean} confirmRequest - Indicates whether the confirmation request has been made.
 *
 * @hooks
 *  - useNavigate: Used for programmatic navigation.
 *  - useEffect: Used for handling side effects during component lifecycle.
 *
 * @refs
 *  - {Object} tokenParamRef - Ref used to store the token from the URL.
 *
 * @dependencies
 *  - Axios: axios.post for making API requests.
 *  - Constants: API_ENDPOINTS for API endpoints, ROUTE_PATHS for route paths, ERROR_CODES for error codes.
 *  - Loading Component: Displayed while verifying the user's account.
 *
 * @throws {string} errMsg - Displays an error message if the verification process fails.
 *
 * @usage
 *  - Retrieves the token parameter from the URL.
 *  - Initiates a confirmation request to the server using the obtained token.
 *  - Navigates to the appropriate page based on the verification result (success, failure, or already verified).
 *  - Displays a loading state during the verification process.
 */
const VerifyingPage = ({navigateToPage, requestTo}) => {
  const [confirmRequest, setConfirmRequest] = useState(false);

  // Get Navigator
  const navigateTo = useNavigate();

  // Ref to store the token from the URL
  const tokenParamRef = useRef();

  // Token variable to store the token temporarily
  let token = null;

  // Effect to retrieve the token from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    token = queryParams.get("token");

    // Log token information for debugging
    console.log(token);
    console.log(tokenParamRef.current);

    // Store the token in the ref if not null
    if (token !== null) {
      tokenParamRef.current = token;
    }
  }, []);

  // Effect to make the confirmation request
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the token and ref are not null or undefined
        if (
          tokenParamRef.current !== undefined &&
          tokenParamRef.current !== null &&
          token !== null
        ) {
          setConfirmRequest(true);

          // Make the confirmation request to the server
          let res = await axios.post(API_ENDPOINTS.CONFIRMATION, {
            token: tokenParamRef.current,
            requestTo: requestTo,
          });

          // Log the response data for debugging
          console.log(res.data.status);

          // Navigate to the verification success page on successful verification
          if (res.data.status === Verification_STATUS.SUCCESS) {
            navigateTo(navigateToPage, {state:{email: res.data.email}});
          }
        }
      } catch (err) {
        // Handle different error cases
        if (!err?.response) {
        } else if (err.response?.data === ERROR_CODES.VERIFICATION_FAILED) {
          // VerificationFailed: Navigate to the verification failed page
          navigateTo(ROUTE_PATHS.EmailVerificationFailedPage);
        } else if (err.response?.data === ERROR_CODES.ALREADY_VERIFIED) {
          // AlreadyVerified: Navigate to the already verified page
          navigateTo(ROUTE_PATHS.EmailVerificationCompletePage);
        }
      }
    };

    // Make the request only if a specific condition is met
    if (confirmRequest === false && tokenParamRef.current !== undefined) {
      fetchData();
    }
  }, [confirmRequest]);

  // Display the loading state during the verification process
  return <Loading />;
};

export default VerifyingPage;
