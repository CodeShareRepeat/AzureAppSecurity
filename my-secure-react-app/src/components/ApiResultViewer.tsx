import React from "react";
import { Card } from "react-bootstrap";

interface ApiResultViewerProps {
  result: string;
  error: any;
}
export default function ApiResultViewer(props: ApiResultViewerProps) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>API Result.</Card.Title>
          <Card.Text>
            Response: <pre>{JSON.stringify(props.result, null, 2)}</pre>
          </Card.Text>

          <Card.Text>
            Error: <pre>{JSON.stringify(props.error, null, 2)}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
