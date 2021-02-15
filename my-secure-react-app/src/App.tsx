import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import { msalConfig } from "./api/apiConfigs";
import LoginLogout from "./components/LoginLogout";

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <p></p>
      <MsalProvider instance={msalInstance}>
        <LoginLogout />
      </MsalProvider>
    </>
  );
}

export default App;
