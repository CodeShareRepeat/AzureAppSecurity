import { useAccount, useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { callApi } from "../api/apiCaller";
import { accessRequest } from "../api/apiConfigs";
import AccessTokenViewer from "./AccessTokenViewer";
import ApiResultViewer from "./ApiResultView";
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

  function onCallApibuttonClick() {
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

          callApi(authResponse)
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
        })
        .catch((error) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              apiError: error,
              apiData: "",
            };
          });
        });
    }
  }

  return (
    <>
      <p></p>
      <Container fluid="lg">
        <Row>
          <Col sm>
            <IdTokenViewer idToken={accounts} />
          </Col>
        </Row>
        <Row>
          <Col sm>
            <AccessTokenViewer accessTokenRaw={componentState.accessTokenRaw} />
          </Col>
        </Row>

        <Row>
          <Col sm>
            <Button onClick={onCallApibuttonClick}>Call Api</Button>
            <ApiResultViewer
              result={componentState.apiData}
              error={componentState.apiError}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
