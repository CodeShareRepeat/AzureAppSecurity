import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Button, Card, Container } from "react-bootstrap";
import ProtectedArea from "./ProtectedArea";

export default function LoginLogout() {
  const { instance } = useMsal();

  return (
    <>
      <AuthenticatedTemplate>
        <ProtectedArea />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Container fluid="md">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Authorization required</Card.Title>
              <Card.Text>Please login with your azure account</Card.Text>
              <Button onClick={() => instance.loginPopup()}>sign in</Button>
            </Card.Body>
          </Card>
        </Container>
      </UnauthenticatedTemplate>
    </>
  );
}
