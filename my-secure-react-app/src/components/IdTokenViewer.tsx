import React from "react";
import { Card } from "react-bootstrap";

interface Props {
  idToken: any;
}

export default function IdTokenViewer(props: Props) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>This is your ID TOKEN</Card.Title>
          <Card.Text>
            <strong>UserName:</strong> {props.idToken[0]?.username}.
          </Card.Text>
          <Card.Text>
            <strong>AccountId: </strong>
            {props.idToken[0]?.localAccountId}
          </Card.Text>
          <Card.Text>
            <strong>HomeaccountId:</strong> {props.idToken[0]?.homeAccountId}
          </Card.Text>
          <Card.Text>
            <strong>Id-Token decoded:</strong>{" "}
            <pre>{JSON.stringify(props.idToken[0], null, 2)}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
