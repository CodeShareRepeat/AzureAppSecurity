import { Card } from "react-bootstrap";

interface Props {
  token: string;
  title: string;
}

export default function TokenViewer(props: Props) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <strong>RawToken:</strong> 
            <pre>{props.token}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
