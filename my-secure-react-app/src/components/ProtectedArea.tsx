import { useAccount, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { callApi } from "../api/apiCaller";
import { accessRequest } from "../api/authConfigs";
import AccessTokenViewer from "./AccessTokenViewer";
import ApiResultViewer from "./ApiResultViewer";
import IdTokenViewer from "./IdTokenViewer";

type componentStateType = {
  apiData: string;
  apiError: string;
  accessTokenRaw: string;
};

export default function ProtectedArea() {
  const [componentState, setComponentState] = useState<componentStateType>({
    apiData: "",
    accessTokenRaw: "",
    apiError: "",
  });

  const { instance, accounts } = useMsal();

  const accountForRequest = useAccount(accounts[0] || {});

  useEffect(() => {
    // Get the AccessToken (Raw)
    if (accountForRequest) {
      instance
        .acquireTokenSilent({
          ...accessRequest,
          account: accountForRequest,
        })
        .then((authResponse) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              accessTokenRaw: JSON.stringify(authResponse.accessToken),
            };
          });
        })
        .catch((error) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              apiError: "Error while reciving the access token. " + error,
              apiData: "",
            };
          });
        });
    }
  }, []);

  function onCallApibuttonClick() {
    if (accountForRequest) {
      callApi(componentState.accessTokenRaw)
        .then((apiResponse) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              error: "",
              apiData: apiResponse,
            };
          });
        })
        .catch((error) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              apiData: "",
              apiError: error.message,
            };
          });
        });
    }
  }

  return (
    <>
      <p></p>

      <Row className="justify-content-md-center">
        <Col sm>
          <Button onClick={onCallApibuttonClick}>Call Api</Button>
          <ApiResultViewer
            result={componentState.apiData}
            error={componentState.apiError}
          />
        </Col>
      </Row>
      <p />
      <Row>
        <Col sm>
          <IdTokenViewer idToken={accounts} />
        </Col>
      </Row>
      <p />
      <Row>
        <Col sm>
          <AccessTokenViewer accessTokenRaw={componentState.accessTokenRaw} />
        </Col>
      </Row>
    </>
  );
}
