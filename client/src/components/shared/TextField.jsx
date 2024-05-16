import { Form } from 'rsuite';

const TextField = ({ name, label, accepter, ...prop }) => (
  <Form.Group controlId={name}>
    <Form.ControlLabel>{label} </Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...prop}/>
  </Form.Group>
  );

export default TextField