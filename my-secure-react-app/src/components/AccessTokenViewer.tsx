import { Card } from "react-bootstrap";
interface Props {
  accessTokenRaw: string;
}

export default function AccessTokenViewer(props: Props) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>This is your Access-Token.</Card.Title>
          <Card.Text>
            <strong>RawToken:</strong> {props.accessTokenRaw}.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
