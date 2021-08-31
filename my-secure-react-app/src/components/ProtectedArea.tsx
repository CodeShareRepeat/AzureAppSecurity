import { useAccount, useMsal } from "@azure/msal-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { callApi } from "../api/apiCaller";
import { accessRequest } from "../api/authConfigs";
import TokenViewer from "./TokenViewer";
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

  const { instance, accounts, inProgress } = useMsal();
  const account  = useAccount(accounts[0] || {});

  useEffect(() => {

    
    if (account) {
      instance
        .acquireTokenSilent({
          ...accessRequest,
          account: account,
        })
        .then((authResponse) => {
          setComponentState((prevState: componentStateType) => {
            return {
              ...prevState,
              accessTokenRaw: authResponse.accessToken,
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
  }, [account, instance]);

  function onCallApibuttonClick() {
    
    if (account && componentState.accessTokenRaw != null) {
      alert(componentState.accessTokenRaw);
      
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
    <React.Fragment>


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
          
          <TokenViewer token={JSON.stringify(accounts[0], null, 2)} title="This is your ID-TOKEN"/>

        </Col>
      </Row>
      <p />
      <Row>
        <Col sm>
          <TokenViewer token={componentState.accessTokenRaw} title="This ist your ACCESS-Token." />
        </Col>
      </Row>
    </React.Fragment>
  );
}
