import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Button, Card, Container, Row } from "react-bootstrap";
import ProtectedArea from "./ProtectedArea";

export default function LoginLogout() {
  const { instance } = useMsal();

  return (
    <>
      <AuthenticatedTemplate>
        <Container fluid="lg">
          <p></p>
          <Row className="justify-content-md-left">
            Please sign-out when done.{" "}
            <Button variant="secondary" onClick={() => instance.logout()}>
              sign out
            </Button>
          </Row>

          <ProtectedArea />
        </Container>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <p />
        <Container fluid="md">
          <Row className="justify-content-md-center">
            <Card style={{ width: "20rem" }} border="secondary">
              <Card.Body>
                <Card.Title>Authorization required</Card.Title>
                <Card.Text>
                  Please login with your azure account to use this example. You
                  can choose between login using the popup or the redirect
                  method.
                </Card.Text>
                <Button onClick={() => instance.loginPopup()}>
                  sign in with pop-up
                </Button>
                <p />
                <Button onClick={() => instance.loginRedirect()}>
                  sign in with redirect
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </UnauthenticatedTemplate>
    </>
  );
}
